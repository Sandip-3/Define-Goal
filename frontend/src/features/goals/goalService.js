import axios from "axios";

const API_LINK = "/api/goals/";

const createGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_LINK, goal, config);
  return response.data;
};

const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_LINK, config);

  return response.data;
};

const deleteGoals = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_LINK + goalId, config);

  return response.data;
};

const goalServices = {
  createGoal,
  getGoals,
  deleteGoals,
};

export default goalServices;
