import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, register } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, user, message } = useSelector(
    (state) => state.auth
  );

  const { name, email, password, rePassword } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/login");
    }
    // dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      toast.error("Password don't match");
    } else if (password === rePassword) {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
      toast.success("Register Success");
    } else {
      toast.error("Register Error");
    }
    return () => {
      dispatch(reset());
    };
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="w-screen flex justify-center mt-12 ">
        <div className="flex w-1/2 item-center  jsutify-center flex-col space-y-6">
          <h2 className="text-4xl text-center font-bold">Register Form</h2>
          <input
            className="p-2 w-full shadow-md border outline-none"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="p-2 w-full shadow-md border outline-none"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            className="p-2 w-full shadow-md border outline-none"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            className="p-2 w-full shadow-md border outline-none"
            type="password"
            name="rePassword"
            placeholder="Enter Re-Password"
            onChange={handleChange}
            value={formData.rePassword}
          />
          <button className="w-full bg-black text-center text-white text-3xl  py-2 hover:bg-gray-800">
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

export default Register;
