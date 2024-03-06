import React from 'react';
import HomeComponent from './_components/home/Home';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { api } from '~/trpc/server';

export default async function Home() {
    const session = await getServerSession(authOptions); // add the auth options for it to work, thankyou github
    const files = await api.file.getAllFiles.query()
    console.log(session?.user);
    return (
        <div className='flex items-center justify-center w-auto'>
            <HomeComponent files={files}></HomeComponent>
        </div>

    );
}
