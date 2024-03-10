"use server";

import { Telegram } from 'telegraf';
import { Readable } from 'stream';
import { config } from 'dotenv';

config();


const API_TOKEN = process.env.API_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new Telegram(API_TOKEN!);

export default async function uploader(data: ArrayBuffer): Promise<object | undefined> {
  console.log('Uploading...');
  const chunk = data;
  try {
    if (!API_TOKEN || !CHAT_ID) {
      console.error('API_TOKEN or CHAT_ID is null');
      return undefined;
    }

    const buffer = Buffer.from(chunk);

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    const botResponse = await bot.sendDocument(CHAT_ID, { source: readableStream }, { caption: "StealStorage" });
    console.log("BOT Resp -  ", botResponse)

    console.log('Upload complete.');

    return botResponse;

  } catch (error) {
    console.error('Error uploading:', error);
    return undefined;
  }
}

