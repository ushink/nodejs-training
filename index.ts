import express, { Request, Response } from "express";
import { users } from "./mock";
import crypto from "crypto";
import { paramsType, userType } from "./models";

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

app.get("/users/:id", (req: Request<paramsType>, res: Response) => {
  //получаем id пользователя из параметров запроса
  const { id } = req.params;

  //проверяем есть ли пользователь с таким id
  const user = users.find((user) => user.id === id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Пользователь не найден" });
  }
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
