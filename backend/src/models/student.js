import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const studentModel = {

    async listStudents(query = {}) {
        const { ra, cpf, name } = query;
        const where = {};
        if (ra) where.ra = ra;
        if (cpf) where.cpf = cpf;
        if (name) where.name = { contains: name };
        return prisma.student.findMany({ where });
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
    }

};
