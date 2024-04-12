import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import Comopnent_SignUp from "../components/SignUp";
import Comopnent_Login from "../components/Login";
import Comopnent_Error from "../components/Error";
import Comopnent_movies from "../components/Movies";
import Comopnent_MovieInfo from "../components/MovieInfo";
import Comopnent_History from "../components/History";
import Comopnent_Admin from "../components/admin";

const Login_page = () => {
  return  <Comopnent_Login/>;
};

const SignUp_Page = () => {
  return <Comopnent_SignUp/>;
};

const Error_Page = () => {
  return <Comopnent_Error/>;
};

const Movies_Page = () => {
  return <Comopnent_movies/>;
};

const Movie_Page = () => {
  return <Comopnent_MovieInfo/>;
};

const History_Page = () => {
  return <Comopnent_History/>;
};

const Admin_Page = () => {
  return <Comopnent_Admin/>;
};

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Login_page /> },
    { path: "/login", element: <Login_page /> },
    { path: "/signup", element: <SignUp_Page /> },
    { path: "/movies", element: <Movies_Page /> },
    { path: "/movieinfo", element: <Movie_Page /> },
    { path: "/history", element: <History_Page /> },
    { path: "/admin", element: <Admin_Page /> },
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