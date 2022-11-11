import axios from "axios";
import { useRouter } from "next/router";
import useStorage from "src/hooks/useStorage";
import jwtDecode from "src/utils/jwt-decode";
import { MAIN_URL } from "./apiConfig";
//CREATOR LOGIN
// console.log("");
export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${MAIN_URL}/creator/login_creator/`, {
      email,
      password,
    });
    const { setToken, setUserId, setEmail, setRole } = useStorage();

    const authData = jwtDecode(res.data?.response_data?.token);
    const tokenExp = authData?.exp;
    const userRole = authData?.role;

    setToken(res.data.response_data.token, new Date(tokenExp));
    setRole(userRole);

    setUserId(res.data.response_data.creator_id);
    setEmail(res.data.response_data.email);

    return res.data.response_data;
  } catch (error) {
    throw error;
  }
};

export const signup = async ({ handle, name, email, password }) => {
  try {
    const res = await axios.post(`${MAIN_URL}/creator/create_creator/`, {
      handle,
      name,
      email,
      password,
    });
    const { setToken, setUserId, setEmail, setRole } = useStorage();

    const authData = jwtDecode(res.data?.response_data?.token);
    const tokenExp = authData?.exp;
    const userRole = authData?.role;

    setToken(res.data.response_data.token, new Date(tokenExp));
    setRole(userRole);

    setUserId(res.data.response_data.creator_id);
    setEmail(res.data.response_data.email);

    return res.data.response_data;
  } catch (error) {
    throw error;
  }
};

//GET CREATOR DETAILS
export const getCreator = async () => {
  const { token, user_id } = useStorage();
  if (!user_id) {
    throw {
      response: {
        status: 500,
      },
    };
  }
  try {
    let res = await axios.get(`${MAIN_URL}/creator/${user_id}/get_creator`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.response_data;
  } catch (error) {
    throw error;
  }
};

//CREATOR LOGOUT
export const logout = async () => {
  const { clearAll } = useStorage();

  try {
    // await axios.get(`/api/auth/logout`);
    clearAll();
  } catch (error) {}
};

//UPDATE CREATOR DETAILS
export const updateCreator = async (data) => {
  const { token, user_id } = useStorage();
  if (!token) {
    throw "No Token";
  }
  if (!user_id) {
    throw "No User Id";
  }
  try {
    const res = await axios.put(`${MAIN_URL}/creator/${user_id}/update_creator/`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//DELETE CREATOR SOCIAL PLATFORM
export const deleteCreatorPlatform = async (creatorId, platformId) => {
  const { token } = useStorage();
  if (!token || !creatorId || !platformId) {
    throw "no data";
  }
  try {
    let res = await axios.delete(
      `${MAIN_URL}/creator/social_platform/${creatorId}/${platformId}/delete_creator_social_platform/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//CREATOR LOGIN WITH GOOGLE
export const loginWithGoogle = async (data) => {
  try {
    const res = await axios.post(`${MAIN_URL}/creator/login_creator_with_google/`, data);
    const { setToken, setUserId, setEmail, setRole } = useStorage();

    const authData = jwtDecode(res.data?.response_data?.token);
    const tokenExp = authData?.exp;
    const userRole = authData?.role;

    setToken(res.data.response_data.token, new Date(tokenExp));
    setRole(userRole);

    setUserId(res.data.response_data.creator_id);
    setEmail(res.data.response_data.email);

    return res.data;
  } catch (error) {
    throw error;
  }
};

//CREATOR SIGNUP WITH GOOGLE
export const signupWithGoogle = async (data) => {
  try {
    const res = await axios.post(`${MAIN_URL}/creator/signup_creator_with_google/`, data);
    const { setToken, setUserId, setEmail, setRole } = useStorage();

    const authData = jwtDecode(res.data?.response_data?.token);
    const tokenExp = authData?.exp;
    const userRole = authData?.role;

    setToken(res.data.response_data.token, new Date(tokenExp));
    setRole(userRole);

    setUserId(res.data.response_data.creator_id);
    setEmail(res.data.response_data.email);

    return res.data;
  } catch (error) {
    throw error;
  }
};