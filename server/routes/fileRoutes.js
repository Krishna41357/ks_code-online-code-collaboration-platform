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

// ========================================
// SPECIFIC ROUTES (must come FIRST)
// ========================================

// File operations
router.post("/create", protect, createRoomAndFile);
router.post("/save", protect, saveFile);
router.post("/autosave", protect, autoSaveFile);
router.patch("/language", protect, changeFileLanguage);
router.patch("/rename", protect, renameFile);
router.patch("/extension", protect, changeFileExtension);

// List operations
router.get("/", protect, getUserFiles);
router.get("/recent/list", protect, getRecentFiles);

// ========================================
// DYNAMIC ROUTES (must come LAST)
// ========================================

// Changed parameter name to :id to be more flexible (works with both fileId and roomId)
router.get("/:id/open", protect, openFileInEditor);
router.get("/:id/meta", protect, getFileMeta);
router.delete("/:id/delete", protect, deleteFile);
router.patch("/:id/restore", protect, restoreFile);

export default router;