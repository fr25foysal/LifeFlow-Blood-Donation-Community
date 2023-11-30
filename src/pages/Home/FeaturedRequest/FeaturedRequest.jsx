import { useQuery } from "@tanstack/react-query";
import usePublicAxios from '../../../hooks/usePublicAxios'
import FeaturedRequestCard from "./FeaturedRequestCard";

const FeaturedRequest = () => {
   const axiosPublic = usePublicAxios()
    const {data:{result},isLoading} = useQuery({
        queryKey: ['featured-donation-requests'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/all-donation-reqs?filter=pending&perPage=${5}`)
            return res.data
        },
        initialData: {result: []}
    })
if (isLoading) {
    return ''
}
    return (
        <div className="gap-5 py-10 grid grid-cols-5">
            {result.map((card)=><FeaturedRequestCard key={card._id} request={card}></FeaturedRequestCard>)}
        </div>
    );
};

export default FeaturedRequest;