import express from 'express';
import {
  changeStudentPassword
} from '../controllers/studentContoller.js';

import { protectStudent } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();
// router.put('/update-profile', protectStudent, upload.single('profilePic'), updateStudentProfile);

export default router;
