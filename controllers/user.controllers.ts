import { Request, Response } from "express";
import { User } from "../models/user.model";
import { paramsType, userType } from "../models";

const getUsers = (_: Request, res: Response) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

const getUserById = (req: Request<paramsType>, res: Response) => {
  //получаем id пользователя из параметров запроса
  const { id } = req.params;

  User.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

const updateUser = (req: Request<paramsType, {}, userType>, res: Response) => {
  const { id: idParams } = req.params;

  User.findByIdAndUpdate(idParams, req.body)
    .then((user) => User.findById(idParams))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const addUser = (req: Request<{}, {}, userType>, res: Response) => {
  User.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

const deleteUser = (req: Request<paramsType>, res: Response) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User ID not found" });
      }
      res.status(200).json({ message: "Пользователь успешно удален" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export { getUsers, getUserById, updateUser, addUser, deleteUser };
