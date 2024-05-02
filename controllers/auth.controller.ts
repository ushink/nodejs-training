import { Request, Response } from "express";
import { userType } from "../models";
import { User } from "../models/user.model";

const registerUser = (req: Request<{}, {}, userType>, res: Response) => {
  // проверка на существование юзера с таким же email
  User.findOne({ email: req.body.email }).then((user) => {
    return res.status(403).json({ message: "User already registered" });
  });

  User.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

export { registerUser };
