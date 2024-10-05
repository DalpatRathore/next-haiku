import { getUser } from "@/actions/user/getUser";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
console.log(process.env.CLOUDINARY_API_SECRET)

  const user = await getUser(); 
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { paramsToSign } = body;

  // Generate Cloudinary signature
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({ signature });
}
