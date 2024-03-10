"use server";

import { Telegram } from 'telegraf';
import { Readable } from 'stream';
import { config } from 'dotenv';
import { api } from '~/trpc/server';

config();

console.log("isndie uplaod")

const API_TOKEN = process.env.API_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// if (!API_TOKEN || !CHAT_ID) {
//   console.error('API_TOKEN or CHAT_ID not found :(');
// }

const telegram = new Telegram(API_TOKEN!);

// type uploadData = {
//   chunk : ArrayBuffer,
//   metadata: object
// }

export default async function uploader(data: ArrayBuffer): Promise<object | undefined> {
  // const {chunk, metadata} = data;
  const chunk = data;
  console.log('Uploading...');
  try {
    if (!API_TOKEN || !CHAT_ID) {
      console.error('API_TOKEN or CHAT_ID is null .');
      return undefined;
    }

    const buffer = Buffer.from(chunk);

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    const botResponse = await telegram.sendDocument(CHAT_ID, { source: readableStream }, { caption: "StealStorage" });
    console.log("BOT Resp -  ", botResponse)

    // SAVE CHUNK METADATA TO DB HERE ----------

    console.log('Upload complete.');

    return botResponse;

  } catch (error) {
    console.error('Error uploading:', error);
    return undefined;
  }
}
