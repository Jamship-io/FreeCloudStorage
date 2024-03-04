import { Telegram } from 'telegraf';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
require('dotenv').config();

const API_TOKEN = process.env.API_TOKEN as string;
const CHAT_ID = process.env.CHAT_ID as string;

if (!API_TOKEN || !CHAT_ID) {
  console.error('Missing API_TOKEN or CHAT_ID in the environment variables.');
}

const telegram = new Telegram(API_TOKEN);

export default async function uploader(data: ArrayBuffer): Promise<Buffer| undefined> {
  console.log('Uploading...');

  try {
    const buffer = Buffer.from(data)
    console.log("Data recieved in Uploader", buffer)

    await telegram.sendMessage(CHAT_ID, 'Hello World :)');
    await telegram.sendDocument(CHAT_ID, { source: buffer }, {caption  : "abc.jpg"});

    // THAT IS ALL FOR TODAY
    // WORKS FINE
    // UPLOAD AND ALL BUFFER SHIT WORKING COOL
    // CANT CHANGE THE FILE NAME, THAT THE BOT HANDLES, WE CAN CHANGE IT WHEN WE DOWNLOAD THE FILE AND SET IT TO THE METADATA
    // GOODNIGHT
    // DELETE THE EXCESSIVE NPM LIBS, GOODNIGH :)
    // NOW THE BUFFER IS FOR SOME REASON 20B FIX IT :')


    console.log('Upload complete.');
    return buffer;
  } catch (error) {
    console.error('Error uploading:', error);
  }
}