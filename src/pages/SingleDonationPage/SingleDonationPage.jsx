import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BoxContainer from "../../components/BoxContainer/BoxContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import { MdVolunteerActivism } from "react-icons/md";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";

const SingleDonationPage = () => {
    const {id} = useParams()
    const {data:user} = useUser()

    const axiosSecure = useAxiosSecure()
    const {data:requestData,isLoading:dataLoading,refetch} = useQuery({
        queryKey: ['single-requests'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/single-donation-req/${id}`)
            return res.data
            
        },
        initialData: {requestData:[]}
    })
    const handleDonate= ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "DonBe a Lifesaver: Donate Blood, Save Lives!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d90429",
            cancelButtonColor: "#2b2d42",
            confirmButtonText: "Donate!"
          }).then((result) => {
            const updatedData = {
                status: 'in progress',
                donorName : user.name,
                donorEmail : user.email

            }
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-request/?id=${id}`,updatedData)
        .then((d)=>{
            if (d.data.modifiedCount>0) {
                refetch()
                 Swal.fire({
                title: "Success!",
                text: "Donation is in Progress Now.",
                icon: "success"
              });
            }
           
        })   
            }
          });
        
    }

    const {recipientDistrict,detailAddress,requestMessage,requesterName
        ,recipientName,donationTime,donationDate,hospitalName,recipientUpazila} = requestData

    return (
      <div className="py-10">
        <PageTitle title={"Donate Blood"}></PageTitle>
        <BoxContainer>
          <div className="flex gap-5 py-10">
            <div className="bg-neutral p-5">
                <h2 className="font-bold text-3xl text-center pb-5">Donation Details</h2>
              <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {hospitalName}
              </h5>
              <h2>
                {recipientUpazila}, {recipientDistrict}
              </h2>
              <h2>Time: {donationTime}</h2>
              <h2>Date: {donationDate}</h2>
              <p className="mb-3 font-medium text-lg text-secondary dark:text-gray-400">
                Receiver: {recipientName}
              </p>
              <p className="mb-3 font-medium text-lg text-secondary dark:text-gray-400">
                Address: {detailAddress}
              </p>
            </div>
            <div className="bg-neutral p-5">
            <h2 className="font-bold text-3xl text-center pb-5">Requester Details</h2>
              <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {requesterName}
              </h5>
              <p className="mb-3 font-medium text-lg text-secondary dark:text-gray-400">
                Message: {requestMessage}
              </p>
            </div>
          </div>
          <button onClick={handleDonate} className="btn w-2/12 btn-secondary text-white">Donate <MdVolunteerActivism></MdVolunteerActivism> </button>
        </BoxContainer>
      </div>
    );
};

export default SingleDonationPage;