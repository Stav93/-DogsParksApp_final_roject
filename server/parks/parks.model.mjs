import {mongoose} from "mongoose";
import autopopulate from "mongoose-autopopulate"

const ParksSchema = new mongoose.Schema({
  name: String,
  city: String,
  street: String,
  dislike: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    autopopulate: true,
    unique: true,
  }],
})

ParksSchema.plugin(autopopulate)

export const Park = new mongoose.model("Park", ParksSchema)