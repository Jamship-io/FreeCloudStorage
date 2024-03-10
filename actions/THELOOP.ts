// "use server"
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { splitter } from "actions/splitter";
import uploader from "./uploader";
import { api } from "~/trpc/react";
import { createFile } from "~/utils/createFile";
import { createChunk } from "~/utils/createChunk";
import { useSession } from "next-auth/react";
import { UUID, randomUUID } from 'crypto';
import { FaStrikethrough } from "react-icons/fa";

export default async function THELOOP(file: File | undefined, setPercentage: Dispatch<SetStateAction<number>>, userId: string): Promise<void> {
    const chunkSize = 1024 * 1024;
    const size = file?.size;
    const nChunks = size && size / chunkSize; // 1mb chunks

    console.log(`Size ${size} && nChunks ${nChunks}`);

    if (size && nChunks) {

        const filemetadata = {
            // id: randomUUID,          
            file_name: file?.name.toString() ?? '',
            file_type: file?.type ?? '',
            file_size: file?.size ?? 0,
            date: new Date(),
            userId: userId
        }

        const fileId = await createFile(filemetadata)
        console.log("File created - ", fileId)

        for (let chunk = 0; chunk < nChunks; chunk++) {

            const start = chunk * chunkSize;
            const end = (chunk + 1) * chunkSize;
            console.log("Number of Chunks - " + nChunks)

            const splitted = await splitter(file, start, end);
            console.log(splitted)
            console.log("befpore if")
            if (splitted !== undefined) {
                console.log("Split done waiting for upload")
                console.log("befpore uplaod data defined")

                // const dataToUpload = {
                //     chunk: splitted,
                //     metadata: file
                // }

                const uploadResponse = await axios.post("/api/upload", splitted, { responseType: "json" });
                console.log("upload REsp", uploadResponse)


                const chunkMetaData = {
                    parent_file_id: fileId,
                    chunk_name: chunk + "_" + file.name,
                    chunk_id: uploadResponse.data?.document.file_id,
                    chunk_size: uploadResponse.data?.document.file_size,
                    timeStamp: new Date(uploadResponse.data?.date)
                    // timeStamp: new Date(uploadResponse.data?.document.file_size)
                }
                const uploadChunkMetaData = await createChunk(chunkMetaData)

                console.log("uploadChunkMetaData", uploadChunkMetaData)

                console.log("FILE ID ------ ", fileId)

                // const createChunk = await chun
                // const createChunk = await api.file.createChunk;
                // const metadata = {
                //     file_id: uploadResponse.data.
                // }
                // // createChunk.mutate()
                console.log(uploadResponse)
                // await uploader(splitted)

                console.log("after uplaod data defined")

                // ENCRYPT HERE

                // UPLOAD META DATA TO THE DB
                const percentage = ((chunk + 1) * 100 / Math.ceil(nChunks)).toFixed(2)
                setPercentage(parseInt(percentage))

                // console.log(`Chunk with i ${chunk} && start ${start} && end ${end}\n `);
            } else {
                console.error(`Failed to split chunk ${chunk}`);
            }
        }
    }
}
