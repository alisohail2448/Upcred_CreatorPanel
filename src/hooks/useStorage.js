import { getCookie, setCookies, removeCookies } from "cookies-next";
const EXPIRY_TIME = 86400;
const useStorage = () => {
  const token = getCookie("token");
  const user_id = getCookie("user_id");
  const role = getCookie("role");
  const email = getCookie("email");

  const setToken = (token, exp) => {
    setCookies("token", token);
  };

  const setUserId = (id) => {
    setCookies("user_id", id);
  };
  const setRole = (r) => {
    setCookies("role", r);
  };

  const setEmail = (email) => {
    setCookies("email", email);
  };

  const removeToken = () => {
    removeCookies("token");
  };

  const clearAll = () => {
    removeCookies("token");
    removeCookies("email");
    removeCookies("user_id");
    removeCookies("role");
  };

  return {
    token,
    user_id,
    setUserId,
    email,
    setEmail,
    setToken,
    removeToken,
    role,
    setRole,
    clearAll,
  };
};

export default useStorage;
