import React from 'react';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { authOptions } from '~/server/auth';
import Signin from './_components/Signin';
import { redirect } from 'next/navigation';
import { api } from '~/trpc/server';

export default async function Home() {
    const session = await getServerSession(authOptions); // add the auth options for it to work, thankyou github
    console.log(session?.user);

    if (!session || !session?.user) {
        return (
            <div>
                <div>Not logged in</div>
                <Signin></Signin>
            </div>
        );
    }
    const files = await getAllFiles();
    return (
        <div>
            <div>
            Home
            </div>
            <div>
                {files.map((file, index) => (
                    <h1 key={index}>{file?.file_name}</h1>
                ))}
            </div>
        </div>

    );
}

async function getAllFiles() {
    const files = await api.file.getAllFiles.query()
    // console.log("files", files)
    return files;
}
