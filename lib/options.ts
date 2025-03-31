import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./db";
import User from "../models/User";
import bcrypt from "bcryptjs";

//Note: This is taken from documentation you can refer it from there-->https://next-auth.js.org/configuration/providers/credentials
export const authOptions: NextAuthOptions = {
    //1. First one is callback-->
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }
                try {
                    await connectToDatabase()
                    const user = await User.findOne({ email: credentials.email })

                    if (!user) {
                        console.log("❌ User not found");
                        throw new Error("No user found")
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password)

                    if (!isValid) {
                        throw new Error("Invalid Password")
                    }
                    // If everything is ok then we will return values and they will be stored in the session-->
                    return { id: user._id.toString(), email: user.email }

                } catch {
                    throw new Error("Authentication failed");
                }
            }
        }
        )
    ],
    //2. Second is callback-->
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    },
    //4. Forth is pages-->
    pages: {
        signIn: "/login",
        error: "/login"
    },
    //3. Third is session-->
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    //5. Fifth is secret-->
    secret: process.env.NEXTAUTH_SECRET
}
