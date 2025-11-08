import express from 'express';
import {
  createComplaint,
  getAllComplaints,
  likeComplaint,
  likeSystem,
  updateStudentProfile,
  changeStudentPassword
} from '../controllers/studentContoller.js';

import { protectStudent } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/complaints', createComplaint);
router.get('/complaints', getAllComplaints);
router.post('/complaints/:complaintId/like', likeComplaint);
router.post('/like-system', likeSystem);
router.put('/update-profile', upload.single('profilePic'), updateStudentProfile);
router.put('/change-password', changeStudentPassword);

export default router;
