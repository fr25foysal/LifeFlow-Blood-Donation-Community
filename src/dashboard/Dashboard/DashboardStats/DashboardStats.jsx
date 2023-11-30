import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardStats = () => {
    const axiosSecure = useAxiosSecure()
    const [data,setData] = useState({})
    useEffect(()=>{
        axiosSecure.get('/dashboard-stats')
        .then((d)=>{
            setData(d.data)
        })
    },[])
    console.log(data);
    return (
      <div className="grid grid-cols-3 gap-10 text-white m-10">
        <div className="bg-error rounded-lg p-8">
          <h2 className="font-medium text-lg">Total User:</h2>
          <div className="flex gap-3 mt-3 items-center text-5xl font-bold">
            <FaUsers /> {data?.totalUsers}
          </div>
        </div>
        <div className="bg-accent rounded-lg p-8">
          <h2 className="font-medium text-lg">Total Donations:</h2>
          <div className="flex gap-3 mt-3 items-center text-5xl font-bold">
            <MdVolunteerActivism /> {data?.totalDonations}
          </div>
        </div>
        <div className="bg-secondary rounded-lg p-8">
          <h2 className="font-medium text-lg">Total Fundings:</h2>
          <div className="flex gap-3 mt-3 items-center text-5xl font-bold">
            <RiRefund2Line /> {data?.totalFunding} $
          </div>
        </div>
      </div>
    );
};

export default DashboardStats;