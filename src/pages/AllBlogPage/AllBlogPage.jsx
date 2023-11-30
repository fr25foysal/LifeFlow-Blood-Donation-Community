import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageTitle from "../../components/PageTitle/PageTitle";
import BoxContainer from "../../components/BoxContainer/BoxContainer";
import BlogCard from "./BlogCard";

const AllBlogPage = () => {
    
    const axiosSecure = useAxiosSecure()
    const {data:{result},isLoading} = useQuery({
        queryKey: ['all-blogs'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/posts?filter=published`)
            return res.data
        },
        initialData: {result: []}
    })
    if (isLoading) {
        return ' '
    }
    return (
        <div className="py-10">
            <PageTitle title={'Blogs'}></PageTitle>
            <BoxContainer>
                <div className="gap-5 py-10 grid grid-cols-4">
            {result.map((card)=><BlogCard key={card._id} blog={card}></BlogCard>)}
            </div> 
            </BoxContainer>
           
        </div>
    );
};

export default AllBlogPage;