import { Link, NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const DashSideBar = () => {
    const menus = (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "px-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2"
            }
            to={"/dashboard"}
          >
            <div className="flex items-center gap-3">
              <MdDashboard className="text-2xl" /> Dashboard
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "px-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2 transition-all"
            }
            to={"/dashboard/profile"}
          >
            <div className="flex items-center gap-3">
              <FaUser className="text-2xl" /> Profile
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "px-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2"
            }
            to={"/dashboard/something"}
          >
            <div className="flex items-center gap-3">
              <MdDashboard className="text-2xl" /> Dashboard
            </div>
          </NavLink>
        </>
      );
    return (
        <div className="">
            <div className="">
              <Link to={"/"} className="flex justify-center">
                <img className="w-40" src="/logo-dark.png" alt="" />
              </Link>
              <div className="divider bg-white h-[1px]"></div> 
              <div>
              <ul className="menu gap-y-3 p-4 w-[70%] h-full ">
        
          {menus}
        </ul>
              </div>
            </div>
           

          </div>
    );
};

export default DashSideBar;