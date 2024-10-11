import 'server-only';
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

// Create Token (not used in getUser, but useful for login/signup)
export const createToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" }); // Example expiration time of 1 hour
};

// Verify Token
export const verifyToken = (): string | null => {
  const token = cookies().get("mynexthaiku")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // If decoded is a JwtPayload, return userId
    if (typeof decoded === "object" && "userId" in decoded) {
      return (decoded as JwtPayload & { userId: string }).userId;
    }

    // If decoded is a string (rare), we handle this case separately
    return typeof decoded === "string" ? decoded : null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // Return null if verification fails
  }
};

// Delete Token
export const deleteToken = () => {
  cookies().set("mynexthaiku", "", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: -1, // Expire the cookie immediately
    secure: true,
  });
};
