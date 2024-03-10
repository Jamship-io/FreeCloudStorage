"use server"
import { UUID } from 'crypto';
import { api } from '~/trpc/server';

export const createFile = async (
    metadata: 
    { 
        // id: UUID,
        file_name: string, 
        file_type: string, 
        file_size: number,
        userId: string
        date: Date 
    }) => {
  const file =  api.file.createFile;
  const result = await file.mutate(metadata);
  
//   if (createFile.error) {
//     console.error('Failed to create file:', createFile.error);
//     throw new Error('Failed to create file');
//   }

  const fileId = result.id

  return fileId;
};
