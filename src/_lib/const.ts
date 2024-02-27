const isProduction = process.env.NODE_ENV === "production";

export const API_URL = isProduction ? `${process.env.VERCEL_URL}/api` : process.env.API_URL;
export const CLIENT_API_URL = process.env.NEXT_PUBLIC_API_URL;
