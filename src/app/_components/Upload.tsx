"use client";

import { ChangeEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { splitter } from '../lib/splitter';
import { saveAs } from 'file-saver';


async function theLoop(filesArray: File[]): Promise<void> {

    const chunkSize = 1024 * 1024;
    const size = filesArray[0]?.size;
    const nChunks = size && size / chunkSize; // 1mb chunks

    console.log(`Size ${size} && nChunks ${nChunks}`);

    if (size && nChunks) {

        for (let chunk = 0; chunk < nChunks; chunk++) {

            const start = chunk * chunkSize;
            const end = (chunk + 1) * chunkSize;
            console.log(nChunks)

            // if (nChunks <= 1) {

                const splitted = await splitter(filesArray[0], start, end);
                // console.log("splitresponse", splitted)

                if (splitted !== undefined) {
                    console.log("Split done waiting for upload")


                    // DO NOT TOUCH HIGHLY UNSTABLE

                    // const returnVal = await axios.post("/api/upload", splitted, { responseType: "arraybuffer" });
                    const returnVal = await axios.post("/api/upload", splitted, { responseType: "json" });
                    console.log(returnVal)
                    // const originalArrBuffer: ArrayBuffer = returnVal.data[0] as ArrayBuffer;
                    // console.log(botResponse)
                    

                    
                    console.log("API Response - ", returnVal.data)
                    // console.log("Converted to Original - ", originalArrBuffer)

                    // const blob = new Blob([originalArrBuffer])
                    // saveAs(blob, filesArray[0]?.name)

                    console.log(`Chunk with i ${chunk} && start ${start} && end ${end}\n `);
                } else {
                    console.error(`Failed to split chunk ${chunk}`);
                }
            // }
        }
    }
}


async function upload(files: FileList) {
    console.log(files)
    const filesArray = Array.from(files);

    //for single file - 

    if (filesArray.length === 1) {
        // SAVE THE METADATA OF THE FILE HERE ...
        const file = filesArray[0]
        const metadata = {
            name: file?.name,
            size: file?.size,
            type: file?.type
        }
        await theLoop(filesArray);
        // SAVE THE DATA HERE TO THE DB
        // const encrypter;
    }
    else {
        filesArray.forEach(file => {
            // handle if there are more than one files
            console.log("more than one files")
        });
    }


}

export default function UploadComponent() {
    const [files, setFiles] = useState<FileList | null>();
    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        setFiles(e.target?.files)
    }

    async function handleClick() {
        if (files) {

            // THIS WORKS ALL GOOD, ONLY THE SPLITTER DOESNT WANT TO SPLIT THE FILE AS IT IS Uint8Array
            // NEED TO CONVERT IT TO BUFFER TO SLICE IT
            // GOOD GOING 
            await upload(files)
        }
    }
    return (
        <main className="">
            <h1 className="text-3xl my-5">Hello World :) </h1>
            <div className="flex flex-row justify-center items-center">
                <input type="file" onChange={handleFile} />
                <button className="bg-[#007bff] px-5 py-1 rounded-sm" onClick={handleClick}>
                    Upload
                </button>
            </div>
        </main>
    );
}