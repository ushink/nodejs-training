import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controllers";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();

router.get("/users", getUsers);

router.post("/users", addUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;
