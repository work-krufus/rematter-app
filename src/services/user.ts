import axios from "axios";
import { UpdateUser } from "types/update-user";

export const createAUser = async (idCardPicture: string) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URI}/users`, {
    idCardPicture,
  });

  if (!response) {
    return { message: "Error occurred" };
  }

  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URI}/users`);

  if (!response) {
    return { message: "Error occurred" };
  }

  return response.data;
};

export const getAUser = async (id: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URI}/users/${id}`
  );

  if (!response) {
    return { message: "Error occurred" };
  }

  return response.data;
};

export const updateAUser = async (id: number, user: UpdateUser) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_API_URI}/users/${id}`,
    { ...user }
  );

  if (!response) {
    return { message: "Error occurred" };
  }

  return response.data;
};

export const deleteAuser = async (id: number) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URI}/users/${id}`
  );

  if (!response) {
    return { message: "Error occurred" };
  }

  return response.data;
};
