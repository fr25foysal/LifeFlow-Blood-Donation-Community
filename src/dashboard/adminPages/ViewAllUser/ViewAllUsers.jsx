import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdAdminPanelSettings, MdVolunteerActivism } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import LoadingLotie from "../../../components/Lotties/LoadingLotie";
import { ImBlocked } from "react-icons/im";
import Swal from "sweetalert2";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { useState } from "react";
import { FaHandsHelping } from "react-icons/fa";

const ViewAllUsers = () => {
    const {data:user} = useUser()
    const [page,setPage] = useState(0)
   const [filter,setFilter] = useState('')
    const axiosSecure = useAxiosSecure()
    const {data:{result,dataCount},isLoading,refetch} = useQuery({
        queryKey: ['dashboard-requests',page,filter],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users?email=${user?.email}&page=${page}&filter=${filter}`)
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
        <PageTitle title={"All Users"}></PageTitle>
        <div className="overflow-x-auto bg-accent rounded-lg p-10 text-white m-10">
          <div className="flex items-center gap-5">
            <h2 className="text-xl font-medium">Filter: </h2>
            <select
              onChange={handleFilter}
              className="select focus:outline-none border-none bg-secondary text-white"
            >
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
              <tr className="text-base">
                <th>Image</th>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
                <th>Status Action</th>
                <th>Role</th>
                <th>Role Action</th>
              </tr>
            </thead>
            <tbody>
              {result?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="avatar bg-secondary rounded-2xl">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="User Avater" />
                      </div>
                    </div>
                  </td>

                  <td>
                    <h2 className="font-semibold">{item.email}</h2>
                  </td>

                  <td className="font-semibold">
                    {item.name}
                    <br />
                    <span className="badge font-normal badge-ghost badge-sm">
                      {item.division} , {item.district}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold capitalize">{item.status}</div>
                        <div className="text-sm opacity-70"> {item.blood}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        {user?.status == 'active' ? 'Block' : "Active" }
                      <ImBlocked />
                    </button>
                   
                  </td>

                  <td className="capitalize font-semibold">{item.role}</td>

                  <th className="flex gap-2">
                    {
                        item?.role === 'admin' ?
                        <div className="flex flex-col gap-y-2"><button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Volunteer
                      <FaHandsHelping />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Donor
                      <MdVolunteerActivism  />
                    </button></div> : ''
                    }
                    {
                        item?.role === 'donor' ?
                        <div className="flex flex-col gap-y-2"><button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Admin
                      <MdAdminPanelSettings  />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Volunteer
                      <FaHandsHelping  />
                    </button></div> : ''
                    }
                    {
                        item?.role === 'volunteer' ?
                        <div className="flex flex-col gap-y-2"><button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Admin
                      <MdAdminPanelSettings  />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Donor
                      <MdVolunteerActivism  />
                    </button></div> : ''
                    }
                  
                   
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-5 justify-center">
            <button onClick={handlePrev} className="btn btn-sm">
              Prev
            </button>
            <div>
              {pageNumbersArr.map((pageNumber, index) => (
                <button
                  onClick={() => setPage(index)}
                  className={`btn btn-sm rounded-full mx-2 ${
                    page == index ? "btn-secondary" : ""
                  } `}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button onClick={handleNext} className="btn btn-sm">
              Next
            </button>
          </div>
        </div>
      </>
    );
};

export default ViewAllUsers;