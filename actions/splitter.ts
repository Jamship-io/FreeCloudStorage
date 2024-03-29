import { Buffer } from "buffer";
import { api } from "~/trpc/server";

export async function splitter(file: File | undefined, start: number, end: number): Promise<ArrayBuffer | undefined> {
  if (!file) {
    return undefined;
  }

  const chunk = file;
  // const createchunk = api.file.createChunk.mutate

  const bufferPromise: Promise<ArrayBuffer | undefined> = new Promise<ArrayBuffer | undefined>((resolve) => {
    
    const reader = new FileReader();

    reader.readAsArrayBuffer(chunk);

    reader.onload = function (event) {
      const arrayBuffer = event.target?.result as ArrayBuffer;

      if (arrayBuffer) {
        // Convert ArrayBuffer to Buffer
        // const buffer = arrayBuffer
        const chunk = arrayBuffer.slice(start, end)
        // const buffer = Buffer.from(new Uint8Array(arrayBuffer));

        resolve(chunk);
      } else {
        resolve(undefined);
      }
    };
  });

  const newbuffer = await bufferPromise;
  // const buffer = Buffer.from(newbuffer)
  // console.log("Splitter Response - ", buffer);
  return newbuffer;
}
