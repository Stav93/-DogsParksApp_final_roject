import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import { UsersContextProvider } from "./Context/user-context";
import { DogsContextProvider } from "./Context/dogs-context";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <UsersContextProvider>
          <DogsContextProvider>
            <App />
          </DogsContextProvider>
        </UsersContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
