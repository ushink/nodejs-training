import express, { Request, Response } from "express";
import { users } from "./mock";

// const express = require('express')

const app = express();

const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.get("/users", (req: Request, res: Response) => {
    res.send(users);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
