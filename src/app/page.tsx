import React, { useState } from 'react';
import HomeComponent from './_components/home/Home';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { api } from '~/trpc/server';
import Signin from './_components/auth/Signin';
import HomePublic from './_components/home/HomePublic';
import UploadModal from './_components/home/_upload/UploadModal';

export default async function Home() {
    const session = await getServerSession(authOptions); // add the auth options for it to work, thankyou github
    // console.log(session?.user);
    if (!session || !session?.user) {
        return (
            <div>
                <HomePublic></HomePublic>
                <Signin></Signin>
            </div>
        );
    }
    const files = await api.file.getAllFiles.query({userId: session?.user?.id});
      
    return (
        <div className='flex items-center justify-center w-full'>
            <HomeComponent files={files}></HomeComponent>
            {/* <HomeComponent ></HomeComponent> */}
        </div>

    );
}

