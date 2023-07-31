import Axios from "axios";
import { getSession, useSession } from "next-auth/react";

const axiosASD = Axios.create({
  baseURL: "http://localhost:5000",
});

axiosASD.interceptors.request.use( async (config: any) => {
  const session = await getSession();

  const accessToken = session?.accessToken;

  console.log("accessToken axios: ", accessToken);

  if (accessToken) {
    if (!config.headers) config.headers = {};
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosASD;