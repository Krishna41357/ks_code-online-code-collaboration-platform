import FileStorage from '../models/Files.js';
import { autoSaveFileService } from "../services/FileService.js";

//Helper Functions

const hasViewAccess = (file, userId) => {
  return (
    file.isPublic || 
    file.owner.toString() === userId || 
    file.collaborators.some(id => id.toString() === userId)
  );
};

const hasEditAccess = (file, userId) => {
  return (
    file.owner.toString() === userId || 
    file.collaborators.some(id => id.toString() === userId)
  );
};

// Find file by either MongoDB _id or roomId
const findFileById = async (id) => {
  // Try MongoDB _id first
  let file = await FileStorage.findById(id).catch(() => null);
  
  // If not found, try roomId
  if (!file) {
    file = await FileStorage.findOne({ roomId: id });
  }
  
  return file;
};

// Map short codes to full language names
const normalizeLanguage = (lang) => {
  const map = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    cpp: "cpp",
    c: "c",
    java: "java",
    go: "go",
    rs: "rust"
  };
  return map[lang] || lang;
};

// Map full language names to extensions
const getExtensionByLanguage = (language) => {
  const map = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    cpp: "cpp",
    c: "c",
    java: "java",
    go: "go",
    rust: "rs"
  };
  return map[language] || "txt";
};

const getStarterTemplate = (language) => {
  const templates = {
    javascript: `console.log("Hello World");`,
    typescript: `console.log("Hello World");`,
    python: `print("Hello World")`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
    c: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    go: `package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}`,
    rust: `fn main() {
    println!("Hello World");
}`
  };
  return templates[language] || "";
};

// CREATE FILE AND ROOM
export const createRoomAndFile = async (req, res) => {
  try {
    const { language } = req.body;
    const userId = req.user.id;

    // Normalize language (js -> javascript, py -> python, etc.)
    const normalizedLanguage = normalizeLanguage(language);
    const extension = getExtensionByLanguage(normalizedLanguage);

    const file = await FileStorage.create({
      owner: userId,
      filename: `main.${extension}`,
      language: normalizedLanguage,
      code: getStarterTemplate(normalizedLanguage)
    });

    res.status(201).json({
      fileId: file._id,
      roomId: file.roomId,
      file
    });
  } catch (err) {
    console.error("Create file error:", err);
    res.status(500).json({
      message: "Failed to create a file",
      error: err.message
    });
  }
};

// JOIN OR CREATE ROOM
// This endpoint handles joining a room - creates file if it doesn't exist
// Uses atomic operations to prevent duplicate file creation
export const joinOrCreateRoom = async (req, res) => {
  try {
    const { roomId, language = 'cpp' } = req.body;
    const userId = req.user.id;

    console.log('Joining room:', roomId);

    const normalizedLanguage = normalizeLanguage(language);
    const extension = getExtensionByLanguage(normalizedLanguage);

    // Atomic operation: find existing or create new file
    // This ensures only ONE file is created per roomId, even with concurrent requests
    let file = await FileStorage.findOneAndUpdate(
      { roomId }, // Find by roomId
      {
        $setOnInsert: {
          roomId,
          owner: userId,
          filename: `main.${extension}`,
          language: normalizedLanguage,
          code: getStarterTemplate(normalizedLanguage),
          collaborators: [],
          isDeleted: false,
          isPublic: false,
          version: 1,
          folder: 'root'
        }
      },
      {
        upsert: true, // Create if doesn't exist
        new: true, // Return the document after update
        setDefaultsOnInsert: true
      }
    );

    console.log('Join operation completed:', {
      fileId: file._id,
      roomId: file.roomId,
      isNewFile: !file.updatedAt || file.createdAt.getTime() === file.updatedAt.getTime()
    });

    // Add user as collaborator if not already (use $addToSet to avoid duplicates)
    if (!file.collaborators.some(collab => collab.toString() === userId) && 
        file.owner.toString() !== userId) {
      
      await FileStorage.findByIdAndUpdate(
        file._id,
        { $addToSet: { collaborators: userId } }
      );
      
      // Refresh file data to get updated collaborators
      file = await FileStorage.findById(file._id);
      console.log('Added user as collaborator:', userId);
    }

    res.json({
      fileId: file._id,
      roomId: file.roomId,
      file
    });
  } catch (err) {
    console.error("Join room error:", err);
    res.status(500).json({
      message: "Failed to join room",
      error: err.message
    });
  }
};

// OPEN FILE IN EDITOR - Works with both roomId and fileId
// Creates file if it doesn't exist (for room joins) - ATOMIC OPERATION
export const openFileInEditor = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log('Opening file with id:', id);

    let file = await findFileById(id);

    // If file doesn't exist and id looks like a roomId (UUID format)
    // Use findOneAndUpdate with upsert to atomically create or get existing file
    if (!file && id.includes('-')) {
      console.log('File not found, attempting atomic create for roomId:', id);
      
      // This will either create a new file OR return existing one
      // The upsert + setOnInsert ensures only ONE file is created per roomId
      file = await FileStorage.findOneAndUpdate(
        { roomId: id }, // Find by roomId
        {
          $setOnInsert: {
            roomId: id,
            owner: userId,
            filename: 'main.cpp',
            language: 'cpp',
            code: getStarterTemplate('cpp'),
            collaborators: [],
            isDeleted: false,
            isPublic: false,
            version: 1,
            folder: 'root'
          }
        },
        {
          upsert: true, // Create if doesn't exist
          new: true, // Return the document after update
          setDefaultsOnInsert: true
        }
      );
      
      console.log('Atomic operation completed:', {
        fileId: file._id,
        roomId: file.roomId,
        owner: file.owner
      });
    }

    if (!file || file.isDeleted) {
      console.log('File not found or deleted:', id);
      return res.status(404).json({ message: "File not found" });
    }

    if (!hasViewAccess(file, userId)) {
      console.log('Access denied for user:', userId);
      return res.status(403).json({ message: "Access denied" });
    }

    // Add user as collaborator if not already (use $addToSet to avoid duplicates)
    if (!file.collaborators.some(collab => collab.toString() === userId) && 
        file.owner.toString() !== userId) {
      
      await FileStorage.findByIdAndUpdate(
        file._id,
        { $addToSet: { collaborators: userId } }
      );
      
      // Refresh file data
      file = await FileStorage.findById(file._id);
      console.log('Added user as collaborator:', userId);
    }

    res.json(file);
  } catch (err) {
    console.error("Open file error:", err);
    res.status(500).json({ 
      message: "Failed to open file",
      error: err.message 
    });
  }
};

// SAVE FILE
export const saveFile = async (req, res) => {
  try {
    const { fileId, code } = req.body;
    const userId = req.user.id;

    console.log('Saving file:', fileId); // Debug log

    const file = await findFileById(fileId);

    if (!file || !hasEditAccess(file, userId)) {
      return res.status(403).json({ message: "No edit access" });
    }

    file.code = code;
    file.version += 1;
    await file.save();

    res.json({ 
      message: "File saved", 
      version: file.version,
      fileId: file._id,
      roomId: file.roomId
    });
  } catch (err) {
    console.error("Save file error:", err);
    res.status(500).json({ 
      message: "Save failed",
      error: err.message 
    });
  }
};

// AUTO-SAVE FILE
export const autoSaveFile = async (req, res) => {
  try {
    const { fileId, code } = req.body;
    await autoSaveFileService({
      fileId,
      code,
      userId: req.user.id
    });
    res.sendStatus(204);
  } catch (err) {
    console.error("Auto-save error:", err);
    res.sendStatus(204); // Auto-save should never block the user
  }
};

// CHANGE LANGUAGE
export const changeFileLanguage = async (req, res) => {
  try {
    const { fileId, language } = req.body;
    const userId = req.user.id;

    const file = await findFileById(fileId);

    if (!file || !hasEditAccess(file, userId)) {
      return res.status(403).json({ message: "No access" });
    }

    // Normalize language
    const normalizedLanguage = normalizeLanguage(language);
    const ext = getExtensionByLanguage(normalizedLanguage);
    
    file.language = normalizedLanguage;
    file.filename = file.filename.split(".")[0] + "." + ext;
    
    await file.save();
    res.json(file);
  } catch (err) {
    console.error("Language change error:", err);
    res.status(500).json({ 
      message: "Language change failed",
      error: err.message 
    });
  }
};

// RENAME FILE
export const renameFile = async (req, res) => {
  try {
    const { fileId, newName } = req.body;
    const userId = req.user.id;

    const file = await findFileById(fileId);

    if (!file || !hasEditAccess(file, userId)) {
      return res.status(403).json({ message: "No access" });
    }

    const ext = file.filename.split(".").pop();
    file.filename = `${newName}.${ext}`;

    await file.save();
    res.json(file);
  } catch (err) {
    console.error("Rename error:", err);
    res.status(500).json({ 
      message: "Rename failed",
      error: err.message 
    });
  }
};

// CHANGE EXTENSION
export const changeFileExtension = async (req, res) => {
  try {
    const { fileId, extension } = req.body;
    const userId = req.user.id;
    const allowed = ["js", "ts", "py", "cpp", "c", "java", "go", "rs", "txt"];

    if (!allowed.includes(extension)) {
      return res.status(400).json({ message: "Invalid extension" });
    }

    const file = await findFileById(fileId);

    if (!file || !hasEditAccess(file, userId)) {
      return res.status(403).json({ message: "No access" });
    }

    const name = file.filename.split(".")[0];
    file.filename = `${name}.${extension}`;

    await file.save();
    res.json(file);
  } catch (err) {
    console.error("Extension change error:", err);
    res.status(500).json({ 
      message: "Extension change failed",
      error: err.message 
    });
  }
};

// GET USER FILES
export const getUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await FileStorage.find({
      isDeleted: false,
      $or: [{ owner: userId }, { collaborators: userId }]
    }).sort({ updatedAt: -1 });
    
    res.json(files);
  } catch (err) {
    console.error("Get files error:", err);
    res.status(500).json({ 
      message: "Server error",
      error: err.message 
    });
  }
};

// GET RECENT FILES
export const getRecentFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await FileStorage.find({
      isDeleted: false,
      $or: [{ owner: userId }, { collaborators: userId }]
    })
      .sort({ updatedAt: -1 })
      .limit(10);

    res.json(files);
  } catch (err) {
    console.error("Get recent files error:", err);
    res.status(500).json({ 
      message: "Server error",
      error: err.message 
    });
  }
};

// DELETE FILE
export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params; // Changed from fileId to id
    const userId = req.user.id;

    const file = await findFileById(id);

    if (!file || file.owner.toString() !== userId) {
      return res.status(403).json({ message: "Only file owners are allowed" });
    }

    file.isDeleted = true;
    await file.save();

    res.json({ message: "File deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ 
      message: "Delete failed",
      error: err.message 
    });
  }
};

// RESTORE FILE
export const restoreFile = async (req, res) => {
  try {
    const { id } = req.params; // Changed from fileId to id
    const userId = req.user.id;

    const file = await findFileById(id);

    if (!file || !hasEditAccess(file, userId)) {
      return res.status(403).json({ message: "No access" });
    }

    file.isDeleted = false;
    await file.save();
    
    res.json({ message: "File restored" });
  } catch (err) {
    console.error("Restore error:", err);
    res.status(500).json({ 
      message: "Restore failed",
      error: err.message 
    });
  }
};

// GET FILE META - Works with both roomId and fileId
export const getFileMeta = async (req, res) => {
  try {
    const { id } = req.params; // Changed from roomId to id
    const userId = req.user.id;

    const file = await findFileById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (!hasViewAccess(file, userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      fileId: file._id,
      roomId: file.roomId,
      filename: file.filename,
      language: file.language,
      version: file.version,
      collaborators: file.collaborators,
      updatedAt: file.updatedAt,
      owner: file.owner
    });
  } catch (err) {
    console.error("Get meta error:", err);
    res.status(500).json({ 
      message: "Failed to get file metadata",
      error: err.message 
    });
  }
};

export default {
  createRoomAndFile,
  joinOrCreateRoom,
  openFileInEditor,
  saveFile,
  autoSaveFile,
  changeFileLanguage,
  renameFile,
  changeFileExtension,
  getUserFiles,
  getRecentFiles,
  deleteFile,
  restoreFile,
  getFileMeta
};