"use server";

import { api } from "~/trpc/server";

export async function createChunk(
    metadata: {
        parent_file_id: string;
        chunk_name: string;
        chunk_id: string;
        chunk_size: number;
        timeStamp: Date;
    },
    // parent_file_id: string,
    // message_id: string
): Promise<void> {
    const createChunk = api.file.createChunk;

    await createChunk.mutate(metadata);
    console.log("CHunk created ---- ", createChunk)

}
