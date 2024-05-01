import { Request, Response, Router } from "express";
import crypto from "crypto";
import { users } from "../mock";
import { paramsType, userType } from "../models";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

router.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

router.post("/users", (req: Request<{}, {}, userType>, res: Response) => {
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