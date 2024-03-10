// "use client";

// import { ChangeEvent, useState } from 'react';
// import axios from 'axios';
// import { splitter } from 'actions/splitter';
// import { saveAs } from 'file-saver';
// import { api } from '~/trpc/react';
// import { useSession } from "next-auth/react";



// async function upload(files: FileList, userId: string | undefined) {
//     // console.log("user id ", userId)
//     console.log(files)
//     const filesArray = Array.from(files);

//     //for single file - 

//     if (filesArray.length === 1) {
//         // SAVE THE METADATA OF THE FILE HERE ...        
//         await theLoop(filesArray);
//     }
//     else {
//         filesArray.forEach(file => {
//             // handle if there are more than one files
//             console.log("more than one files")
//         });
//     }


// }

// type MetadataType = {
//     file_name: string;
//     file_size: number;
//     file_type: string;
//     date: Date
//     userId: string;
// };

// // async function useSavetoDB( metadata: MetadataType ) {
// //     const createFile =  api.file.createFile.useMutation()
// //     createFile.mutate(metadata)
// // }

// export default function UploadComponent() {

//     const session = useSession();
//     console.log("session", session)

//     const createFile =  api.file.createFile.useMutation()

//     // console.log("Session - ", session?.data?.user)

//     const [files, setFiles] = useState<FileList | null>();
//     async function handleFile(e: ChangeEvent<HTMLInputElement>) {
//         setFiles(e.target?.files)
//     }

//     // const ctx = api.useContext();

//     async function handleClick() {
//         if (files) {
//             const userId = session?.data?.user.id
//             await upload(files, userId)
//             const file = files[0]
//             const metadata = {
//                 file_name: file?.name.toString() ?? '',
//                 file_type: file?.type ?? '',
//                 file_size: file?.size ?? 0,
//                 user_id: userId ?? '' ,
//                 date: new Date(),
//             }
//             console.log(userId)
//             // await useSavetoDB(metadata)
//             createFile.mutate(metadata, {
//                 onSuccess: () => {
//                 //   console.log('Mutation succeeded. Invalidate and refetch.');
//                 //   void ctx.file.getAllFiles.invalidate(); // tried to refetch the data, didnt work
//                 //   redirect("/upload")
//                 },
//               });
            
//             // THIS WORKS BUT THIS SHOULD RUN ONCE THE UPLOAD IS COMPLETE
//         }
//     }
//     return (
//         <main className="">
//             <h1 className="text-3xl my-5">Hello World :) </h1>
//             <div className="flex flex-row justify-center items-center">
//                 <input type="file" onChange={handleFile} />
//                 <button className="bg-[#007bff] px-5 py-1 rounded-sm" onClick={handleClick}>
//                     Upload
//                 </button>
//             </div>
//         </main>
//     );
// }