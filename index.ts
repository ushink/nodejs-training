import express, { Request, Response } from "express";
import { users } from "./mock";
import crypto from "crypto";

// import crypto = require("crypto");
// const express = require('express')

const app = express();

// для обработки post запросов
app.use(express.json());

const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

app.post("/users", (req: Request, res: Response) => {
  //генерируем уникальный id
  const id = crypto.randomUUID();
  
  //добавляем нового пользователя в массив
  users.push({ ...req.body, id });

  res.status(200).json({ message: "Пользователь успешно добавлен" });
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
