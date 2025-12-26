import express from "express";
import {errorAnalyzingController} from "../controllers/errorAnalyzingController.js";



const router = express.Router();


router.post("/analyze-error" , errorAnalyzingController);

export default router;
