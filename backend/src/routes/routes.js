import express from "express";
import multer from 'multer';
const upload = multer();

import { studentController } from "../controllers/student.js";

const router = express.Router();

router.get("/students", studentController.listStudents);
router.post("/students", upload.none(), studentController.createStudent);
// router.put("/students/:id",  upload.none(), studentController.updateStudent);
// router.delete("/students/:id", studentController.deleteStudent);


export default router;