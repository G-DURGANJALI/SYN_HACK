import express from "express";
import multer from "../middleware/multer.js"; // your multer setup
import {
  registerStudent,
  registerAdmin,
  registerWorker,
  loginStudent,
  loginAdmin,
  loginWorker,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/student/register", multer.single("profilePic"), registerStudent);
router.post("/admin/register", multer.single("profilePic"), registerAdmin);
router.post("/worker/register", multer.single("profilePic"), registerWorker);

router.post("/student/login", loginStudent);
router.post("/admin/login", loginAdmin);
router.post("/worker/login", loginWorker);

router.post("/logout", logoutUser);

export default router;
