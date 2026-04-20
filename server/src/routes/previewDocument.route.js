import { Router } from "express";
import { previewDocument } from "../controllers/getPreviewDocument.controller.js";

const router = Router();

router.route("/previewdocument").post(previewDocument);

export default router;