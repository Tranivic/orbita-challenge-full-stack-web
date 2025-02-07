import express from "express";
import multer from 'multer';
const upload = multer();
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 80,
    message: "Muitas tentativas, tente novamente mais tarde"
});

import { studentController } from "../controllers/student.js";

const router = express.Router();

router.get("/students", limiter, studentController.listStudents);
router.post("/students",limiter, upload.none(), studentController.createStudent);
router.put("/students/:id",limiter,  upload.none(), studentController.updateStudent);
router.delete("/students/:id",limiter, studentController.deleteStudent);


export default router;