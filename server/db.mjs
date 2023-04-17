import {mongoose} from 'mongoose'

// const db = process.env.DB || "mongodb://127.0.0.1:27017/dogParksAppDB"
const db = `mongodb+srv://admin:Stav1993@cluster0.pu0gb.mongodb.net/?retryWrites=true&w=majority` || "mongodb://127.0.0.1:27017/dogParksAppDB"

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://admin:Stav1993@cluster0.pu0gb.mongodb.net/?retryWrites=true&w=majority"
//     );
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.log("error: " + error);
//   }
// };

// export default connectDB;

mongoose.connect("mongodb://127.0.0.1:27017/dogParksAppDB");





