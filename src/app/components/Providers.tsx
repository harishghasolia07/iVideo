//https://imagekit.io/docs/integration/nextjs#uploading-files-in-next.js
"use client";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./Notification";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Providers({ children }: { children: React.ReactNode }) {

    const authenticator = async () => {
        try {
            const response = await fetch("/api/imagekit-auth");

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            TODO: console.log(error)
            throw new Error(`Imagekit Authentication request failed`);
        }
    };

    return (
        //We wrap the whole thing with session provider because we want that our user should be authenticated only then he can upload file and We wrap the children with provider
        <SessionProvider refetchInterval={5 * 60}>
            <NotificationProvider>
                <ImageKitProvider
                    publicKey={publicKey}
                    urlEndpoint={urlEndpoint}
                    authenticator={authenticator}
                >
                    {children}
                </ImageKitProvider>
            </NotificationProvider>
        </SessionProvider>
    );
}