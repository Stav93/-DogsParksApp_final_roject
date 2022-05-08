import {Park} from "./parks.model.mjs"



export async function getAllParks() {
    return Park.find();
}

export async function getParksByUserId(owner) {
    return Park.find({ users: owner })
  }

  export async function addUserLike(parkId, userId) {
      const park = await getParkById(parkId);
      if(!park.users) park.users = [];
      park.users.push(userId);
      return park.save();
  }


export async function getParkById(id) {
    return Park.findById(id);
}


export async function addPark(newPark) {
    const park = new Park(newPark); 
    return park.save();
}

export async function removePark(id) {
    return Park.findByIdAndDelete(id);
}

export async function editPark(id, park) {
    return User.findByIdAndUpdate(id, park)
}