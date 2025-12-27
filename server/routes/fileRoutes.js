import express from "express"
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
import {protect} from "../middleware/authMiddleware.js"


const router = express.Router();

router.post("/create" , protect , createRoomAndFile);

router.get("/:fileId/open" , protect , openFileInEditor);

router.post("/save" , protect , saveFile);

router.post("/autosave" , protect , autoSaveFile);

router.patch("/language" , protect , changeFileLanguage);

router.patch("/rename" , protect , renameFile);

router.patch("/extension" , protect , changeFileExtension);

router.get("/" , protect , getUserFiles);

router.get("/recent/list" , protect , getRecentFiles);

router.get("/:fileId/meta" , protect , getFileMeta);

router.delete("/:fileId/delete" , protect , deleteFile);

router.patch("/:fileId/restore" , protect , restoreFile);

export default router;


