import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  reset,
  createGoal,
  getGoals,
  deleteGoals,
} from "../features/goals/goalSlice";
import { toast } from "react-toastify";
import BackspaceIcon from "@mui/icons-material/Backspace";

function Dashboard() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { goals, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const clickHandler = () => {
    if (text) {
      dispatch(createGoal({ text })) && dispatch(getGoals());
      setText("");
      toast.success("Goal Created");
    } else {
      toast.error("Empty goal can't be created ");
    }
  };
  return (
    <div className="flex w-screen flex-col mt-12 justify-center">
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-3xl p-2 text-center">
          Welcome to Define Goal {user?.name}
        </h1>
        <h2 className="font-bold text-3xl p-2 text-gray-500 text-center">
          Start Creating Goals
        </h2>
        <div className="mt-12 flex justify-center space-x-6">
          <input
            className="shadow-md border text-center rounded-md outline-none text-2xl border-gray-200 w-1/2 p-2 "
            type="text"
            value={text}
            onChange={changeHandler}
            placeholder="Enter Your Goal"
          />
          <button
            type="submit"
            className="w-20 bg-black text-white rounded-md py-1 px-2 hover:bg-gray-700 "
            onClick={clickHandler}
          >
            Create
          </button>
        </div>
        <hr className="border shadow-lg w-screen mt-12"></hr>
      </form>

      {goals.length > 0 ? (
        goals.map((goal) => (
          <div className="mt-12  w-screen flex justify-center">
            <div className=" w-1/2 flex flex-col md:flex-row  justify-between text-center  border px-3 p-2 shadow-md">
              <h1 className="text-center text-2xl text-gray-400 md:my-0 my-2">
                {new Date(goal.createdAt).toLocaleString("en-US")}
              </h1>
              <h2 className="text-center text-3xl md:my-0 my-2">{goal.text}</h2>
              <button
                type="submit"
                onClick={() => {
                  dispatch(deleteGoals(goal._id));
                  console.log("Button Clicked");
                }}
                className="md:my-0 my-2"
              >
                <BackspaceIcon />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-4xl mt-12">Goal Not Found</h1>
      )}
    </div>
  );
}

export default Dashboard;
