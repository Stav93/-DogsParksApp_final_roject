import { User } from "./users.model.mjs"

export async function getAllUsers() {
    return User.find();
}

export async function getUserById(id) {
    return User.findById(id);
}

// Login
export async function getUserByNameAndEmail(email, password) {
    const user = await User.where({email, password}).findOne();
    return user;
}

// SignUp
export async function addUser(newUser) {
    const user = new User(newUser); 
    return user.save();
}


export async function removeUser(id) {
    return User.findByIdAndDelete(id);
}

export async function editUser(id, user) {
    return User.findByIdAndUpdate(id, user)
}