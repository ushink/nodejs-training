import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controllers";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller";

const router = Router();

router.get("/users", getUsers);

router.post("/users", addUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("refreshToken", refreshToken);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;
