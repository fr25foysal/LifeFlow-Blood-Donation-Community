import { Outlet } from "react-router-dom";
import DashSideBar from "./DashSideBar";

const DashLayout = () => {
   
    return (
      <div className="flex min-h-screen">
        <div className="bg-secondary w-1/6 text-white p-5">
          <DashSideBar></DashSideBar>
        </div>
        <div className="bg-neutral w-5/6 p-5">
            <Outlet></Outlet>
        </div>
      </div>
    );
};

export default DashLayout;