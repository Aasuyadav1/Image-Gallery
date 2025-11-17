import express from "express";
import upload from "../multer/multerConfig.js";
import { uploadImage, getAllImages, deleteImages } from "../controller/imageController.js";

const router = express.Router();

router.get("/", getAllImages);

router.post("/", upload.single("image"), uploadImage);

router.delete("/", deleteImages);

export default router;