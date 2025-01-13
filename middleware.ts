import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { ResponseType } from "@/lib/types/apiResponse";
import { connectDB } from "@/server/db/config"
import { NextResponse } from "next/server";



export async function middleware(request: any)  {
    try {

        await connectDB();
        
    } catch (e) {
        console.error("Database connection failed", e);
        return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build()
    }

    return NextResponse.next();
}


export const config = {
    matcher: '/api*',
  }