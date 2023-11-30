import axios from "axios";
import useProvider from "./useProvider";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
        baseURL: 'https://lifeflow-server-side.vercel.app',
      });

const useAxiosSecure = () => {
    
 const {logOut} = useProvider()
  const navigate = useNavigate()
  instance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`
   
    return config
  },(error)=>{
    return Promise.reject(error);
  })

  instance.interceptors.response.use((response)=>{
    return response
  },async(error)=>{
    const status = error.response.status
    if (status=== 401 ) {
      await logOut()
      navigate('/login')
    }else if (status === 403) {
      await logOut()
      navigate('/login')
    }
    return Promise.reject(error)
  })

    return instance
};

export default useAxiosSecure;