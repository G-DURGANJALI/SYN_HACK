// routes/complaintRoutes.js
import express from "express";
import upload from "../middlewares/multer.js";
import { protectStudent } from "../middlewares/authMiddleware.js";
import { createComplaint, getAllComplaints } from "../controllers/complaintController.js";

const router = express.Router();

router.post("/create", protectStudent, upload.array("attachments", 5), createComplaint);
router.get("/", protectStudent, getAllComplaints);

export default router;
