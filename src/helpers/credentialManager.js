import { ACCESS_TOKEN_KEY, ENV_KEY } from "./constants";

const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  return accessToken !== null ? JSON.parse(accessToken) : null;
}

const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
}

const getEnv = () => localStorage.getItem(ENV_KEY);

const setEnv = (env) => {
  localStorage.setItem(ENV_KEY, env);
}

export { getAccessToken, setAccessToken, getEnv, setEnv };
