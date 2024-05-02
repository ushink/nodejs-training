import { Request, Response } from "express";
import { userType } from "../models";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

const registerUser = (req: Request<{}, {}, userType>, res: Response) => {
  // проверка на существование юзера с таким же email
  User.findOne({ email: req.body.email })
    .then((userOne) => {
      if (userOne) {
        throw new Error(`User ${userOne} already registered`);
      }

      return User.create(req.body);
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

const loginUser = (req: Request<{}, {}, userType>, res: Response) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((userOne) => {
      if (!userOne) {
        return res
          .status(404)
          .json({ message: "Такого пользователя не существует" });
      }
      if (userOne.password !== password) {
        return res.status(403).json({ message: "Пароли не совпадают" });
      }

      // принимает аргументы ({то что изменяет}, 'какое то сообщение', время жизни токена)
      const accessToken = jwt.sign({ email }, "jwt-access-token", {
        expiresIn: "1m",
      });

      const refreshToken = jwt.sign({ email }, "jwt-refresh-token", {
        expiresIn: "5m",
      });

      // сохраняем токен в cookie
      res.cookie("accessToken", accessToken, { maxAge: 60 * 1000 });
      res.cookie("refreshToken", refreshToken, { maxAge: 5 * 60 * 1000 });

      res.status(200).json({ accessToken, refreshToken });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

const refreshToken = (req: Request, res: Response) => {
  const { refresh } = req.body;

  if (!refresh) {
    res.status(404).json({ message: "В теле не указан токен" });
  }

  jwt.verify(refresh, "jwt-refresh-token", (error: any, user: any) => {
    if (error) {
      return res.status(403).json({ message: "Неверный токен" });
    }

    const accessToken = jwt.sign({ email: user.email }, "jwt-access-token", {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign({ email: user.email }, "jwt-refresh-token", {
      expiresIn: "5m",
    });

    res.cookie("accessToken", accessToken, { maxAge: 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { maxAge: 5 * 60 * 1000 });

    res.status(200).json({ accessToken });
  });
};

export { registerUser, loginUser, refreshToken};
