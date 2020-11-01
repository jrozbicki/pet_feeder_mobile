import axios from "axios";
import Constants from 'expo-constants';

const axiosClient = axios.create({
  baseURL: Constants.manifest.extra.API_URL,
});

export const feed = () => {
  return axiosClient({
    method: "GET",
    url: "/feed",
  });
};

export const refill = () => {
  return axiosClient({
    method: "GET",
    url: "/refill",
  });
};
