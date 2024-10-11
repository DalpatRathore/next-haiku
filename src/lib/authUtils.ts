import 'server-only';
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const DEFAULT_EXPIRATION = "1h"; // Default expiration time for tokens
const DEFAULT_MAX_AGE = 60 * 60; // Default max age in seconds (1 hour)

// Create Token
export const createToken = (userId: string, tokenTime: string = DEFAULT_EXPIRATION): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: tokenTime });
};

// Verify Token
export const verifyToken = (): string | null => {
  const token = cookies().get("mynexthaiku")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "object" && "userId" in decoded) {
      return (decoded as JwtPayload & { userId: string }).userId;
    }

    return typeof decoded === "string" ? decoded : null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Set Token
export const setToken = (tokenValue: string, maxAge: number = DEFAULT_MAX_AGE) => {
  cookies().set("mynexthaiku", tokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge,
    secure: true,
  });
};

// Delete Token
export const deleteToken = () => {
  cookies().set("mynexthaiku", "", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: -1,
    secure: true,
  });
};
