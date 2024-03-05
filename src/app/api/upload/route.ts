import { NextRequest, NextResponse } from "next/server";
import uploader from "../../../lib/uploader";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("inside post req")

    const data: ArrayBuffer = await req.arrayBuffer()
    console.log("Recieved inside API route - ", data)

    const uploadResp = await uploader(data);
    return new Response(JSON.stringify(uploadResp))
}



