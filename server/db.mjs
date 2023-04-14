import {mongoose} from 'mongoose'

// using heroku - const db = process.env.DB || "mongodb://127.0.0.1:27017/dogParksAppDB"
// const db = `mongodb+srv://admin:Stav1993@cluster0.pu0gb.mongodb.net/test`
// const db = "mongodb://127.0.0.1:27017/dogParksAppDB"
// mongoose.connect(db);


// mongoose.connect("mongodb+srv://admin:Stav1993@cluster0.pu0gb.mongodb.net/?retryWrites=true&w=majority");

export const db = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  try {
    mongoose.connect("mongodb+srv://admin:Stav1993@cluster0.pu0gb.mongodb.net/?retryWrites=true&w=majority")
    console.log("connect")
  } catch (error) {
    console.log("error: " + error)
  }
  
}







