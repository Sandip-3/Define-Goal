import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
    toast.success("Logout Success");
  };
  return (
    <div className="w-screen p-8 flex justify-between shadow-md bg-gray-200">
      <div className="text-2xl font-bold cursor-pointer hover:text-gray-700">
        <Link to="/">Define Goal</Link>
      </div>
      <div>
        <ul className="flex space-x-6 ">
          {user ? (
            <>
              <li className="hover:text-gray-700">
                <button onClick={handleLogout}>
                  <LogoutIcon />
                  Logout
                </button>
              </li>
              <span>
                <PersonIcon />
                {user.name}
              </span>
            </>
          ) : (
            <>
              <li className="hover:text-gray-700">
                <Link to="/login">
                  <LoginIcon />
                  Login
                </Link>
              </li>
              <li className="hover:text-gray-700">
                <Link to="/register">
                  <PersonIcon />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
