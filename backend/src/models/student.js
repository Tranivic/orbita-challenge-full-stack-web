import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const studentModel = {

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
