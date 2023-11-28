import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import LoadingLotie from "../../../components/Lotties/LoadingLotie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../../components/Button/Button";

const DonorThreeRequest = () => {
    const {data:user} = useUser()
    // console.log(user);
    const axiosSecure = useAxiosSecure()
    const {data=[],isLoading,refetch} = useQuery({
        queryKey: ['dashboard-requests'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/dashboard-donation-reqs?email=${user?.email}`)
            return res.data
        }
    })
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
      <div className="overflow-x-auto bg-accent rounded-lg p-10 text-white m-10">
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

            {data?.map(item=>
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
        <Link to={''}><Button text={'View All'}></Button></Link>
         
      </div>
    );
};

export default DonorThreeRequest;