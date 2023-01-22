export const Config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337/api/",
    cmsUrl: process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:1337",
    contact: {
        port: Number(process.env.NEXT_PUBLIC_CONTACT_PORT),
        host: String(process.env.NEXT_PUBLIC_CONTACT_HOST),
        user: String(process.env.NEXT_PUBLIC_CONTACT_USER),
        pass: String(process.env.NEXT_PUBLIC_CONTACT_PASS),
    }
};
