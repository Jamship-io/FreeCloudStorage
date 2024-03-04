import { NextRequest, NextResponse } from "next/server";
import uploader from "~/app/lib/uploader";

// const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("inside post req")

    const data = await req.arrayBuffer()
    console.log("Recieved inside API route - ", data)

    const uploadResp = await uploader(data);
    return new Response(uploadResp)
}

// export { config } from 'next';


