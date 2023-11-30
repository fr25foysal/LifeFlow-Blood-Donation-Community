import { Link, NavLink, Outlet } from "react-router-dom";
import useProvider from "../../../hooks/useProvider";
import { IoMdLogOut } from "react-icons/io";
import userImage from '../../../assets/user.jpg'
import BoxContainer from "../../../components/BoxContainer/BoxContainer";
const Navbar = () => {
  const {user,logOut,successNotify} = useProvider()
console.log(user);

const handleLogOut=()=>{
  logOut()
  .then(()=>{
    successNotify('User Logged Out')
  })
  .catch((d)=>{
    console.error(d.message);
  })
  
}
  const profileMenu = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "px-5 border-l-[3px] transition-all border-accent py-2" : "px-5 py-2"
        }
        to={"/dashboard"}
      >
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "px-5 border-[3px] transition-all border-accent py-2" : "px-5 py-2"
        }
        to={"/dashboard/profile"}
      >Profile
      </NavLink>
        {
          user?.email ? <button onClick={handleLogOut} className="flex items-center gap-2 px-5 py-2 mt-3 text-neutral btn btn-accent">Log Out <IoMdLogOut /></button> :
          <Link to={'/sign-in'} className="flex items-center gap-2 px-5 py-2 text-neutral btn mt-3 btn-accent">Sign In <IoMdLogOut /></Link>
        }
      
    </>
  );
  const menus = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-5 border-b-[4px] transition-all border-accent py-2"
            : ""
        }
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-5 border-b-[4px] transition-all border-accent py-2"
            : ""
        }
        to={"/all-donation-requests"}
      >
        Donation Requests
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-5 border-b-[4px] transition-all border-accent py-2"
            : ""
        }
        to={"/"}
      >
        Blogs
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-5 border-b-[4px] transition-all border-accent py-2"
            : ""
        }
        to={"/"}
      >
        Donate Funds
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-5 border-b-[4px] transition-all border-accent py-2"
            : ""
        }
        to={"/sign-up"}
      >
        Sign Up
      </NavLink>

    </>
  );
  return (
    <div className="drawer px-0">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  flex flex-col">
        {/* Navbar */}
        <div className=" bg-secondary">
          <BoxContainer>
          <div className="navbar  text-white  max-w-7xl justify-between -b-2 border-accent">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <Link to={"/"} className="flex-0 md:justify-start justify-center">
              <img className="w-40" src="/logo-dark.png" alt="" />
            </Link>

            <div className="flex-1 hidden justify-center lg:flex ">
              <ul className="menu menu-horizontal px-0 items-center text-base font-medium gap-x-5">
                {/* Navbar menu content here */}
                {menus}
              </ul>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-14 rounded-full">
                  {
                    user?.email ? 
                    <img
                    className="bg-secondary"
                    alt="user image"
                    src={user?.photoURL}
                  />
                  :
                  <img
                    alt="user image"
                    src={userImage}
                  />
                  }
                  
                </div>
              </div>
              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                {profileMenu}
              </ul>
            </div>
          </div>
          </BoxContainer>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu gap-y-3 p-4 w-[70%] h-full bg-[#000000af]">
          {/* Sidebar content here */}
          {menus}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;