import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, user, message } = useSelector(
    (state) => state.auth
  );
  const submitHandler = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
    toast.success("Login Success");
    return () => {
      dispatch(reset());
    };
  };

  const handleChange = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <form onSubmit={submitHandler}>
      <div className="w-screen flex justify-center mt-12 ">
        <div className="flex w-1/2 item-center  jsutify-center flex-col space-y-6">
          <h2 className="text-4xl text-center font-bold">Login Form</h2>
          <input
            className="p-2 w-full shadow-md border outline-none"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="p-2 w-full shadow-md border outline-none"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="w-full bg-black text-center text-white text-3xl  py-2 hover:bg-gray-800">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
