import "dotenv/config";
import { z } from "zod";

const schema = z.object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL is missing"),
    JWT_SECRET: z.string().min(32, "JWT_SECRET is missing or shorter than 32 characters"),
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    CLIENT_URL: z.string().default("http://localhost:5173"),
    UPLOAD_DIR: z.string().default("./private_uploads"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    // Print which settings are wrong (never print their values), then stop.
    for (const issue of parsed.error.issues) {
        console.error(`Config error: ${issue.path.join(".")} - ${issue.message}`);
    }
    process.exit(1);
}

export const env = parsed.data;