import {Park} from "./parks.model.mjs"



export async function getAllParks() {
    return Park.find();
}

export async function getParksByUserId(userId) {
    return Park.find({ users: userId })
  }

  export async function getParkById(id) {
    return Park.findById(id);
}

export async function addUserLike(parkId, userId) {
    const park = await getParkById(parkId);
    if(!park.users) park.users = [];
    console.log("before " + park.users)
    park.users.push(userId);  
    console.log("after " + park.users)
    return park.save();
}

export async function removeUserLike(parkId, userId) {
    const park = await getParkById(parkId);
    // const userID = Park.find({ users: userId })
    // const parkLikes = park.users.filter(user => user.id !== userID)
    // const parkLikes = park.users.filter(user => user.id !== userId)
    // park.users = parkLikes;
    park.users.filter(user => user._id !== userId)
    // console.log("after " + park.users)
    // console.log("new " + parkLikes)
    // park.users.findByIdAndDelete(userID);
    //park.users.findOneAndDelete({ _id: userID });
    return park.save();
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