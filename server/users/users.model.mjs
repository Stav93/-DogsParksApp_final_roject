import {mongoose} from "mongoose";
// import autopopulate from "mongoose-autopopulate"

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
  password: String,
})

// UsersSchema.plugin(autopopulate)

export const User = new mongoose.model("User", UsersSchema)