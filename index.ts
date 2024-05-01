import express from "express";
import userRouter from "./routing/userRoutes";
import mongoose from "mongoose";

// import crypto = require("crypto");
// const express = require('express')

const app = express();

// для обработки post запросов
app.use(express.json());

app.use(userRouter);

const port = 3001;

mongoose
  .connect(
    "mongodb+srv://ushikevich:admin@ushink.qinep94.mongodb.net/?retryWrites=true&w=majority&appName=Ushink"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
