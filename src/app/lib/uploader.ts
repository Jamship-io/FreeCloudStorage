"use server";
import { Telegram } from 'telegraf';
import { Readable } from 'stream';
import { config } from 'dotenv';

config();

const API_TOKEN = process.env.API_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!API_TOKEN || !CHAT_ID) {
  console.error('API_TOKEN or CHAT_ID is null or undefined.');
}

const telegram = new Telegram(API_TOKEN!);

export default async function uploader(data: ArrayBuffer): Promise<Buffer | undefined> {
  console.log('Uploading...');
  try {
    if (!API_TOKEN || !CHAT_ID) {
      console.error('API_TOKEN or CHAT_ID is null or undefined.');
      return undefined;
    }

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
    return undefined;
  }
}
