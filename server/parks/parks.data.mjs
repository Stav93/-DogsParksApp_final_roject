import { getDB } from "../db.mjs"
import { ObjectID } from "bson";

async function getParksColletion() {
    const db = await getDB();
    return db.collection("parks"); 
  }

export async function getAllParks() {
    const parksColection = await getParksColletion();
    return parksColection.find({}).toArray();
}

export async function getParkById(id) {
    const parksColection = await getParksColletion();
    return parksColection.findOne({_id: ObjectID(id)})
}

export async function getParksByUserId(userId) {
    const parksColection = await getParksColletion();
    return parksColection.find({
      userId
    }).toArray();   
  }

export async function addPark(newPark) {
    const parksColection = await getParksColletion();
    return parksColection.insertOne(newPark);
}

export async function removePark(id) {
    const parksColection = await getParksColletion();
    return parksColection.deleteOne({_id: ObjectID(id)});
}

export async function editPark(id, park) {
    const parksColection = await getParksColletion();
  return parksColection.updateOne({_id: ObjectID(id)} , { $set: park })
}