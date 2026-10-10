// const express = require('express');
import express from 'express';
import { config } from "dotenv";

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";
import { connectDB, disconnectDB } from './config/db.js';

config();
connectDB();

const app = express();


// API Routes
app.use("/movies", movieRoutes);


// app.get('/hello', (req, res)=> {
//     res.json({message: "Hello World"});
// });

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server running PORT ${PORT}`);
});

// GET, POST, PUT, DELETE
// http://localhost:5001/

// AUTH 
// MOVIE
// USERS
//WATCHLIST

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});