"use client"

import React, { useState } from 'react';
import Signin from '../auth/Signin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
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
    const [isUploadClicked, setIsUploadClicked] = useState(false);
    const router = useRouter();

    if (isUploadClicked) {
        console.log("CLICK");
        // await THELOOP()
    }

    // function handleClick(file_id: string) {
    //     const url = "/file/" + String(file_id);
    //     router.push(url);
    // }

    return (
        <div className='flex w-full min-h-screen justify-center overflow-hidden overflow-y-hidden'>
            <nav className='fixed flex justify-between items-center px-10 py-4 w-full bg-[#1D1C26] font-yoshida text-4xl text-[#B5ADFF]'>
                STEAL STORAGE
                <UploadModal setIsUploadClicked={setIsUploadClicked}></UploadModal>
            </nav>
            <div className='w-[60%] flex flex-col bg-[#1D1C26] self-start mt-28 h-screen overflow-y-hidden'>
                <div className="flex items-center justify-between p-2 text-xl">

                    <div className="w-72 flex items-center justify-center">
                        <h1 className='mx-2 truncate '>File Name</h1>
                    </div>

                    <div className="w-36 flex items-center justify-center">
                        <h1 className="mx-2">Date Created</h1>
                    </div>

                    <div className="w-36 flex items-center justify-center">
                        <h1 className="mx-2">Size</h1>
                    </div>
                </div>
                <div className="file-container overflow-y-scroll">
                    {files?.map((file, index) => (
                        <FileCollapse
                            key={index}
                            filename={file.file_name}
                            size={file.file_size}
                            date={dateFormatter(file.date)}
                        // onClick={handleClick(file.id)}
                        ></FileCollapse>
                    ))}
                </div>
            </div>
        </div>
    );
}



function dateFormatter(date: Date | null) {
    if (!date) return "";

    const timeinMillis = date.getTime();
    const DateFromDate = new Date(timeinMillis);
    const day = DateFromDate.getDate();
    const month = DateFromDate.getMonth() + 1;
    const year = DateFromDate.getFullYear();

    const fullDate = day + "-" + month + "-" + year;
    return fullDate;
}