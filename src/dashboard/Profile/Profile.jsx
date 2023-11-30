import useProvider from "../../hooks/useProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import LoadingLotie from "../../components/Lotties/LoadingLotie";
import { FaUserEdit } from "react-icons/fa";
import districts from "../../assets/resources/districts.json"
import upazila from "../../assets/resources/upozillas.json"
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "../../hooks/useUser";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const {data:currentUser}= useUser()
  const {successNotify,user} = useProvider()
    const imagebbApi = import.meta.env.VITE_IMGBBAPI
  const imgbburl = `https://api.imgbb.com/1/upload?key=${imagebbApi}`
  const {data,isLoading,refetch} = useUser()
   
    const handleEditProfile=(e)=>{
        e.preventDefault()
        const form = e.target
      const name = form.name.value
      const blood = form.blood.value
      const district = form.district.value
      const upazila = form.upazila.value
      const imageInput = form.image.files
      const imageFile = {image: imageInput[0]}
       
      const toastId = toast.loading('Please Wait...');
      axios.post(imgbburl,imageFile,{headers:{'content-type': 'multipart/form-data'}})
       .then(d=>{
        const image = d.data.data.display_url || currentUser.image
        const updatedUser = {name,blood,upazila,district,image}
        console.log(updatedUser);
        axiosSecure.patch(`/user?email=${user?.email}`,updatedUser)
        .then((d)=>{
            console.log(d.data)
            if (d.data.modifiedCount>0) {
               successNotify("Profile Updated");
          form.reset();
          toast.dismiss(toastId); 
          refetch()
            }
          toast.error('Something went wrong!');
          toast.dismiss(toastId);
        })
        .catch(() => {
          toast.error('Something went wrong!');
          toast.dismiss(toastId);
        });
       })
       .catch(()=>{
        toast.dismiss(toastId);
        // toast.error('Keep eyes open!');
       
       })
    }
    if (isLoading) {
        return <LoadingLotie></LoadingLotie>
    }
    return (
      <div>
        <PageTitle title={"profile"}></PageTitle>
        <div className="bg-primary flex rounded-lg p-10 text-white m-20">
          <img
            className="relative rounded-md w-52 h-52 bg-error -top-20 -left-20"
            src={data.image}
            alt=""
          />
          <div className="flex-1 flex max-w-lg justify-between">
            <div className="justify-between">
              <p className="text-base py-2">
                Name: <br />{" "}
                <span className="text-xl font-medium">{data.name}</span>{" "}
              </p>
              <p className="text-base py-2">
                District: <br />{" "}
                <span className="text-xl font-medium">{data.district}</span>{" "}
              </p>
              
              <p className="text-base py-2 pb-10">
                User Email: <br />{" "}
                <span className="text-xl font-medium">{user.email}</span>{" "}
              </p>
              <Button
                text={"Edit Profile"}
                icon={<FaUserEdit />}
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              ></Button>

              <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-white rounded-md">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn text-primary bg-error btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>

                  <h2 className="text-center text-black text-2xl font-semibold">
                    Edit Profile
                  </h2>
                  <div className="divider bg-accent m-2 h-1 rounded w-1/4 mx-auto"></div>
                  {/* Modal Form */}
                  <form
                    onSubmit={handleEditProfile}
                    className="mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96"
                  >
                    <div className="mb-4 flex flex-col gap-6 text-black">
                      <div className="flex gap-4">
                        <div className="relative h-11 w-full flex-1">
                          <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            name="name"
                            defaultValue={currentUser?.name}
                            required
                            type="text"
                          />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Name
                          </label>
                        </div>
                        <div className="relative flex-1">
                          <select
                            name="blood"
                            required
                            className=" h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 "
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Blood Group
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <select
                            name="district"
                            required
                            className=" h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 "
                          >
                            {districts.map((division) => (
                              <option key={division.id} value={division.name}>
                                {division.name}
                              </option>
                            ))}
                          </select>
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            District
                          </label>
                        </div>
                        <div className="relative flex-1">
                          <select
                            name="upazila"
                            required
                            className=" h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 "
                          >
                            {upazila.map((division) => (
                              <option key={division.id} value={division.name}>
                                {division.name}
                              </option>
                            ))}
                          </select>
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Upazila
                          </label>
                        </div>
                      </div>
                      <input
                        type="file"
                        name="image"
                        className="file-input file-input-bordered file-input-error"
                      />
                    </div>
                    <div className="mx-auto w-1/4">
                            <button type="submit" className="bg-accent px-5 border-[3px] transition-all border-accent hover:bg-transparent btn hover:text-accent text-white">
                            Update
                          </button>
                          </div>
                  </form>
                </div>
              </dialog>
            </div>
            <div className="justify-between">
              <p className="text-base py-2">
                Blood Group: <br />{" "}
                <span className="text-xl font-medium">{data.blood}</span>{" "}
              </p>

              <p className="text-base py-2">
              Upazila: <br />{" "}
                <span className="text-xl font-medium">{data.upazila}</span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;