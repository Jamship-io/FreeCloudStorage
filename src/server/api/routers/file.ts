import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const fileRouter = createTRPCRouter({

  getGreeted: publicProcedure.query(async ()=>{
    return "Hello World :)"
  }),

  // model File {
  //   id        String   @id @default(cuid())
  //   file_name String
  //   file_size Int
  //   file_type String
  //   date      DateTime
  //   chunks    Chunk[]  @relation("FileToChunks")
  //   User      User?    @relation(fields: [userId], references: [id])
  //   userId    String?
  // }

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
                    // id: input.id,
                    file_name: input.file_name,
                    file_size: input.file_size,
                    file_type: input.file_type,
                    userId: input.userId,
                    date: input.date
                },
            });

            return file;
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
        .query(async ({ ctx }) => {
            const files = await ctx.db.file.findMany();
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
