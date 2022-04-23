import { getDB } from "../db.mjs"
import { ObjectID } from "bson";

async function getDogsColletion() {
    const db = await getDB();
    return db.collection("dogs"); 
  }

export async function getAllDogs() {
    const dogsColection = await getDogsColletion();
    return dogsColection.find({}).toArray();
}

export async function getDogById(id) {
    const dogsColection = await getDogsColletion();
    return dogsColection.findOne({_id: ObjectID(id)})
}

export async function addDog(newDog) {
    const dogsColection = await getDogsColletion();
    return dogsColection.insertOne(newDog);
}

export async function removeDog(id) {
    const dogsColection = await getDogsColletion();
    return dogsColection.deleteOne({_id: ObjectID(id)});
}

export async function editDog(id, dog) {
  const dogsColection = await getDogsColletion();
  console.log(id, dog)
  return dogsColection.updateOne({_id: ObjectID(id)} , { $set: dog })
}

export async function getDogsByUserId(userId) {
  const dogsColection = await getDogsColletion();
  return dogsColection.find({
    userId
  }).toArray();
}