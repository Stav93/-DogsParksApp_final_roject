import logo from './logo.svg';
import './App.css';
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import UserProfile from "./components/UserProfile/UserProfile"
import MainHeader from "./components/UI/MainHeader/MainHeader"
import { useUsersContext } from "../src/Context/user-context"
import { Routes, Route } from "react-router-dom"
<<<<<<< HEAD
import DogsList from "./components/DogsList/DogsList"
import ParksList from "./components/ParksList/ParksList"
=======
>>>>>>> 0b6ac4d4907d78e3a4e92aa3a00d4c11b3355104

function App() {
  const usersCtx = useUsersContext();
  return (
    <div className="App main">
      <MainHeader/>
      {/* {!usersCtx.isLoggedIn && <Login/>}
      {usersCtx.isLoggedIn && <UserProfile/>} */}
      <Routes>
        <Route path="/" element={<Login/>} />
<<<<<<< HEAD
        <Route path="/profile/:userName" element={usersCtx.isLoggedIn ? <UserProfile/> : <Login/>}>
            <Route path="myDogs" element={<DogsList/>}></Route>
            <Route path="myParks" element={<ParksList/>}></Route>
        </Route>
=======
        <Route path="/profile/:userName" element={usersCtx.isLoggedIn ? <UserProfile/> : <Login/>}/>
>>>>>>> 0b6ac4d4907d78e3a4e92aa3a00d4c11b3355104
        <Route path="/sign-up" element={usersCtx.isLoggedIn ? <UserProfile/> : <SignUp/>} />
        {/* <Route path="/*" >Page Not Fount</Route> */}
      </Routes>
    </div>
   
  );
}

export default App;
