"use client";
// src/app/page.tsx
import  redirect  from 'next/app';
import { ChangeEvent, useState } from 'react';

// async function useFetch(){
//     const [data, setData] = useState(null);
//     const response = await axios.get("")
// }

export default function Home() {
    const [file, setFile] = useState<File[] | null>([]);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const selectedFiles = e.target.files;

        if (selectedFiles) {
            const filesArray = Array.from(selectedFiles);
            console.log("filesArray", filesArray)
            setFile((prevFiles) => {
                return [...prevFiles || [], ...filesArray];
            });
        }
    }

    function handleClick() {
        console.log("Button clicked");
        // redirect("/jesse")
        
        console.log(file) // Check if this log statement is working
        // call the api call here
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
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
