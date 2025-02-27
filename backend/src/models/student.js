import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const studentModel = {

    async listStudents(query = {}) {
        const { ra, cpf, name, limit = 10, page = 1, sort } = query;
        const where = {};
        if (ra) where.ra = ra;
        if (cpf) where.cpf = cpf;
        if (name) where.name = { contains: name };
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
    
        let orderBy = { name: 'asc' };
        if (sort) {
            const field = sort.replace('-', '');
            const order = sort.startsWith('-') ? 'desc' : 'asc';
            orderBy = { [field]: order };
        }
    
        const students = await prisma.student.findMany({
            where,
            take,
            skip,
            orderBy
        });
        return students;
    },
    
    async countStudents(query = {}) {
        const { ra, cpf, name } = query;

        const where = {};
        if (ra) where.ra = ra;
        if (cpf) where.cpf = cpf;
        if (name) where.name = { contains: name };

        return prisma.student.count({ where });
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
    async deleteStudent(id) {
        return prisma.student.delete({
            where: { ra: id }
        });
    }

};
