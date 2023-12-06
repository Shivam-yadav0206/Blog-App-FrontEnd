import "./App.css";
import Login from "./components/Login";
import DataProvider from "./context/DataProvider";
import Home from "./components/Home";
import Header from "./components/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import CreatePost from "./components/CreatePost";
import DetailView from "./components/DetailView";
import UpdatePost from "./components/UpdatePost";
import About from "./components/About";
import ContactMe from "./components/ContactMe";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header setIsAuthenticated={setIsAuthenticated} />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            }>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactMe />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/viewPost/:id" element={<DetailView />} />
            <Route path="/update/:id" element={<UpdatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
