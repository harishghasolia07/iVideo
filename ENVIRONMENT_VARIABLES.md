# Environment Variables Required for Deployment

Make sure to set these environment variables in your deployment platform (Vercel, Netlify, etc.):

## Database
- `MONGODB_URL` - Your MongoDB connection string

## NextAuth Configuration
- `NEXTAUTH_SECRET` - A random secret key for NextAuth
- `NEXTAUTH_URL` - Your deployment URL (e.g., https://yourdomain.com)

## ImageKit Configuration (for file uploads)
- `NEXT_PUBLIC_URL_ENDPOINT` - Your ImageKit URL endpoint
- `NEXT_PUBLIC_PUBLIC_KEY` - Your ImageKit public key
- `IMAGEKIT_PRIVATE_KEY` - Your ImageKit private key

## Local Development
For local development, create a `.env.local` file in the root directory with these variables. 