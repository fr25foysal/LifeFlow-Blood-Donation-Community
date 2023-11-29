import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import LoadingLotie from "../../../components/Lotties/LoadingLotie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { useState } from "react";

const MyRequest = () => {
    const {data:user} = useUser()
    const [page,setPage] = useState(0)
   const [filter,setFilter] = useState('')
    const axiosSecure = useAxiosSecure()
    const {data:{result,dataCount},isLoading,refetch} = useQuery({
        queryKey: ['dashboard-requests',page,filter],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/all-donation-reqs?page=${page}&filter=${filter}`)
            return res.data
            
        },
        initialData: {result: [],dataCount: 0}
    })
    const postPerPage = 5
    const totalData = Math.ceil(dataCount/postPerPage)
    const pageNumbersArr = [...new Array(totalData).fill(0)]
    const handlePrev = ()=>{
      if (!page==0) {
        setPage(page-1)
      }
    }
    const handleNext = ()=>{
     if (!page== pageNumbersArr.length-1) {
      setPage(page+1)
     }
        
    }
    const handleFilter= (e)=>{
      setFilter(e.target.value);

    }
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
    return (
      <>
      <PageTitle title={'Donation Requests'}></PageTitle>
      <div className="overflow-x-auto bg-accent rounded-lg p-10 text-white m-10">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-medium">Filter: </h2>
        <select onChange={handleFilter} className="select focus:outline-none border-none bg-secondary text-white">
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="“inprogress”">In Progress</option>
          <option value="“done”">Done</option>
          <option value="canceled">Canceled</option>
        </select>
        </div>
        
        <table className="table mb-5">
          
          {/* head */}
          <thead>
            <tr>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {result?.map(item=>
                <tr key={item._id}>
              
                <td>
                  <div className="flex items-center gap-3">
                   
                    <div>
                      <div className="font-bold">{item.recipientName}</div>
                      <div className="text-sm opacity-70"> {item.hospitalName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.recipientUpazila} , {item.recipientDistrict}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item.detailAddress}
                  </span>
                </td>
                <td>{item.donationDate}</td>
                <td>{item.donationTime}</td>
                <td className="capitalize">{item.status}</td>
                <th className="flex gap-2">
                  <Link to={`/dashboard/edit-request/${item._id}`} className="btn text-lg btn-secondary text-white btn-xs"><BiSolidEdit/></Link>
                  <Link to={`/dashboard/details-request/${item._id}`} className="btn text-lg btn-secondary text-white btn-xs"><FaRegEye /></Link>
                  <button onClick={()=>handleDelete(item._id)} className="btn text-lg btn-secondary text-white btn-xs"><MdDelete /></button>
                  
                </th>
              </tr>
            )}
           
          </tbody>
        
          
        </table>
        <div className="flex gap-5 justify-center">
          <button onClick={handlePrev} className="btn btn-sm">Prev</button>
          <div>
              {
                pageNumbersArr.map((pageNumber,index)=><button onClick={()=>setPage(index)} className={`btn btn-sm rounded-full mx-2 ${page==index? 'btn-secondary': ""} `} key={index}>{index+1}</button>)
              }
          </div>
          <button onClick={handleNext} className="btn btn-sm">Next</button>
        </div>
         
      </div></>
    );
};

export default MyRequest;