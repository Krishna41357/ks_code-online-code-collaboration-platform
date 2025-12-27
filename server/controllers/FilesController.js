import FileStorage from '../models/Files.js';
import { autoSaveFileService } from "../services/FileService.js";

//Helper Functions

const hasViewAccess = (file , userId) =>{
    return(
        file.isPublic || file.owner.toString()===userId || file.collaborators.some(id=>id.toString()===userId)
    );
};


const hasEditAccess = (file , userId)=>{
   return (
    file.owner.toString()===userId || file.collaborators.some(id=>id.toString()===userId)
);
};

const getExtensionByLanguage = (language) =>{
    const map = {
        javascript:"js",
        typescript:"ts",
        python: "py",
        cpp: "cpp",
        c: "c",
        java: "java",
        go: "go",
        rust: "rs"
    };
    return map[language] || "txt";
}

const getStarterTemplate = (language) => {
  const templates = {
    javascript: `console.log("Hello World");`,
    python: `print("Hello World")`,
    cpp: `#include <iostream>
using namespace std;
int main() {
  cout << "Hello World";
  return 0;
}`,
    c: `#include <stdio.h>
int main() {
  printf("Hello World");
  return 0;
}`,
    java: `class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
  };
  return templates[language] || "";
};

// controller

export const createRoomAndFile = async (req , res)=>{
    try{
        const {language} = req.body;
        const userId = req.user.id;

        const extension = getExtensionByLanguage(language);

        const file = await FileStorage.create({
            owner:userId,
            filename:`main.${extension}`,
            language,
            code:getStarterTemplate(language)
        });
        res.status(201).json({
            fileId:file._id,
            roomId:file.roomId,
            file
        });
    } catch(err){
        res.status(500).json({
            message:"Failed to create a file" , err
        })
    }
};

//open file in editor 
export const openFileInEditor = async (req , res)=>{
    try{
        const{fileId} = req.params;
        const userId = req.user.id;

        const file = await FileStorage.findById(fileId);
        if(!file || file.isDeleted)
            return res.status(404).json({message:"File not found"});
        if(!hasViewAccess(file , userId))
            return res.status(403).json({message:"Access denied"});

        res.json(file);

    }catch(err){
        res.status(500).json({message:"Failed server frustrated developer "});
    }
};

export const saveFile=async(req , res)=>{
    try{
        const {fileId , code} = req.body;
        const userId = req.user.id;
        const file = await FileStorage.findById(fileId);
        if(!file || !hasEditAccess(file , userId))
            return res.status(403).json({message:"No edit access"});

        file.code = code;
        file.version+=1;
        await file.save();

        res.json({ message: "File saved", version: file.version });

    } catch(err){
        res.status(500).json({message:"Save failed"});
    }
};

//auto-save

export const autoSaveFile = async(req , res) =>{
    try{
        const {fileId , code } = req.body;
        await autoSaveFileService({
            fileId , 
            code , 
            userId: req.user.id
        });
        res.sendStatus(204);


    } catch(err){
        res.sendStatus(204);
 //auto save should never block the user
    }
}

//change language 
export const changeFileLanguage = async(req , res)=>{
    try{
        const {fileId , language} = req.body;
        const userId = req.user.id;
        const file = await FileStorage.findById(fileId);
        if(!file || !hasEditAccess(file , userId))
            return res.status(403).json({message:"No access"});
        const ext = getExtensionByLanguage(language);
        file.language = language;
        file.filename = file.filename.split(".")[0]+"."+ ext;
        await file.save();
        res.json(file);
    } catch(err){
        res.status(500).json({message:"Language change failed"});
    }
};

//rename file

export const renameFile = async(req , res)=>{
    try{
        const {fileId , newName} = req.body;
        const userId = req.user.id;
        const file = await FileStorage.findById(fileId);
        if(!file || !hasEditAccess(file , userId))
            return res.status(403).json({message:"No access"});
        const ext = file.filename.split(".").pop();
        file.filename = `${newName}.${ext}`;

        await file.save();
        res.json(file);
    }catch(err){
        res.status(500).json({message:"Rename Failed"});
    }
};
// 7️⃣ Change extension manually
export const changeFileExtension = async (req, res) => {
  try {
    const { fileId, extension } = req.body;
    const userId = req.user.id;
    const allowed = ["js","ts","py","cpp","c","java","go","rs","txt"];
if (!allowed.includes(extension))
  return res.status(400).json({ message: "Invalid extension" });

    const file = await FileStorage.findById(fileId);
    if (!file || !hasEditAccess(file, userId))
      return res.status(403).json({ message: "No access" });

    const name = file.filename.split(".")[0];
    file.filename = `${name}.${extension}`;

    await file.save();
    res.json(file);
  } catch {
    res.status(500).json({ message: "Extension change failed" });
  }
};

export const getUserFiles = async(req , res)=>{
   try{ 
    const userId = req.user.id;
    const files = await FileStorage.find({
        isDeleted:false ,
        $or:[{owner:userId},{collaborators:userId}]
    }).sort({updatedAt:-1});
    res.json(files);
}catch(err){
    res.status(500).json({message:"server error"});
}
};

export const getRecentFiles = async (req, res) => {
  const userId = req.user.id;
  const files = await FileStorage.find({
    isDeleted: false,
    $or: [{ owner: userId }, { collaborators: userId }]
  })
    .sort({ updatedAt: -1 })
    .limit(10);

  res.json(files);
};

//soft-delete
export const deleteFile = async(req , res)=>{
    const {fileId} = req.params;
    const userId = req.user.id;
    const file = await FileStorage.findById(fileId);
    if(!file || file.owner.toString() !== userId)
        return res.status(403).json({message:"Only file owners are allowed"});

    file.isDeleted = true;
    await file.save();

    res.json({message:"File deleted"});
};

//restore-file
export const restoreFile = async(req , res)=>{
    const {fileId} = req.params;
    const userId = req.user.id;
    const file = await FileStorage.findById(fileId)
    if(!file || !hasEditAccess(file , userId))
        return res.status(403).json({message:"No Access"});
    file.isDeleted = false;
    await file.save();
    res.json({message:"File restored"});
};

export const getFileMeta = async (req, res) => {
  const { roomId } = req.params;

  const file = await FileStorage.findOne({ roomId });
  if (!file || !hasViewAccess(file, req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json({
    fileId: file._id,
    roomId: file.roomId,
    filename: file.filename,
    language: file.language,
    version: file.version,
    collaborators: file.collaborators,
    updatedAt: file.updatedAt
  });
};



