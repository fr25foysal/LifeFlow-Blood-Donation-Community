import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageTitle from '../../../components/PageTitle/PageTitle';
import useProvider from '../../../hooks/useProvider';
import useUser from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingLotie from '../../../components/Lotties/LoadingLotie';
import districts from '../../../assets/resources/districts.json'
import upozilas from '../../../assets/resources/upozillas.json'
import { data } from 'autoprefixer';
const UpdateReq = () => {
    const { register, handleSubmit,reset , formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: ' '
      })
    const{successNotify,errorNotify}= useProvider()
    const paramID = useParams()
   
    
    const {data: currentUser,isLoading} = useUser()
    
    const axiosSecure = useAxiosSecure()
    const {data:requestData,isLoading:dataLoading,refetch} = useQuery({
        queryKey: ['single-requests'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/donation-req/${paramID.id}?email=${currentUser?.email}`)
            return res.data
        }
    })

    const onSubmit = (data) =>{
     axiosSecure.patch(`/update-request?id=${paramID.id}`,data)
     .then((d)=>{
        if (d.data.modifiedCount>0) {
            successNotify('Requeste Created')
            refetch()
            reset()
        }else{
            errorNotify('Something went wrong!')
        }
     })
     .catch(()=>{
        errorNotify('Something went wrong!')
     })

  } 
  
  if (isLoading,dataLoading) {
    return <LoadingLotie></LoadingLotie>
  }
    return (
      <div>
        <PageTitle title={"Update Request"}></PageTitle>
        <div>
          <form
            className="grid grid-cols-2 gap-4 bg-accent p-10 rounded-lg m-20"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              defaultValue={requestData?.recipientName}
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Recipient Name"
              {...register("recipientName", { required: true })}
            />
            <input
              type="text"
              defaultValue={requestData?.hospitalName}
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Hospital Name"
              {...register("hospitalName", { required: true })}
            />


            <select
            
              {...register("recipientDistrict", { required: true })}
              required
              className="select focus:outline-none "
            >
              {districts.map((division) => (
                <option key={division.id} value={division.name}>
                  {division.name}
                </option>
              ))}
            </select>
            <select
               {...register("recipientUpazila", { required: true })}
              required
              className="select focus:outline-none "
            >
              {upozilas.map((division) => (
                <option key={division.id} value={division.name}>
                  {division.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              defaultValue={requestData?.detailAddress}
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Detail Address"
              {...register("detailAddress", { required: true })}
            />
            <input
              type="date"
              defaultValue={requestData?.donationDate}
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Donation Date"
              {...register("donationDate", { required: true })}
            />
            <input
              type="time"
              defaultValue={requestData?.donationTime}
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Donation Time"
              {...register("donationTime", { required: true })}
            />
            <input
              type="text"
              defaultValue={requestData?.requestMessage}
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Request Message"
              {...register("requestMessage", { required: true })}
            />

            <button className="bg-secondary w-1/4 text-white border-accent btn hover:border-2 hover:border-secondary">
              Update
            </button>
          </form>
        </div>
      </div>
    );
};

export default UpdateReq;