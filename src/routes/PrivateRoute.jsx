import { Navigate } from "react-router-dom";
import useProvider from "../hooks/useProvider";
import LoadingLotie from "../components/Lotties/LoadingLotie";

const PrivateRoute = ({children}) => {
    const {loading,user} = useProvider()
    
    if (loading) {
        return <div className="flex justify-center min-h-screen items-center bg-neutral"><LoadingLotie></LoadingLotie></div>
    }
    if (user) {
       return children
      
    }
    return (
         <Navigate to={'/sign-in'}></Navigate>
    );
};

export default PrivateRoute;