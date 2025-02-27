import { studentModel } from "../models/student.js";
import validator from "validator";

export const studentController = {
    async createStudent(req, res) {
        try {
            let { name, email, ra, cpf } = req.body;
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
            ra = parseInt(ra);
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

            await studentModel.createStudent({ ra, cpf, name, email });
            return res.status(201).json({ status: "success", message: 'User created successfully' });

        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    },
    async listStudents(req, res) {
        const valid_params = ['ra', 'cpf', 'name', 'email', 'limit', 'page', 'sort'];
        const valid_sort_fields = ['ra', 'name', 'cpf', 'email'];
        const query = req.query;
        if(query.ra){
            query.ra = parseInt(query.ra);
        }
        try {
            if (Object.keys(query).some(key => !valid_params.includes(key))) {
                return res.status(200).json({ status: "error", message: 'Invalid query search parameter' });
            }

            if(query.limit) {
                if (!validator.isInt(query.limit)) {
                    return res.status(200).json({ status: "error", message: 'Invalid query limit' });
                }
                if (query.limit > 100) {
                    return res.status(200).json({ status: "error", message: 'Query limit too high' });
                }
            }

            if(query.page && !validator.isInt(query.page, { min: 1 })){
                return res.status(200).json({ status: "error", message: 'Invalid page number' });
            }

            let sortField = 'name';
            let sortOrder = 'ASC';

            if (query.sort) {
                const sortParts = query.sort.split(' ');
                const field = sortParts[0].replace('-', '');
                const order = sortParts[0].startsWith('-') ? 'DESC' : 'ASC';

                if (valid_sort_fields.includes(field)) {
                    sortField = field;
                    sortOrder = order;
                } else {
                    return res.status(200).json({ status: "error", message: 'Invalid sort field' });
                }
            }

            const limit = query.limit ? parseInt(query.limit) : 10;
            const page = query.page ? parseInt(query.page) : 1;
            const offset = (page - 1) * limit;

            const students = await studentModel.listStudents(query, limit, offset, sortField, sortOrder);
            const totalStudents = await studentModel.countStudents(query);
            const totalPages = Math.ceil(totalStudents / limit);

            return res.status(200).json({
                status: "success",
                page,
                limit,
                total: totalStudents,
                totalPages,
                data: students
            });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    },
    async updateStudent(req, res) {
        try {
            let { id } = req.params;
            const { name, email } = req.body;

            if (!name || !email || !id) {
                return res.status(200).json({ status: "error", message: 'Missing parameters', data: req.body, id });
            }

            if (!validator.isEmail(email)) {
                return res.status(200).json({ status: "error", message: 'Invalid email' });
            }

            if (!validator.isInt(id) || id.length > 11) {
                return res.status(200).json({ status: "error", message: 'Invalid RA' });
            }

            if (!/^[a-zA-Z ,.'-]+$/.test(name)) {
                return res.status(200).json({ status: "error", message: 'Invalid name' });
            }

            id = parseInt(id);

            const existingData = await Promise.all([
                studentModel.findStudentBy('ra', id),
            ]);

            if (!existingData[0]) {
                return res.status(200).json({
                    status: "error",
                    message: `Student with this RA does not exist`
                });
            }

            await studentModel.updateStudent(id, req.body);
            return res.status(201).json({ status: "success", message: 'User updated successfully' });

        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    },
    async deleteStudent(req, res) {
        try {
            let { id } = req.params;
            if (!id) {
                return res.status(200).json({ status: "error", message: 'Missing parameters' });
            }
            id = parseInt(id);
            const existingStudent = await studentModel.findStudentBy('ra', id);
            if (!existingStudent) {
                return res.status(200).json({ status: "error", message: 'Student does not exist' });
            }

            await studentModel.deleteStudent(id);
            return res.status(201).json({ status: "success", message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({
                status: "error", message: error.message
            });
        }
    }
};
