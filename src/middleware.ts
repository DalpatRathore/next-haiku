import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!); // Ensure your JWT_SECRET is defined

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("mynexthaiku")?.value; // Get the JWT token from cookies
  const url = req.nextUrl.clone(); // Clone the URL to safely modify it

  // Define the pages
  const isAuthPage =
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up") ||
    url.pathname.startsWith("/verify");

  const isDashboardPage = url.pathname.startsWith("/dashboard");
  const isCreateHaikuPage = url.pathname.startsWith("/create-haiku");

  try {
    // Verify the token if it exists
    if (token) {
      await jwtVerify(token, secret); // Verify the JWT using jose

      // If authenticated and on an auth page, redirect to dashboard
      if (isAuthPage) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    } else {
      // If not authenticated
      if (isDashboardPage || isCreateHaikuPage) {
        // Redirect to sign-in if trying to access protected pages
        url.pathname = "/sign-in";
        return NextResponse.redirect(url);
      }
    }
  } catch (error) {
    // Handle invalid token error
    console.error("JWT verification failed:", error);

    // Redirect to sign-in if the token is invalid
    if (isDashboardPage || isCreateHaikuPage) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Proceed to the requested page
}

export const config = {
  matcher: [
    "/", 
    "/sign-up", 
    "/sign-in", 
    "/dashboard/:path*", 
    "/verify/:path*", 
    "/create-haiku"
  ],
};
