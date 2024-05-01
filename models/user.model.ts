import mongoose from "mongoose";

// модель какие типы данных будут отправляться в бд 
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter username"], // обязательное поле
  },
  age: {
    type: Number,
    required: [true, "Enter age"],
  },
  isAdmin: {
    type: Boolean,
    required: [true, "Enter role"],
  },
  experience: {
    type: Number,
    required: [true, "Enter experience"],
  },
});

export const User = mongoose.model("User", UserSchema);
