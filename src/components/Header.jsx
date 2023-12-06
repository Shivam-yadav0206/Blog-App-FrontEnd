import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuIcon, setMenuIcon] = useState("menu");

  useEffect(() => {onToggleMenu()}, [location.pathname]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  function onToggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    setMenuIcon((prevIcon) => (prevIcon === "menu" ? "close" : "menu"));
    navLinks.classList.toggle("top-[9%]");
  }

  return (
    <header className="bg-white m-3">
      <nav className="flex justify-between items-center w-[92%] mx-auto mb-2">
        <div>
          <img
            className="w-16 cursor-pointer"
            src="https://i.pinimg.com/originals/5e/b9/24/5eb924aee830d769dff1ad0997a99d25.gif"
            alt="..."
          />
        </div>
        <div className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link to="/" className="hover:text-primary-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-primary-700">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary-700">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary-700">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center lg:order-2">
            <button
              onClick={() => handleLogout()}
              className="flex items-center text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-2 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              <img
                src="https://cdn-icons-png.flaticon.com/512/320/320140.png"
                alt="Logout Icon"
                className="h-5 w-5 mr-2" // Adjust the size and margin as needed
              />
              LogOut
            </button>
          </div>
          <div className="flex items-center gap-6  md:hidden">
            <ion-icon
              className="text-3xl cursor-pointer"
              onClick={() => onToggleMenu()}
              name={menuIcon}></ion-icon>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
