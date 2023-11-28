import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useForm } from 'react-hook-form';


const CreateReq = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
    return (
      <div>
        <PageTitle title={"Create Request"}></PageTitle>
        <div>
          <form className="grid grid-cols-2 gap-4 bg-accent p-10 rounded-lg m-20" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Recipient Name"
              {...register("Recipient Name", { required: true })}
            />
            <select className="select   w-full focus:outline-none focus:border-accent" {...register("Recipient District", { required: true })}>
              <option value="sdfdf">sdfdf</option>
            </select>
            <select  className="select   w-full focus:outline-none focus:border-accent" {...register("Recipient Upazila", { required: true })}>
              <option value="No">No</option>
            </select>
            <input
              type="text"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Hospital Name"
              {...register("Hospital Name", { required: true })}
            />
            <input
              type="text"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Detail Address"
              {...register("Detail Address", { required: true })}
            />
            <input
              type="date"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Donation Date"
              {...register("Donation Date", { required: true })}
            />
            <input
              type="time"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Donation Time"
              {...register("Donation Time", { required: true })}
            />
            <input
              type="text"
              className="input w-full focus:outline-none focus:border-accent"
              placeholder="Request Message"
              {...register("Request Message", { required: true })}
            />

           <button className="bg-secondary text-white border-accent btn hover:border-2 hover:border-secondary">Request</button>
          </form>
        </div>
      </div>
    );
};

export default CreateReq;