import axios from "axios";

const usePublicAxios = () => {
    const instance = axios.create({
        baseURL: 'https://lifeflow-server-side.vercel.app',
      });
    return instance
};

export default usePublicAxios;