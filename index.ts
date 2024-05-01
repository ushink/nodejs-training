import express, { Request, Response } from "express";

// const express = require('express')

const app = express();

const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("server is running");
});
