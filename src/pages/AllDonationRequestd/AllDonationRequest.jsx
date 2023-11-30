import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../hooks/usePublicAxios";
import FeaturedRequestCard from "../Home/FeaturedRequest/FeaturedRequestCard";
import BoxContainer from "../../components/BoxContainer/BoxContainer";
import PageTitle from "../../components/PageTitle/PageTitle";

const AllDonationRequest = () => {
    const axiosPublic = usePublicAxios()
    const {data:{result},isLoading} = useQuery({
        queryKey: ['all-donation-requests'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/all-donation-reqs?filter=pending&perPage=${0}`)
            return res.data
        },
        initialData: {result: []}
    })
if (isLoading) {
    return ''
}
    return (
        <div className="py-10">
            <PageTitle title={'All Requests'}></PageTitle>
            <BoxContainer>
                <div className="gap-5 py-10 grid grid-cols-4">
            {result.map((card)=><FeaturedRequestCard key={card._id} request={card}></FeaturedRequestCard>)}
            </div> 
            </BoxContainer>
           
        </div>
    );
};

export default AllDonationRequest;