import express from "express";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profile.routes.js";
import connectionRequestRouter from "./routes/connection-request.routes.js";
import feedRouter from "./routes/feed.routes.js";

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
app.use("/api/profile", profileRouter);
app.use("/api/requests", connectionRequestRouter);
app.use("/api/users", feedRouter);

// Error middleware always routes ke baad
app.use(errorHandler);

export default app;
