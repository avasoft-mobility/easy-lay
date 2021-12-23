import axios from 'axios';
import ENV from '../models/env';
import Config from '../configs/config.json';
import {
  getAccessToken as getToken,
  setAccessToken as setToken,
  getEnv,
} from './credentialManager';

// This class acts as a wrapper for axios http client
class HttpClient {
  static Get = async (URL) => axios.get(URL).catch(this.handleError);

  static Post = async (URL, Body) => axios.post(URL, Body).catch(this.handleError);

  // handle the http error globally
  handleError = (error) => console.log(error.message);
}

const getBaseURL = () => {
  const currentEnv = getEnv();

  let baseURL = '';
  switch (currentEnv) {
    case ENV.dev:
      baseURL = Config.BASE_URLS.DEV;
      break;

    case ENV.qa:
      baseURL = Config.BASE_URLS.QA;
      break;

    case ENV.uat:
      baseURL = Config.BASE_URLS.UAT;
      break;

    case ENV.learning:
      baseURL = Config.BASE_URLS.LEARNING;
      break;

    case ENV.prod:
      baseURL = Config.BASE_URLS.PROD;
      break;
    default:
      baseURL = Config.BASE_URLS.DEV;
      break;
  }

  return baseURL;
};

const RequestAccessToken = async () => {
  const httpClient = axios.create({
    baseURL: getBaseURL(),
  });

  return httpClient.get(Config.ROUTES.ACCESS_TOKEN, {
    headers: {
      API_SERVICE_KEY: process.env.REACT_APP_DEV_API_SERVICE_KEY,
      JWT_TOKEN_KEY: process.env.REACT_APP_DEV_JWT_TOKEN_KEY,
    },
  });
};

const getAccessToken = async () => {
  try {
    const accessToken = getToken();

    if (
      accessToken !== null &&
      accessToken.expireTime !== '' &&
      Date.parse(accessToken.expireTime) > Date.now()
    ) {
      return accessToken.token;
    }

    const newAccessToken = await RequestAccessToken();
    if (newAccessToken.status !== 200) {
      return '';
    }

    const currentDate = new Date(Date.now());
    currentDate.setSeconds(currentDate.getSeconds() + newAccessToken.data.expiresIn);

    const parsedData = {
      token: newAccessToken.data.accessToken,
      expireTime: currentDate.toString(),
    };
    setToken(parsedData);
    return parsedData.token;
  } catch (e) {
    console.log(e.message);
    return '';
  }
};

axios.interceptors.request.use(async (config) => {
  const baseURL = getBaseURL();

  // Attach base url with route
  config.url = baseURL + config.url;

  // Attach auth token
  const token = await getAccessToken();
  config.headers = {
    Authorization: `Bearer ${token}`,
    API_SERVICE_KEY: process.env.REACT_APP_DEV_API_SERVICE_KEY,
    JWT_TOKEN_KEY: process.env.REACT_APP_DEV_JWT_TOKEN_KEY,
  };
  return config;
});

export default HttpClient;
export { getBaseURL };
