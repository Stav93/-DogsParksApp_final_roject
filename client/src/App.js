import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserProfile from "./components/UserProfile/UserProfile";
import MainHeader from "./components/UI/MainHeader/MainHeader";
import DogsList from "./components/DogsList/DogsList";
import ParksList from "./components/ParksList/ParksList";
import UserParksList from "./components/UserParksList/UserParksList";
import DogForm from "./components/DogForm/DogForm";
import { useUsersContext } from "./Context/user-context";
import './App.css';

// function PageNotFound() {
//   return <h1>Page Not Found</h1>
// }

function App() {
  const usersCtx = useUsersContext();
  const userLogged = useSelector((state) => state.user.isLoggedIn)
  return (
    <div className="App main">
      <MainHeader />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userName" element={userLogged ? <UserProfile /> : <Login />}>
          <Route path="dogs" element={<DogsList />}>
            <Route path="AddADog" element={<DogForm />}></Route>
          </Route>
          <Route path="parks" element={<UserParksList />}></Route>
        </Route>
        <Route path="parks" element={<ParksList />}></Route>
        <Route path="/sign-up" element={usersCtx.isLoggedIn ? <UserProfile /> : <SignUp />} />
        {/* <Route path="*" element={<PageNotFound />} ></Route> */}
      </Routes>
    </div>

  );
}

export default App;
