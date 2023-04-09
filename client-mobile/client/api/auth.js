import client from "./client";

const login = (email, password) => {
  return client.post("/users/login", { email, password });
}

const logout = () => {
  return client.post("/users/logout", {});
}
export default {
  login,
  logout
};
