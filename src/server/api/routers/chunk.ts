// import { z } from "zod";
// import {
//     createTRPCRouter,
//     protectedProcedure,
// } from "~/server/api/trpc";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const chunkRouter = createTRPCRouter({
//     createChunk: protectedProcedure
//         .input(z.object({
//             id: z.string(),
//             file_id: z.string(),
//             chunk_name: z.string().min(1),
//             chunk_size: z.number().int(),
//             message_id: z.string()
//             // date: z.date(),
//         }))
//         .mutation(async ({ ctx, input }) => {
//             // You can customize the creation logic based on your requirements
//             const file = await ctx.db.file.findUnique({
//                 where: {id: input.file_id}
//             })
//             if(!file){
//                 throw new Error("File not found :(")
//             }
            
//             const chunk = await ctx.db.chunk.create({


//                 // model Chunk {
//                 //     id         String @id @default(cuid())
//                 //     fileId     String
//                 //     file       File   @relation("FileToChunks", fields: [fileId], references: [id])
//                 //     chunk_name String
//                 //     chunk_size Int
//                 //     message_id String
//                 //   }


//                 // fix the types, goodnight
//                 data: {
//                     //   folderId: input.folderId,
//                     file_id: input.file_id,
//                     chunk_name: input.chunk_name,
//                     chunk_size: input.chunk_size,
//                     message_id: input.message_id,
//                     file: {connect: {id: file?.id}} as any,
//                 },
//             });

//             return chunk;
//         }),
        

//     getChunksUsingFileId: protectedProcedure
//         .input(z.string())
//         .query(async ({ ctx, input }) => {
//             const fileChunks = await ctx.db.file.findUnique({
//                 where: { id: input },
//                 include:{ chunks: true}
//             });

//             if (!fileChunks) {
//                 throw new Error("File not found");
//             }

//             return fileChunks.chunks;
//         }),

//     getChunkUsingId: protectedProcedure
//     .input(z.string())
//     .query(async ({ctx, input})=> {
//         const chunk = await ctx.db.chunk.findUnique({
//             where: {id: input}
//         })
//         if(!chunk){
//             throw new Error("Chunk Not Find :(")
//         }
//         return chunk;
//     })
//     ,
//     getAllFiles: protectedProcedure
//         .query(async ({ ctx }) => {
//             const files = await ctx.db.file.findMany();
//             return files;
//         }),
// });

// export type ChunkRouter = typeof chunkRouter;
