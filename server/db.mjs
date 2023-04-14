import {mongoose} from 'mongoose'

// using heroku - const db = process.env.DB || "mongodb://127.0.0.1:27017/dogParksAppDB"

const db = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.pu0gb.mongodb.net/test` || "mongodb://127.0.0.1:27017/dogParksAppDB"

mongoose.connect(db);





