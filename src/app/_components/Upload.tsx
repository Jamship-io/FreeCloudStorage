"use client";
import axios from "axios";
import { saveAs } from 'file-saver';
// src/app/page.tsx
import redirect from 'next/app';
import { ChangeEvent, useEffect, useState } from 'react';
import { splitter } from "../logic/splitter";

// async function useFetch(){
//     const [data, setData] = useState(null);
//     const response = await axios.get("")
// }

async function theLoop(filesArray: File[]) {
    const chunkSize = 1024 * 1024;
    const size = filesArray[0]?.size;
    const nChunks = size && size / (1024 * 1024)  //1mb chunks


    console.log(`Size ${size} && nChunks ${nChunks}`)
    // console.log(files)

    if (size && nChunks) {
        // const splitted = await split(filesArray[0])
        for (let chunk = 0; chunk < nChunks; chunk++) {

            const start = chunk * chunkSize;
            const end = (chunk + 1) * chunkSize

            const splitted = await splitter(filesArray[0], start, end)
            const blob = new Blob([splitted])
            // const blob = new Blob([splitted]);
            saveAs(blob, filesArray[0]?.name)

            // const buffer = Buffer.from(splitted)
            console.log(`Chunk with i ${chunk} && start ${start} && end ${end}\n `, blob)

        }
    }
}

// async function getSplit(file: File){
//     const splitted = await split(file)
//     console.log(splitted)
//     return splitted;
// }

function upload(files: FileList) {
    const filesArray = Array.from(files) as File[];

    console.log(filesArray[0]?.size)
    //for single file - 
    if (filesArray.length === 1) {
        theLoop(filesArray);
        // SAVE THE DATA HERE TO THE DB
        // const encrypter;
    }
    else {
        filesArray.forEach(file => {
            // handle if there are more than one files
            console.log("more than one files")
            // const splitted = split(file)
            // const blob = new Blob([chunk]);
            // saveAs(blob, filesArray[0]?.name)
        });
    }


}

export default function UploadComponent() {
    const [files, setFiles] = useState<FileList | null>();
    // const resp = await useFetch();
    // console.log("resp", resp)
    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        setFiles(e.target?.files)
    }

    async function handleClick() {
        if (files) {

            // THIS WORKS ALL GOOD, ONLY THE SPLITTER DOESNT WANT TO SPLIT THE FILE AS IT IS Uint8Array
            // NEED TO CONVERT IT TO BUFFER TO SLICE IT
            // GOOD GOING 
            upload(files)
        }
    }
    return (
        <main className="">
            <h1 className="text-3xl my-5">Hello World :) </h1>
            <div className="flex flex-row justify-center items-center">
                <input type="file" onChange={handleFile} multiple />
                <button className="bg-[#007bff] px-5 py-1 rounded-sm" onClick={handleClick}>
                    Upload
                </button>
            </div>
        </main>
    );
}