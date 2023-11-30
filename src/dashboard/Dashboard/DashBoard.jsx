import LoadingLotie from "../../components/Lotties/LoadingLotie";
import PageTitle from "../../components/PageTitle/PageTitle";
import useUser from "../../hooks/useUser";
import DashboardStats from "./DashboardStats/DashboardStats";
import DonorThreeRequest from "./DonorThreeRequest/DonorThreeRequest";

const DashBoard = () => {
  const {data,isLoading} = useUser()
  if (isLoading) {
    return  <LoadingLotie></LoadingLotie>
}
    return (
        <div>
          <PageTitle title={'Dashboard'}></PageTitle>
          <h2 className="text-xl font-medium text-black">Welcome , {data.name}</h2>
        <div>
          {data?.role === 'donor' ? '' : <DashboardStats></DashboardStats>}
          
          <DonorThreeRequest></DonorThreeRequest>
        </div>
        </div>
    );
};

export default DashBoard;