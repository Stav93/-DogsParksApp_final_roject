import logo from './logo.svg';
import './App.css';
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import UserProfile from "./components/UserProfile/UserProfile"
import MainHeader from "./components/UI/MainHeader/MainHeader"
import { useUsersContext } from "../src/Context/user-context"
import { Routes, Route } from "react-router-dom"
import DogsList from "./components/DogsList/DogsList"
import ParksList from "./components/ParksList/ParksList"

function App() {
  const usersCtx = useUsersContext();
  return (
    <div className="App main">
      <MainHeader/>
      {/* {!usersCtx.isLoggedIn && <Login/>}
      {usersCtx.isLoggedIn && <UserProfile/>} */}
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/profile/:userName" element={usersCtx.isLoggedIn ? <UserProfile/> : <Login/>}>
            <Route path="myDogs" element={<DogsList/>}></Route>
            <Route path="myParks" element={<ParksList/>}></Route>
            <Route path="allParks" element={<ParksList/>}></Route>
        </Route>
        <Route path="/sign-up" element={usersCtx.isLoggedIn ? <UserProfile/> : <SignUp/>} />
        {/* <Route path="/*" >Page Not Fount</Route> */}
      </Routes>
    </div>
   
  );
}

export default App;
