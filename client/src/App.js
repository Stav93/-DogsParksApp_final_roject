import logo from './logo.svg';
import './App.css';
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import UserProfile from "./components/UserProfile/UserProfile"
import MainHeader from "./components/UI/MainHeader/MainHeader"
import { useUsersContext } from "../src/Context/user-context"
import { Routes, Route, Outlet } from "react-router-dom"
import DogsList from "./components/DogsList/DogsList"
import ParksList from "./components/ParksList/ParksList"
import UserParksList from "./components/UserParksList/UserParksList"
import DogForm from "./components/DogForm/DogForm"

function App() {
  const usersCtx = useUsersContext();
  return (
    <div className="App main">
      <MainHeader/>
      {/* {!usersCtx.isLoggedIn && <Login/>}
      {usersCtx.isLoggedIn && <UserProfile/>} */}
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/profile/:userName" element={usersCtx.isLoggedIn ? <UserProfile/> : <Login/>}>
          <Route path="dogs" element={<DogsList/>}>
            <Route path="AddADog" element={<DogForm/>}></Route>
          </Route>
          <Route path="parks" element={<UserParksList/>}></Route>
        </Route>
        <Route path="parks" element={<ParksList/>}></Route>
        <Route path="/sign-up" element={usersCtx.isLoggedIn ? <UserProfile/> : <SignUp/>} />
        {/* <Route path="/*" >Page Not Fount</Route> */}
      </Routes>
    </div>
   
  );
}

export default App;
