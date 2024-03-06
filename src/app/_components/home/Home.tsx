"use client"

import React from 'react';
import Signin from '../auth/Signin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';


export default function HomeComponent({files}: {
    files: {
        id: string;
        file_name: string;
        file_size: number;
        file_type: string;
        date: Date | null;
        userId: string | null;

    }[]
}) {

    // // const session = await getServerSession(authOptions); // add the auth options for it to work, thankyou github
    // // console.log(session?.user);
    const router = useRouter()
    // const session = useSession();
    // console.log(session)


    // if (!session || !session?.data?.user) {
    //     return (
    //         <div>
    //             <div>Not logged in</div>
    //             <Signin></Signin>
    //         </div>
    //     );
    // }

    function handleClick(file_id: NavigateOptions){
        const url = "/file/" + String(file_id);
        router.push(url);
        
    }

    return (
        <div className='w-[90%] flex flex-col items-center justify-center'>
            <div>
            Home
            </div>
            <div className='w-[50%]'>
                {files?.map((file, index) => (
                    <button key={index} onClick={()=>{handleClick(file.id as NavigateOptions)}} className='bg-black m-1 p-1 rounded-md'>{file?.file_name}</button  >
                ))}
            </div>
        </div>

    );
}



