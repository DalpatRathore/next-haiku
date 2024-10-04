import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const getAuthUser = (): JwtPayload | null => {
  const authCookie = cookies().get("mynexthaiku")?.value;

  if (authCookie && process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(authCookie, process.env.JWT_SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return null;
    }
  }
  return null; // Return null if no authCookie or JWT_SECRET is missing
};
