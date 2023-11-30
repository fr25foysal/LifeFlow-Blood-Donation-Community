
import PageTitle from "../../components/PageTitle/PageTitle";
import { useForm } from 'react-hook-form';
import useUser from "../../hooks/useUser";
import LoadingLotie from "../../components/Lotties/LoadingLotie";
import upozilas from '../../assets/resources/upozillas.json'
import districts from '../../assets/resources/districts.json'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useProvider from "../../hooks/useProvider";
const CreateReq = () => {
    const { register, handleSubmit,reset , formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: ' '
      })
    const{successNotify,errorNotify}= useProvider()
    const {data: currentUser,isLoading} = useUser()
    const axiosSecure = useAxiosSecure()
    
    const onSubmit = (data) =>{
    const requesterEmail = currentUser?.email
    const requesterName = currentUser?.name
    const status = 'pending'
    const newRew = {...data,requesterEmail,requesterName,status}
    
     axiosSecure.post('/donation-reqs',newRew)
     .then((d)=>{
        if (d.data.insertedId) {
            successNotify('Requeste Created')
            reset()
        }else{
            errorNotify('Something went wrong!')
        }
     })
     .catch(()=>{
        errorNotify('Something went wrong!')
     })

  } 
//   const newUpozilas = upozilas.map(item=>(
//     {
//         value: item.name,
//         label: item.name
//     }
//   ))
//   const newDistricts = districts.map(item=>(
//     {
//         value: item.name,
//         label: item.name
//     }
//   ))
 
  if (isLoading) {
    return <LoadingLotie></LoadingLotie>
  }
    return (
      <div>
        <PageTitle title={"Create Request"}></PageTitle>
        <div>
          <form
            className="grid grid-cols-2 gap-4 bg-accent p-10 rounded-lg m-20"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Recipient Name"
              {...register("recipientName", { required: true })}
            />
            <input
              type="text"
              name="mane"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Hospital Name"
              {...register("hospitalName", { required: true })}
            />

            {/* <Select name="upazila " placeholder={'Select District'} {...register("recipientDistrict", { required: true })} options={newDistricts} />
            <Select placeholder={'Select Upazila'} {...register("recipientUpazila", { required: true })} options={newUpozilas} /> */}

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
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Detail Address"
              {...register("detailAddress", { required: true })}
            />
            <input
              type="date"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Donation Date"
              {...register("donationDate", { required: true })}
            />
            <input
              type="time"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Donation Time"
              {...register("donationTime", { required: true })}
            />
            <input
              type="text"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Request Message"
              {...register("requestMessage", { required: true })}
            />

            <button  disabled={!currentUser.status=='active'} className="bg-secondary disabled:text-white disabled:bg-error w-1/4 text-white border-accent btn hover:border-2 hover:border-secondary">
              Request
            </button>
          </form>
        </div>
      </div>
    );
};

export default CreateReq;