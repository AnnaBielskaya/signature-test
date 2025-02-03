import express, { Request, Response } from "express";
import multer from "multer";
import { uploadImageToCloudinary } from "../services/imageProcessingService";

const router = express.Router();
const upload = multer(); 

router.post("/test-image", upload.single("image"), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "File is missing" });
      return;
    }
    const uploadedImage = await uploadImageToCloudinary(req.file.buffer, req.file.originalname);
    res.json({ success: true, data: uploadedImage });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});


/*

router.post('/test-image', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(404).json({ error: "File is missing" });
    return;
  }

  try {
    const cloudinaryData = await uploadToCloudinary(req.file.buffer, req.file.originalname);

    if (!cloudinaryData.secure_url) {
      res.status(500).json({ error: "Cloudinary upload failed", details: cloudinaryData });
      return;
    }

    res.status(200).json({ message: "Upload successful", url: cloudinaryData.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image", details: error });
  }
});
*/

export default router;
