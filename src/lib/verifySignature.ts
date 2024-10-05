import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Function to verify the Cloudinary signature
export const verifySignature = async ( version: string,  signature: string,  publicId: string ): Promise<string | null> => {
  try {
   
    // Verify cloudinary signature
    const expectedSignature = cloudinary.utils.api_sign_request(
      { public_id: publicId || '', version },
      process.env.CLOUDINARY_API_SECRET!
    );

    // Compare the expected signature with the provided one
    if (expectedSignature === signature) {
      return publicId; // Return the publicId if signature matches
    }

    return null; // Return null if verification fails
  } catch (error) {
    console.error("Cloudinary Error: ", error);
    throw new Error("Failed to verify Cloudinary signature");
  }
};
