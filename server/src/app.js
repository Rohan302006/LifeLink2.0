import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet()); // safe default security headers
app.use(cors({ origin: env.CLIENT_URL, credentials: true })); // credentials = allow the login cookie
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// Health check: also proves the database connection works.
app.get("/api/health", async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
});

// Later phases mount modules here, e.g. app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler); // must be last

export default app;