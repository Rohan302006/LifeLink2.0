import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export function notFound(req, res) {
    res.status(404).json({ error: { message: "Route not found" } });
}

// Express recognises an error handler by its 4 parameters, so keep `next`.
export function errorHandler(err, req, res, next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: {
                message: "Invalid input",
                details: err.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
            },
        });
    }
    if (err instanceof ApiError) {
        return res.status(err.status).json({ error: { message: err.message } });
    }
    // Log only the message. Never log request bodies: they can contain personal health data.
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: { message: "Something went wrong" } });
}