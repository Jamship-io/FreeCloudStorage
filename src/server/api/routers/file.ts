import { Prisma } from "@prisma/client";
import { connect } from "http2";
import { string, z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

type createChunkType = {
    timestamp: Date;
    file: {
        connect: {
            id: string | undefined;
        };
    };
    parent_file_id: string;
    chunk_name: string;
    file_id: string;
    chunk_size: number;
};


export const fileRouter = createTRPCRouter({

    createFile: protectedProcedure
        .input(z.object({
            // id: z.string(),
            file_name: z.string().min(1),
            file_size: z.number().int(),
            file_type: z.string(),
            userId: z.string(),
            date: z.date()

        }))
        .mutation(async ({ ctx, input }) => {
            const file = await ctx.db.file.create({
                data: {
                    file_name: input.file_name,
                    file_size: input.file_size,
                    file_type: input.file_type,
                    date: input.date,
                    userId: input.userId,
                }
            });
            return file;
        }),
        

    createChunk: protectedProcedure
        .input(z.object({
            parent_file_id: z.string(),
            chunk_name: z.string(),
            // file_id: z.string(),
            chunk_size: z.number(),
            timeStamp: z.date(),
            chunk_id: z.string().min(1)
        }))
        .mutation(async ({ ctx, input }) => {
            const chunk = await ctx.db.chunk.create({
                data: {
                    timestamp: input.timeStamp,
                    chunk_id: input.chunk_id,
                    // file: {
                    //     connect: {
                    //         id: input.file_id
                    //     }
                    // },
                    parent_file_id: input.parent_file_id,
                    chunk_name: input.chunk_name,
                    // file_id: input.file_id as any,
                    chunk_size: input.chunk_size,
                    // // timestamp: input.timeStamp
                },
            });



            return chunk;
        }),





    getFileById: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            const file = await ctx.db.file.findUnique({
                where: { id: input },
                include: { chunks: true },
            });

            if (!file) {
                throw new Error("File not found");
            }

            return file;
        }),

        getAllFiles: protectedProcedure
        .input(z.object({
            userId: z.string()
        }))
        .query(async ({ ctx, input }) => {
          const userId = input?.userId;
      
          if (!userId) {
            throw new Error('User ID is required.');
          }
      
          const files = await ctx.db.file.findMany({
            where: {
              userId: userId,
            },
          });
      
          return files;
        }),
      

    getChunksByFileId: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            const fileChunks = await ctx.db.file.findUnique({
                where: { id: input },
                include: { chunks: true },
            });

            if (!fileChunks) {
                throw new Error("File not found");
            }

            return fileChunks.chunks;
        }),
});

export type FileRouter = typeof fileRouter
