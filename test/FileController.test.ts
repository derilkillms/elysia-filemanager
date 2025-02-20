// test/FileController.test.ts
import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import { Elysia } from 'elysia';
import { getFiles, createFile, getFileById } from '../src/controllers/FileController';
import prisma from '../prisma/client';

beforeAll(async () => {
    await prisma.file.deleteMany(); // Membersihkan data sebelum test
});

afterAll(async () => {
    await prisma.$disconnect(); // Menutup koneksi Prisma setelah test
});

describe('FileController', () => {
    it('should create a new file', async () => {
        const response = await createFile({
            filename: 'Test File',
            parent: 0,
            typefile: 'text/plain',
        });

        expect(response?.success).toBe(true);
        expect(response?.data?.filename).toBe('Test File');
    });

    it('should get all files', async () => {
        const response = await getFiles();

        expect(response?.success).toBe(true);
        expect(Array.isArray(response?.data)).toBe(true);
        expect(response?.data?.length).toBeGreaterThan(0);
    });

    it('should get file by ID', async () => {
        const newFile = await createFile({
            filename: 'Child File',
            parent: 1,
            typefile: 'text/plain',
        });

        const response = await getFileById('1');

        expect(response?.success).toBe(true);
        expect(Array.isArray(response?.data)).toBe(true);
        expect(response?.data?.[0]?.filename).toBe('Child File');
    });
});
