import { useQuery } from "@tanstack/react-query";
import useProvider from "../../hooks/useProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageTitle from "../../components/PageTitle/PageTitle";
import { FaUserEdit } from "react-icons/fa";
import Button from "../../components/Button/Button";
import LoadingLotie from "../../components/Lotties/LoadingLotie";

const Profile = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useProvider()
    const {data,isLoading}= useQuery({
        queryKey: ['profile'],
        queryFn: async()=>{
            const res =await axiosSecure.get(`/user?email=${user?.email}`)
            return res.data
        }
    })
    console.log(data)
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
                <span className="text-xl font-medium">{user.displayName}</span>{" "}
              </p>
              <p className="text-base py-2">
                Division: <br />{" "}
                <span className="text-xl font-medium">{data.division}</span>{" "}
              </p>
              <p className="text-base py-2 pb-10">
                User Email: <br />{" "}
                <span className="text-xl font-medium">{user.email}</span>{" "}
              </p>
              <Button></Button>
            </div>
            <div className="justify-between">
              <p className="text-base py-2">
                Blood Group: <br />{" "}
                <span className="text-xl font-medium">{data.blood}</span>{" "}
              </p>

              <p className="text-base py-2">
                District: <br />{" "}
                <span className="text-xl font-medium">{data.district}</span>{" "}
              </p>
              
            </div>
          </div>
          
        </div>
        
      </div>
    );
};

export default Profile;