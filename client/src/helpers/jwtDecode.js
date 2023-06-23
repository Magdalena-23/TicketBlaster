import jwtDecode from "jwt-decode";

export const decodeJwt = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);

    const userId = decodedToken._id;
    return userId;
  }
  return null;
};
