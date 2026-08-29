import express from "express";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Health-check route
app.get("/", (_request, response) => {
  response.status(200).json({
    success: true,
    message: "DevTinder API is running",
  });
});

// Auth routes
app.use("/api/auth", authRouter);

// Error middleware always routes ke baad
app.use(errorHandler);

export default app;
