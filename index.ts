import express from "express";
import userRouter from "./routing/userRoutes";

// import crypto = require("crypto");
// const express = require('express')

const app = express();

// для обработки post запросов
app.use(express.json());

app.use(userRouter);

const port = 3001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
