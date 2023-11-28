import LoadingLotie from "../../components/Lotties/LoadingLotie";
import PageTitle from "../../components/PageTitle/PageTitle";
import useUser from "../../hooks/useUser";

const DashBoard = () => {
  const {data,isLoading,refetch} = useUser()
  if (isLoading) {
    return  <LoadingLotie></LoadingLotie>
}
    return (
        <div>
          <PageTitle title={'Dashboard'}></PageTitle>
          <h2 className="text-xl font-medium text-black">Welcome , {data.name}</h2>
        </div>
    );
};

export default DashBoard;