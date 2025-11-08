import express from 'express';
import {
  createComplaint,
  getAllComplaints,
  likeComplaint,
  likeSystem,
  getStudentProfile,
  updateStudentProfile,
  changeStudentPassword
} from '../controllers/studentContoller.js';

import { protectStudent } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// 🧑‍🎓 Student Routes

// Create a new complaint
router.post('/complaints', protectStudent, createComplaint);

// Get all complaints (optionally filter by ?all=true)
router.get('/complaints', protectStudent, getAllComplaints);

// Like or unlike a complaint
router.post('/complaints/:complaintId/like', protectStudent, likeComplaint);

// Like the system / send feedback
router.post('/like-system', protectStudent, likeSystem);

// Get student info (profile)
router.get('/me', protectStudent, getStudentProfile);

// Update student profile (with profile picture)
router.put('/update-profile', protectStudent, upload.single('profilePic'), updateStudentProfile);

// Change student password
router.put('/change-password', protectStudent, changeStudentPassword);

export default router;
