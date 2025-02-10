import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { studentModel } from "./student";

const prisma = new PrismaClient();

describe("Test student models", () => {
    beforeEach(async () => {
        await prisma.student.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should create a student", async () => {
        const student = await studentModel.createStudent({
            ra: 12345,
            cpf: "11122233344",
            name: "John Doe",
            email: "john@example.com"
        });
        expect(student).toHaveProperty("ra", 12345);
        expect(student).toHaveProperty("cpf", "11122233344");
        expect(student).toHaveProperty("name", "John Doe");
    });

    it("should find a student by RA", async () => {
        await studentModel.createStudent({
            ra: 12345,
            cpf: "11122233344",
            name: "John Doe",
            email: "john@example.com"
        });
        const student = await studentModel.findStudentBy("ra", 12345);
        expect(student).toHaveProperty("name", "John Doe");
    });

    it("should update a student", async () => {
        await studentModel.createStudent({
            ra: 12345,
            cpf: "11122233344",
            name: "John Doe",
            email: "john@example.com"
        });
        const updated = await studentModel.updateStudent(12345, { name: "John Updated" });
        expect(updated).toHaveProperty("name", "John Updated");
    });

    it("should delete a student", async () => {
        await studentModel.createStudent({
            ra: 12345,
            cpf: "11122233344",
            name: "John Doe",
            email: "john@example.com"
        });
        await studentModel.deleteStudent(12345);
        const student = await studentModel.findStudentBy("ra", 12345);
        expect(student).toBeNull();
    });

    it("should return student count", async () => {
        await studentModel.createStudent({
            ra: 12345,
            cpf: "11122233344",
            name: "John Doe",
            email: "john@example.com"
        });
        await studentModel.createStudent({
            ra: 123456,
            cpf: "11122233355",
            name: "John Doe 2",
            email: "john2@example.com"
        });
        const count = await studentModel.countStudents({});
        expect(count).toBe(2);
    });
});