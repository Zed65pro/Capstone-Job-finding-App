import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

// ADDRESS WILL CHANGE SINCE WE ARE USING NGROK TO CONNECT LOCAL HOST -
const url = "https://0dd4-37-154-152-239.eu.ngrok.io";

const apiClient = create({
  baseURL: url,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = "Bearer " + authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
