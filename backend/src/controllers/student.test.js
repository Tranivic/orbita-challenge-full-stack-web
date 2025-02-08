import { studentController } from './student.js';
import { studentModel } from '../models/student.js';
import validator from 'validator';
import { describe, it, beforeEach, vi, expect } from 'vitest';

vi.mock('../models/student.js');
vi.mock('validator');

describe('Test students controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {}
        };
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
    });

    describe('Test student creation', () => {
        it('should return error if missing parameters', async () => {
            req.body = { name: '', email: '', ra: '', cpf: '' };
            await studentController.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Missing parameters' });
        });

        it('should return error if email is invalid', async () => {
            req.body = { name: 'John Doe', email: 'invalidEmail', ra: '123456', cpf: '12345678901' };
            validator.isEmail.mockReturnValue(false);
            await studentController.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid email' });
        });

        it('should return error if RA is invalid', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', ra: 'invalidRA', cpf: '12345678901' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(false);
            await studentController.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid RA' });
        });

        it('should return error if CPF format is invalid', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', ra: '123456', cpf: 'invalidCPF' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(true);
            await studentController.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: "Invalid CPF format" });
        });

        it('should return error if name is invalid', async () => {
            req.body = { name: 'Invalid@Name', email: 'john@example.com', ra: '123456', cpf: '12345678901' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(true);
            await studentController.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid name' });
        });

        it('should return error if student already exists', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', ra: '123456', cpf: '12345678901' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(true);
            studentModel.findStudentBy.mockResolvedValueOnce(true);
            await studentController.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Student with this RA already exists' });
        });

        it('should create student successfully', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', ra: '123456', cpf: '12345678901' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(true);
            studentModel.findStudentBy.mockResolvedValueOnce(false);
            studentModel.createStudent.mockResolvedValueOnce({});
            await studentController.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ status: "success", message: 'User created successfully' });
        });
    });

    describe('Test list students', () => {
        it('should return error if query parameter is invalid', async () => {
            req.query = { invalidParam: 'value' };
            await studentController.listStudents(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid query search parameter' });
        });

        it('should return error if limit is invalid', async () => {
            req.query = { limit: 'invalidLimit' };
            validator.isInt.mockReturnValue(false);
            await studentController.listStudents(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid query limit' });
        });

        it('should return error if limit is too high', async () => {
            req.query = { limit: '101' };
            validator.isInt.mockReturnValue(true);
            await studentController.listStudents(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Query limit too high' });
        });

        it('should return error if page number is invalid', async () => {
            req.query = { page: 'invalidPage' };
            validator.isInt.mockReturnValue(false);
            await studentController.listStudents(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid page number' });
        });

        it('should return students successfully with pagination', async () => {
            req.query = { limit: '10', page: '1' };
            validator.isInt.mockReturnValue(true);
            const students = [{ name: 'John Doe', ra: '123456', email: 'john@example.com', cpf: '12345678901' }];
            const totalStudents = 1;
            studentModel.listStudents.mockResolvedValueOnce(students);
            studentModel.countStudents.mockResolvedValueOnce(totalStudents);
            await studentController.listStudents(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                page: 1,
                limit: 10,
                total: totalStudents,
                totalPages: 1,
                data: students
            });
        });

        it('should return students successfully without pagination', async () => {
            req.query = {};
            const students = [{ name: 'John Doe', ra: '123456', email: 'john@example.com', cpf: '12345678901' }];
            const totalStudents = 1;
            studentModel.listStudents.mockResolvedValueOnce(students);
            studentModel.countStudents.mockResolvedValueOnce(totalStudents);
            await studentController.listStudents(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                page: 1,
                limit: 10,
                total: totalStudents,
                totalPages: 1,
                data: students
            });
        });
    });

    describe('Test student update', () => {
        it('should return error if missing parameters', async () => {
            req.params = { id: '' };
            req.body = { name: '', email: '' };
            await studentController.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Missing parameters', data: req.body, id: req.params.id });
        });

        it('should return error if email is invalid', async () => {
            req.params = { id: '123456' };
            req.body = { name: 'John Doe', email: 'invalidEmail' };
            validator.isEmail.mockReturnValue(false);
            await studentController.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid email' });
        });

        it('should return error if RA is invalid', async () => {
            req.params = { id: 'invalidRA' };
            req.body = { name: 'John Doe', email: 'john@example.com' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(false);
            await studentController.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid RA' });
        });

        it('should return error if name is invalid', async () => {
            req.params = { id: '123456' };
            req.body = { name: 'Invalid@Name', email: 'john@example.com' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(true);
            await studentController.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Invalid name' });
        });

        it('should return error if student does not exist', async () => {
            req.params = { id: '123456' };
            req.body = { name: 'John Doe', email: 'john@example.com' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(true);
            studentModel.findStudentBy.mockResolvedValueOnce(false);
            await studentController.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Student with this RA does not exist' });
        });

        it('should update student successfully', async () => {
            req.params = { id: '123456' };
            req.body = { name: 'John Doe', email: 'john@example.com' };
            validator.isEmail.mockReturnValue(true);
            validator.isInt.mockReturnValue(true);
            studentModel.findStudentBy.mockResolvedValueOnce(true);
            studentModel.updateStudent.mockResolvedValueOnce({});
            await studentController.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ status: "success", message: 'User updated successfully' });
        });
    });

    describe('Test student deletion', () => {
        it('should return error if missing parameters', async () => {
            req.params = { id: '' };
            await studentController.deleteStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Missing parameters' });
        });

        it('should return error if student does not exist', async () => {
            req.params = { id: '123456' };
            studentModel.findStudentBy.mockResolvedValueOnce(false);
            await studentController.deleteStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: "error", message: 'Student does not exist' });
        });

        it('should delete student successfully', async () => {
            req.params = { id: '123456' };
            studentModel.findStudentBy.mockResolvedValueOnce(true);
            studentModel.deleteStudent.mockResolvedValueOnce({});
            await studentController.deleteStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ status: "success", message: 'User deleted successfully' });
        });
    });
});