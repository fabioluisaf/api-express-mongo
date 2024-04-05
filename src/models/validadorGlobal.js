import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (str) => str.trim() !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco`
});