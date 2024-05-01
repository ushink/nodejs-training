import { Request, Response, Router } from "express";
import crypto from "crypto";
import { users } from "../mock";
import { paramsType, userType } from "../models";
import { User } from "../models/user.model";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

router.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

router.post("/users", (req: Request<{}, {}, userType>, res: Response) => {
  User.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/users/:id", (req: Request<paramsType>, res: Response) => {
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

router.put(
  "/users/:id",
  (req: Request<paramsType, {}, userType>, res: Response) => {
    const { id: idParams } = req.params;
    const user = users.find((user) => user.id === idParams);

    const { name, isAdmin, age, experience } = req.body;

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // обновляем data user

    if (name) {
      user.name = req.body.name;
    }

    // проверяем именно на наличие isAdmin
    if ("isAdmin" in req.body) {
      user.isAdmin = req.body.isAdmin;
    }

    if (age) {
      user.age = req.body.age;
    }

    if (experience) {
      user.experience = req.body.experience;
    }

    res.status(200).json({ message: "Пользователь успешно обновлен" });
  }
);

router.delete("/users/:id", (req: Request<paramsType>, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id);

  if (!userIndex) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  users.splice(userIndex, 1);

  res.status(200).json({ message: "Пользователь успешно удален" });
});

export default router;
