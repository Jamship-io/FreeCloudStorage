import React from 'react';
import HomeComponent from './_components/home/Home';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { api } from '~/trpc/server';
import Signin from './_components/auth/Signin';

export default async function Home() {
    const session = await getServerSession(authOptions); // add the auth options for it to work, thankyou github
    // console.log(session?.user);
    if (!session || !session?.user) {
        return (
            <div>
                <div>Not logged in</div>
                <Signin></Signin>
            </div>
        );
    }
    const files = await api.file.getAllFiles.query()
    return (
        <div className='flex items-center justify-center w-auto'>
            <HomeComponent files={files}></HomeComponent>
        </div>

    );
}

