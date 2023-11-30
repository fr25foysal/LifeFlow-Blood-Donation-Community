import { useForm } from 'react-hook-form';
import upozilas from '../../assets/resources/upozillas.json'
import districts from '../../assets/resources/districts.json'
import { IoIosSend } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';

const ContactSection = () => {
    const { register, handleSubmit,reset , formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: ' '
      })

      const onSubmit = (data) =>{
        
        reset()
      }
    return (
      <div className="flex my-14">
        <div className="w-1/2">
          <div>
            <form
              className="grid grid-cols-2 gap-4 bg-accent p-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                className="input w-full focus:outline-none focus:border-accent"
                placeholder="Your Name"
                {...register("name", { required: true })}
              />
              <input
                type="email"
                name="mane"
                className="input w-full focus:outline-none focus:border-accent"
                placeholder="Your Email"
                {...register("email", { required: true })}
              />

              {/* <Select name="upazila " placeholder={'Select District'} {...register("recipientDistrict", { required: true })} options={newDistricts} />
            <Select placeholder={'Select Upazila'} {...register("recipientUpazila", { required: true })} options={newUpozilas} /> */}

              <select
                {...register("district", { required: true })}
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
                {...register("upazila", { required: true })}
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
                className="input col-span-2 h-40 w-full focus:outline-none focus:border-accent"
                placeholder="Your thought..."
                {...register("requestMessage", { required: true })}
              />

              <button className=" flex  w-2/4 text-white border-accent btn hover:border-2 hover:bg-transparent btn-secondary">
                Send <IoIosSend />
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 bg-white p-10 text-center">
          <div className="max-w-md  mx-auto flex flex-col pt-16">
            <h2 className="font-bold text-3xl">
              {" "}
              Reach Out, Inspire, and Make a Difference!
            </h2>
            <p className="font-medium py-4">
              we value your connection and commitment to saving lives. Whether
              you have questions, suggestions, or simply want to get involved,
              our doors—and hearts—are always open.
            </p>
            <div className=''>
                 <p className='flex items-center gap-2'> <MdEmail /> Email: admin@lifeflow.com</p>
            <p className='flex items-center gap-2'><FaPhone /> Phone: +1 000 0000</p>
            </div>
           
          </div>
        </div>
      </div>
    );
};

export default ContactSection;