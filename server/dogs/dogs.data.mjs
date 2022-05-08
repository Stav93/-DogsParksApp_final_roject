import {Dog} from "./dogs.model.mjs";


export async function getAllDogs() {
  return Dog.find();
}

export async function getDogById(id) {
  return Dog.findById(id);
}

export async function addDog(newDog) {
  const dog = new Dog(newDog); 
  return dog.save();
}

export async function removeDog(id) {
  return Dog.findByIdAndDelete(id);
}

export async function editDog(id, dog) {
  return Dog.findByIdAndUpdate(id, dog, {new: true})
}

export async function getDogsByUserId(owner) {
  return Dog.find({owner});
}