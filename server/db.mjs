import {mongoose} from 'mongoose'

const db = process.env.DB || "mongodb://127.0.0.1:27017/dogParksAppDB"

mongoose.connect(db);





