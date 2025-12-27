import express from "express";
import {
  createRoomAndFile,
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
} from "../controllers/FilesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// File operations - must come BEFORE dynamic routes
router.post("/create", protect, createRoomAndFile);
router.post("/save", protect, saveFile);
router.post("/autosave", protect, autoSaveFile);
router.patch("/language", protect, changeFileLanguage);
router.patch("/rename", protect, renameFile);
router.patch("/extension", protect, changeFileExtension);

// List operations - must come BEFORE dynamic routes
router.get("/", protect, getUserFiles);
router.get("/recent/list", protect, getRecentFiles);

// Dynamic routes - must come AFTER specific routes
router.get("/:fileId/open", protect, openFileInEditor);
router.get("/:fileId/meta", protect, getFileMeta); // Changed from roomId to fileId
router.delete("/:fileId/delete", protect, deleteFile);
router.patch("/:fileId/restore", protect, restoreFile);

export default router;