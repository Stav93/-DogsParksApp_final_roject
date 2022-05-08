import {mongoose} from "mongoose";
import autopopulate from "mongoose-autopopulate"

const DogsSchema = new mongoose.Schema({
  name: String,
  year_of_birth: String,
  weight: String,
  likes: String,
  dislike: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    autopopulate: true,
  },
})

DogsSchema.plugin(autopopulate)

export const Dog = new mongoose.model("Dog", DogsSchema)