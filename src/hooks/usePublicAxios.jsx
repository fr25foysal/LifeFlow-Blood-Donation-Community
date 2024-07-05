import axios from "axios";

const usePublicAxios = () => {
    const instance = axios.create({
      // Production version
        // baseURL: 'https://lifeflow-server-side.vercel.app',

        // Development version
        baseURL: 'http://localhost:5000',
      });
    return instance
};

export default usePublicAxios;