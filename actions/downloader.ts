"use server"
import { Telegram } from 'telegraf';
import { config } from 'dotenv';

config();

const API_TOKEN = process.env.API_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new Telegram(API_TOKEN!);

export async function downloader(message_id: string) {
    console.log("Downloading Chunk")
    const chunk = await bot.getFile(message_id)
    return chunk;
}
