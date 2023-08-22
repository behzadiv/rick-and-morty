import axios from "axios";

const apiClient = (option) => {
  const makingUrl = (url) => {
    return import.meta.env.VITE_BASE_URL + url;
  };
  return axios({
    url: makingUrl(option.url),
    method: option.mehod,
    signal: option.signal,
  });
};

export default apiClient;
