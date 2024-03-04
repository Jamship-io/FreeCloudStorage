"use server";
import { Telegram } from 'telegraf';
import { Readable } from 'stream';
import { config } from 'dotenv';

config(); 

const API_TOKEN = process.env.API_TOKEN as string;
const CHAT_ID = process.env.CHAT_ID as string;

if (!API_TOKEN || !CHAT_ID) {
  console.error('Missing API_TOKEN or CHAT_ID in the environment variables.');
}

const telegram = new Telegram(API_TOKEN);

export default async function uploader(data: ArrayBuffer): Promise<Buffer | undefined> {
  console.log('Uploading...');

  try {
    const buffer = Buffer.from(data);
    console.log("Data received in Uploader", buffer);

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    await telegram.sendMessage(CHAT_ID, 'Hello World :)');
    await telegram.sendDocument(CHAT_ID, { source: readableStream }, { caption: "abc.jpg" });

    console.log('Upload complete.');
    return buffer;
  } catch (error) {
    console.error('Error uploading:', error);
  }
}
