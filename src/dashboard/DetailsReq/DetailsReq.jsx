import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../hooks/useUser";

const DetailsReq = () => {
    const paramID = useParams()
    const axiosSecure = useAxiosSecure()
    const {data: currentUser,isLoading:userLoading} = useUser()
    const {data:requestData,isLoading} = useQuery({
        queryKey: ['single-requests'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/donation-req/${paramID.id}?email=${currentUser?.email}`)
            return res.data
        }
    })
    
    if (isLoading,userLoading) {
        return ''
    }
    console.log(requestData);
    return (
        <div>
            Details {requestData._id}
        </div>
    );
};

export default DetailsReq;