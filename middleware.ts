//https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                //allow auth related routes-->(So thing is if we return true then it will pass that path without check)
                if (pathname.startsWith("/api/auth") ||
                    pathname == "/login" ||
                    pathname == "/register"
                ) {
                    return true
                }

                //public
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true
                }

                // All other routes require authentication(If a user does not have a valid token, they are blocked from accessing other pages.)
                return !!token
            },

        },
    },
)

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ],
};