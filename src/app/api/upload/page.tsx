
import { NextRequest, NextResponse } from "next/server";
import Home from "~/app/_components/Home";

const Main = async () => {
  return(
    <Home></Home>
  )
};

export async function handler(req:NextRequest, res:NextResponse) {
    if(req.method === 'GET'){
      const message = "hello world :)"
      res.json({message})
    }
  }

export default Main;