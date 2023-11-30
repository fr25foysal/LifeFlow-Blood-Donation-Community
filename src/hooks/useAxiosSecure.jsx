import axios from "axios";

const useAxiosSecure = () => {
    const instance = axios.create({
        baseURL: 'https://lifeflow-server-side.vercel.app',
      });
    return instance
};

export default useAxiosSecure;