import { NextRequest, NextResponse } from "next/server";
import uploader from "../../../../actions/uploader";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("inside post req")

    const data: ArrayBuffer = await req.arrayBuffer()
    console.log("Recieved inside API route - ", data)

    const uploadResp = await uploader(data);
    return new Response(JSON.stringify(uploadResp))
}

// // pages/api/upload.js
// import { NextApiRequest, NextApiResponse } from 'next';
// import uploader from "actions/uploader"

// export async function POST(req: NextRequest, res: NextResponse) {
//     const chunk: ArrayBuffer = await req.arrayBuffer();
//     const metadata = await req.json()
//     console.log(chunk)
//     console.log(metadata)
//     const result = await uploader({chunk, metadata});
//       return new Response(JSON.stringify(result))
// }

