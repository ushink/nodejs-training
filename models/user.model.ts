import mongoose from "mongoose";

// модель какие типы данных будут отправляться в бд
const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Enter password"], // обязательное поле
  },
  email: {
    type: Number,
    required: [true, "Enter email"],
  },
});

export const User = mongoose.model("User", UserSchema);
