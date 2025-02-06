import { studentModel } from "../models/student.js";
import validator from "validator";

export const studentController = {
    async createStudent(req, res) {
        try {
            const { name, email, ra, cpf } = req.body;

            if (!name || !email || !ra || !cpf) {
                return res.status(200).json({ status: "error", message: 'Missing parameters' });
            }

            if(!validator.isEmail(email)){
                return res.status(200).json({ status: "error", message: 'Invalid email' });
            }

            if(!validator.isInt(ra) || ra.length > 11){
                return res.status(200).json({ status: "error", message: 'Invalid RA' });
            }

            if (!/^\d{11}$/.test(cpf)) {
                return res.status(200).json({ status: "error", message: "Invalid CPF format" });
            }            

            if (!/^[a-zA-Z ,.'-]+$/.test(name)) {
                return res.status(200).json({ status: "error", message: 'Invalid name' });
            }

            const existingData = await Promise.all([
                studentModel.findStudentBy('ra', ra),
                studentModel.findStudentBy('cpf', cpf),
                studentModel.findStudentBy('email', email)
            ]);
            
            const fields = ['RA', 'CPF', 'Email'];
            const existingFields = fields.filter((_, index) => existingData[index]);
            
            if (existingFields.length) {
                return res.status(200).json({ 
                    status: "error", 
                    message: `Student with this ${existingFields.join(', ')} already exists` 
                });
            }

            await studentModel.createStudent(req.body);
            return res.status(201).json({ status: "success", message: 'User created successfully' });

        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    },
};
