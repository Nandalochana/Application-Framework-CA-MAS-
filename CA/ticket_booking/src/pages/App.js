import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Comopnent_SignUp from "../components/SignUp";
import Comopnent_Login from "../components/Login";
import Comopnent_Error from "../components/Error";

const Login_page = () => {
  return  <Comopnent_Login/>;
};

const SignUp_Page = () => {
  return <Comopnent_SignUp/>;
};

const Error_Page = () => {
  return <Comopnent_Error/>;
};

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Error_Page /> },
    { path: "/login", element: <Login_page /> },
    { path: "/signup", element: <SignUp_Page /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;