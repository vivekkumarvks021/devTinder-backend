import express from "express";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

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
