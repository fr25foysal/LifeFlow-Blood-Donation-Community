import { Link, NavLink } from "react-router-dom";
import { MdBallot, MdDashboard } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import useUser from "../../hooks/useUser";
const DashSideBar = () => {
  const {data:user} = useUser()

    const adminMenus = (
        <>
        <h2>Admin</h2>
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
            to={"/dashboard/all-users"}
          >
            <div className="flex items-center gap-3">
              <FaUsers className="text-2xl" /> All Users
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "pl-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2"
            }
            to={"/dashboard/all-blood-donation-request"}
          >
            <div className="flex items-center gap-3">
              <MdBallot  className="text-2xl" /> Donation Requests</div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "pl-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2"
            }
            to={"/dashboard/content-management"}
          >
            <div className="flex items-center gap-3">
              <MdBallot className="text-2xl" />All Blogs</div>
          </NavLink>
        </>
      );

    const donorMenus = (
        <>
        <h2>donor</h2>
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
                ? "pl-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2"
            }
            to={"/dashboard/create-donation-request"}
          >
            <div className="flex items-center gap-3">
              <BiSolidMessageSquareAdd  className="text-2xl" /> Create Request</div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "pl-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2"
            }
            to={"/dashboard/my-donation-requests"}
          >
            <div className="flex items-center gap-3">
              <MdBallot className="text-2xl" />My Requests</div>
          </NavLink>
        </>
      );
    const volentMenus = (
        <>
        <h2>Voluntere</h2>
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
                ? "pl-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2"
            }
            to={"/dashboard/create-donation-request"}
          >
            <div className="flex items-center gap-3">
              <BiSolidMessageSquareAdd  className="text-2xl" /> Create Request</div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "pl-5 border-l-[4px] transition-all border-accent py-2"
                : "py-2"
            }
            to={"/dashboard/my-donation-requests"}
          >
            <div className="flex items-center gap-3">
              <MdBallot className="text-2xl" />My Requests</div>
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
        
          {/* {user?.role === 'admin'donorMenus} */}
          {
          (user?.role === "admin") ? adminMenus : (user?.role === "donor") ? donorMenus : volentMenus
          }
        </ul>
              </div>
            </div>
           

          </div>
    );
};

export default DashSideBar;