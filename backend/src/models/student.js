import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const studentModel = {

    async listStudents(query = {}) {
        const { ra, cpf, name, limit = 10 } = query;
        const where = {};
        if (ra) where.ra = ra;
        if (cpf) where.cpf = cpf;
        if (name) where.name = { contains: name };
        return prisma.student.findMany({ where, take: parseInt(limit) });
    },
    

    async createStudent(studentData) {
        return prisma.student.create({ data: studentData });
    },
    
    async findStudentBy(field, value){
        if(field !== 'ra' && field !== 'cpf' && field !== 'email'){
            throw new Error('Invalid search parameter');
        }
        return prisma.student.findFirst({
            where: {
                [field]: value
            }
        });
    },
    async updateStudent(id, studentData) {
        return prisma.student.update({
            where: { ra: id },
            data: studentData
        });
    },
    deleteStudent(id) {
        return prisma.student.delete({
            where: { ra: id }
        });
    }

};
