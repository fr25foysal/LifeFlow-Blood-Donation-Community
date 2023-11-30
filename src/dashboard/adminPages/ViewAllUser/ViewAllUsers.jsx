import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdAdminPanelSettings, MdNotificationsActive, MdVolunteerActivism } from "react-icons/md";
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
            const res = await axiosSecure.get(`/users?admin=${user.email}&page=${page}&filter=${filter}`)
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

    const handleChangeActive=(email)=>{
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d90429",
        cancelButtonColor: "#2b2d42",
        confirmButtonText: "Yes, Do it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/user?email=${email}`,{status: 'blocked'})
          .then((d)=>{
              console.log(d.data)
              refetch()
              Swal.fire({
             title: "Blocked!",
             text: "User has been blocked.",
             icon: "success"
           });
    })   
        }
      });
    }
    const handleChangeBlocked=(email)=>{
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d90429",
        cancelButtonColor: "#2b2d42",
        confirmButtonText: "Yes, Do it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/user?email=${email}`,{status: 'active'})
          .then((d)=>{
              console.log(d.data)
              refetch()
              Swal.fire({
             title: "Activated!",
             text: "User has been Activated.",
             icon: "success"
           });
    })   
        }
      });
    }
    const handleMakeAdmin=(email)=>{
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d90429",
        cancelButtonColor: "#2b2d42",
        confirmButtonText: "Yes, Do it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/user?email=${email}`,{role: 'admin'})
          .then((d)=>{
              console.log(d.data)
              refetch()
              Swal.fire({
             title: "Done!",
             text: "This user is Admin now.",
             icon: "success"
           });
    })   
        }
      });
    }
    const handleMakeVlolunteer=(email)=>{
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d90429",
        cancelButtonColor: "#2b2d42",
        confirmButtonText: "Yes, Do it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/user?email=${email}`,{role: 'volunteer'})
          .then((d)=>{
              console.log(d.data)
              refetch()
              Swal.fire({
             title: "Done!",
             text: "This user is Volunteer now.",
             icon: "success"
           });
    })   
        }
      });
    }
    const handleMakeDonor=(email)=>{
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d90429",
        cancelButtonColor: "#2b2d42",
        confirmButtonText: "Yes, Do it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/user?email=${email}`,{role: 'doner'})
          .then((d)=>{
              console.log(d.data)
              refetch()
              Swal.fire({
             title: "Done!",
             text: "This user is Donor now.",
             icon: "success"
           });
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
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
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
                      {item.district} , {item.upazila}
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
                    {item?.status === 'active' ?
                    <button disabled={item.email ==user.email}
                    onClick={() => handleChangeActive(item.email)}
                    className="btn btn-secondary text-white btn-xs"
                  > Block
                    <ImBlocked />
                  </button> 
                  :
                   <button disabled={item.email ==user.email}
                    onClick={() => handleChangeBlocked(item.email)}
                    className="btn btn-secondary text-white btn-xs"
                  > Active
                    <MdNotificationsActive />
                  </button>
                     }

                  </td>

                  <td className="capitalize font-semibold">{item.role}</td>

                  <th className="flex gap-2">
                    {
                        item?.role === 'admin' ?
                        <div className="flex flex-col gap-y-2"><button disabled={item.email ==user.email}
                      onClick={() => handleMakeVlolunteer(item.email)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Volunteer
                      <FaHandsHelping />
                    </button>
                    <button disabled={item.email ==user.email}
                      onClick={() => handleMakeDonor(item.email)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Donor
                      <MdVolunteerActivism  />
                    </button></div> : ''
                    }
                    {
                        item?.role === 'donor' ?
                        <div className="flex flex-col gap-y-2"><button disabled={item.email ==user.email}
                      onClick={() => handleMakeAdmin(item.email)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Admin
                      <MdAdminPanelSettings  />
                    </button>
                    <button disabled={item.email ==user.email}
                      onClick={() => handleMakeVlolunteer(item.email)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Volunteer
                      <FaHandsHelping  />
                    </button></div> : ''
                    }
                    {
                        item?.role === 'volunteer' ?
                        <div className="flex flex-col gap-y-2"><button disabled={item.email ==user.email}
                      onClick={() =>handleMakeAdmin(item.email)}
                      className="btn btn-secondary text-white btn-xs"
                    >
                        Make Admin
                      <MdAdminPanelSettings  />
                    </button>
                    <button disabled={item.email ==user.email}
                      onClick={() => handleMakeDonor(item.email)}
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