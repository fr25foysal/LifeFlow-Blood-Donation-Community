import axios from "axios";

const usePublicAxios = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
      });
    return instance
};

export default usePublicAxios;