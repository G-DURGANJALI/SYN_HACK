import express from 'express';
import { setAvailability } from '../controllers/workerController.js';
import { getAvailability } from '../controllers/workerController.js';
import {
  changeStudentPassword
} from '../controllers/studentContoller.js';

import { protectStudent, protectWorker } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();
// router.put('/update-profile', protectStudent, upload.single('profilePic'), updateStudentProfile);

router.post("/availability", protectWorker, setAvailability);
router.get("/availability", protectWorker, getAvailability);

export default router;
