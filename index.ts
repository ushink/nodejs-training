import express, { Request, Response } from "express";
import { userType, users } from "./mock";
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

app.post("/users", (req: Request<{}, {}, userType>, res: Response) => {
  // обработка post если указаны не те данные или их нет
  const { id, name, age, isAdmin, experience } = req.body;

  if (id) {
    return res.status(422).json({ message: "Нужно убрать id из объекта" });
  }

  if (!isAdmin) {
    res.status(422).json({ message: "Поле isAdmin обязательное" }); //TODO: Спросить почему если в поле isAdmin false выпадает ошибка
    return;
  }

  //генерируем уникальный id
  const uniqId = crypto.randomUUID();

  //добавляем нового пользователя в массив
  users.push({ ...req.body, id: uniqId });

  res.status(200).json({ message: "Пользователь успешно добавлен" });
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
