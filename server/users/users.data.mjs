import { getDB } from "../db.mjs"
import { ObjectID } from "bson";

async function getUsersColletion() {
    const db = await getDB();
    return db.collection("users"); 
  }

export async function getAllUsers() {
    const usersColection = await getUsersColletion();
    return usersColection.find({}).toArray();
}

export async function getUserById(id) {
    const usersColection = await getUsersColletion();
    return usersColection.findOne({_id: ObjectID(id)})
}

export async function getUserByNameAndEmail(email, password) {
    const usersColection = await getUsersColletion();
    const user = usersColection.findOne({email, password})
    return user;
}

export async function addUser(newUser) {
    const usersColection = await getUsersColletion();
    const user = usersColection.insertOne(newUser);
    return newUser;
}
// export async function addUser(newUser) {
//     const usersColection = await getUsersColletion();
//     const user = usersColection.insertOne(newUser);
//     return user;
// }

export async function removeUser(id) {
    const usersColection = await getUsersColletion();
    return usersColection.deleteOne({_id: ObjectID(id)});
}

export async function editUser(id, user) {
    const usersColection = await getUsersColletion();
  return usersColection.updateOne({_id: ObjectID(id)} , { $set: user })
}