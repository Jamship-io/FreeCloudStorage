"use client"

import React, { useState } from 'react';
import Signin from '../auth/Signin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import UploadButton from './_upload/UploadModal';
import { splitter } from 'actions/splitter';
import THELOOP from 'actions/THELOOP';
import UploadModal from './_upload/UploadModal';
import { FileCollapse } from './_upload/FileCollapse';


// export default function HomeComponent(){
export default function HomeComponent({ files }: {
    files: {
        id: string;
        file_name: string;
        file_size: number;
        file_type: string;
        date: Date | null;
    }[]
}) {


    const [isUploadClicked, setIsUploadClicked] = useState(false)
    // // const session = await getServerSession(authOptions); // add the auth options for it to work, thankyou github
    const router = useRouter()


    if (isUploadClicked) {
        console.log("CLIKC")
        // await THELOOP()
    }

    function handleClick(file_id: NavigateOptions) {
        const url = "/file/" + String(file_id);
        router.push(url);

    }



    return (
        <div className='flex flex-col w-full min-h-screen justify-center items-center'>
            <nav className='flex justify-between px-10 pt-5 w-full'>
                Home
                <UploadModal setIsUploadClicked={setIsUploadClicked}></UploadModal>
            </nav>
            <div className='w-[60%] flex items-center justify-center flex-col bg-white'>
                {files?.map((file, index) => (
                    // <button key={index} onClick={() => { handleClick(file.id as NavigateOptions) }} className='bg-black m-1 p-1 rounded-md'>{file?.file_name}</button  >
                    <FileCollapse key={index} filename={file.file_name} size={file.file_size}></FileCollapse>
                ))}
            </div>
        </div>

    );
}

