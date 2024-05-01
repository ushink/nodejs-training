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
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
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

  User.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.put(
  "/users/:id",
  (req: Request<paramsType, {}, userType>, res: Response) => {
    const { id: idParams } = req.params;

    User.findByIdAndUpdate(idParams, req.body)
      .then((user) => User.findById(idParams))
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
);

router.delete("/users/:id", (req: Request<paramsType>, res: Response) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Пользователь успешно удален" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

export default router;
