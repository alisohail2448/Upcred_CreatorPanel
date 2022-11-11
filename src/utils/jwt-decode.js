const decodeJwt = (jwt) => {
  if (jwt) {
    const decoded = JSON.parse(window.atob(jwt.split(".")[1]));
    return decoded;
  }
};

export default decodeJwt;
