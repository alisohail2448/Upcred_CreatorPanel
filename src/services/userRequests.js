import axios from "axios";
import useStorage from "src/hooks/useStorage";
import { MAIN_URL } from "./apiConfig";

//GET USERS DETAILS
export const getUser = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    let res = await axios.get(`${MAIN_URL}/admin/${id}/get_admin`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET All USERS
export const getAllUser = async ( params) => {
  const { token } = useStorage();
  try {
    let res = await axios.get(`${MAIN_URL}/admin/get_all_admins/`, {
      params: params,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE USER DETAILS
export const updateUser = async (id, data) => {
  const { token } = useStorage();
  if (!id || !data || !token) {
    return;
  }
  try {
    const res = await axios.put(`${MAIN_URL}/admin/${id}/update_admin/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//UPDATE USER DETAILS
export const addUser = async (data) => {
  const { token } = useStorage();
  try {
    const res = await axios.post(`${MAIN_URL}/admin/create_admin/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//DELETE USER
export const deleteUser = async (id) => {
  const { token } = useStorage();
  if (!id || !token) {
    return;
  }
  try {
    const res = await axios.delete(`${MAIN_URL}/admin/${id}/delete_admin/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//RESET USER PASSWORD
export const resetUserPassword = async (id, data) => {
  const { token } = useStorage();
  try {
    const res = await axios.post(`${MAIN_URL}/admin/${id}/reset_password/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
