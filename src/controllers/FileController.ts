//import prisma client
import prisma from "../../prisma/client";

/**
 * Getting all files
 */
export async function getFiles() {
    try {
        //get all files
        const files = await prisma.file.findMany({where: {parent:0}, orderBy: { id: 'desc' } });
        //prisma + schema + query
        //return response json
        return {
            success: true,
            message: "List Data files!",
            data: files,
        };
    } catch (e: unknown) {
        console.error(`Error getting files: ${e}`);
    }
}

export async function createFile(options: { filename: string; parent: number | string; typefile: string }) {
    try {
        const { filename, parent, typefile } = options;

        // Validasi dan konversi parent menjadi number
        const parentId = typeof parent === 'string' ? Number(parent) : parent;

        // Pastikan parentId valid (bukan NaN)
        if (isNaN(parentId)) {
            throw new Error("Parent ID harus berupa angka yang valid.");
        }

        // Buat data post dengan Prisma
        const post = await prisma.file.create({
            data: {
                filename: filename,
                parent: parentId,
                typefile: typefile,
            },
        });

        // Mengembalikan response json
        return {
            success: true,
            message: "Post Created Successfully!",
            data: post,
        };
    } catch (e: unknown) {
        console.error(`Error creating post: ${e}`);
        return {
            success: false,
            message: `Error creating post: ${e}`,
        };
    }
}


export async function getFileById(id: string) {
    try {

        // Konversi tipe id menjadi number
        const postId = parseInt(id);

        

        //get post by id
        const post = await prisma.file.findMany({
            where: { parent: postId },
        });

        //if post not found
        if (!post) {
            return {
                sucess: true,
                message: "Detail Data Post Not Found!",
                data: null,
            }
        }

        //return response json
        return {
            success: true,
            message: `Detail Data Post By ID : ${id}`,
            data: post,
        }
    } catch (e: unknown) {
        console.error(`Error finding post: ${e}`);
    }
}

export async function updateFile(id: string, options: { filename: string; parent: number | string; typefile: string }) {
    try {

        // Konversi tipe id menjadi number
        const postId = parseInt(id);
         //get filename and typefile
         const { filename,parent, typefile } = options;

         // Validasi dan konversi parent menjadi number
         const parentId = typeof parent === 'string' ? Number(parent) : parent;

         // Pastikan parentId valid (bukan NaN)
         if (isNaN(parentId)) {
             throw new Error("Parent ID harus berupa angka yang valid.");
         }

       

        //update post with prisma
        const post = await prisma.file.update({
            where: { id: postId },
            data: {
                filename: filename,
                parent: parentId,
                typefile: typefile,
            },
        });

        //return response json
        return {
            success: true,
            message: "Post Updated Successfully!",
            data: post,
        }
    } catch (e: unknown) {
        console.error(`Error updating post: ${e}`);
    }
}

export async function deleteFile(id: string) {
    try {

        // Konversi tipe id menjadi number
        const postId = parseInt(id);

        //delete post with prisma
        await prisma.file.delete({
            where: { id: postId },
        });

        //return response json
        return {
            success: true,
            message: "Post Deleted Successfully!",
        }
    } catch (e: unknown) {
        console.error(`Error deleting post: ${e}`);
    }
}