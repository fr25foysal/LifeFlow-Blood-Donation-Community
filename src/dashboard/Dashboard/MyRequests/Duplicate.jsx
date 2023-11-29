import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import LoadingLotie from "../../../components/Lotties/LoadingLotie";

const MyRequests = () => {
    const {data:user} = useUser()
    const axiosSecure = useAxiosSecure()
    const {data=[],isLoading,refetch} = useQuery({
        queryKey: ['dashboard-requests'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/donation-reqs?email=${user?.email}`)
            return res.data
        }
    })
    console.log(data);
    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d90429",
            cancelButtonColor: "#2b2d42",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-request/${id}`)
        .then((d)=>{
            console.log(d.data)
            if (d.data.deletedCount>0) {
                refetch()
                 Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
           
        })   
            }
          });
        
    }
    if (isLoading) {
       return <LoadingLotie/>
    }
    if (data.length<1) {
        return
    }
    return (
        <div>
            
        </div>
    );
};

export default MyRequests;