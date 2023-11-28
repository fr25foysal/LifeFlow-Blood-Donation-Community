import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useProvider from "./useProvider";

const useUser = () => {
    const {user} = useProvider()
    const axiosSecure = useAxiosSecure();
    const {data,isLoading,refetch}= useQuery({
        queryKey: ['profile'],
        queryFn: async()=>{
            const res =await axiosSecure.get(`/user?email=${user?.email}`)
            return res.data
        }
    })
    return {data,isLoading,refetch}
};

export default useUser;