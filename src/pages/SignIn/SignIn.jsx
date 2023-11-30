import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BoxContainer from "../../components/BoxContainer/BoxContainer";
import AuthLotie from "../../components/Lotties/AuthLotie";
import { useState } from "react";
import useProvider from "../../hooks/useProvider";
import { FaArrowLeftLong } from "react-icons/fa6";
import usePublicAxios from "../../hooks/usePublicAxios";

const SignIn = () => {
  const publicAxios = usePublicAxios()
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
    const {userLogin,successNotify,googleLogin} = useProvider()
    const [show, setShow] = useState(true)
    const handlePassShow=()=>{
        setShow(!show)
    }

    const handleGoogleLogin=()=>{
      googleLogin()
      .then((d)=>{
        const name = d.user.displayName
        const email = d.user.email
        const status = 'active'
        const role = 'donor'
        const blood = 'B+'
        const upazila = 'Monohargonj'
        const district = 'Dinajpur'
        const image = d.user.photoURL
        const user = {name,email,status,blood,role,image,district,upazila}
        publicAxios.patch(`/user?email=${email}`,user)
            .then(()=>{
                successNotify("Sign Up Succesful")
                 navigate("/");
            })
      })
      .catch(e=>{
        setErrMsg(e.message)
      })
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      const form = e.target 
      const email = form.email.value
      const password = form.password.value

      userLogin(email,password)
      .then((e)=>{
                // axios.post('/jwt',{email: e.user.email}, {withCredentials: true})
                // .then(res=> console.log(res.data))
                
        successNotify('User Logged In')
        navigate('/')
      })
      .catch(e=>{
        setErrMsg(e.message);
      })
    }

    return (
      <div className="bg-neutral lg:py-10 min-h-screen">
        <BoxContainer>
        <Link
            to={"/"}
            className="flex w-32 pb-10 text-secondary hover:text-primary transition-colors gap-2 items-center"
          >
            <FaArrowLeftLong /> Back to Home
          </Link>
          <div className="rounded-sm bg-center flex md:flex-row flex-col">
            
            <div className="grid bg-white flex-1 justify-center lg:py-7">
              
                <div className="mt-8">
                  <h3 className="block text-accent text-3xl text-center font-semibold leading-snug tracking-normal antialiased">
                    Sign In
                  </h3>
                  <div className="divider h-1 mt-1 bg-yellow w-20 mx-auto"></div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 p-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        name="email"
                        required
                        type="email"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-600 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email
                      </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        name="password"
                        required
                        type={show ? "password" : "text"}
                      />
                      {show ? (
                        <FaEyeSlash
                          onClick={handlePassShow}
                          className="absolute top-[14px] right-4"
                        ></FaEyeSlash>
                      ) : (
                        <FaEye
                          onClick={handlePassShow}
                          className="absolute top-[14px] right-4"
                        ></FaEye>
                      )}
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-600 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Password
                      </label>
                    </div>
                    <div className="-ml-2.5">
                      <div className="inline-flex items-center">
                        <label
                          className="relative flex cursor-pointer items-center rounded-full p-3"
                          htmlFor="checkbox"
                          data-ripple-dark="true"
                        >
                          <input
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-700 checked:bg-gray-700 checked:before:bg-gray-700 hover:before:opacity-10"
                            id="checkbox"
                          />
                          <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-accent opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentcolor"
                              stroke="currentcolor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <label
                          className="mt-px cursor-pointer select-none font-light text-gray-700"
                          htmlFor="checkbox"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="form-control">
                      <button
                        className="border-[3px] text-accent rounded-none hover:bg-accent hover:text-white  border-accent ease-linear duration-200 w-full py-2.5 text-center align-middle font-bold uppercase"
                        type="submit"
                      >
                        Sign In
                      </button>
                      <p className="text-[#ff5858] mt-3 text-center">
                        {errMsg}
                      </p>
                      {/*errMsg*/}
                    </div>
                    <div className="divider">OR</div>
                    <div className="flex">
                      <div
                        onClick={handleGoogleLogin}
                        className="flex cursor-pointer justify-center bg-accent px-5 border-[3px] transition-all border-accent hover:bg-transparent hover:text-accent py-2 text-white w-full text-center align-middle font-bold uppercase"
                      >
                        <FaGoogle className="text-xl mr-3 "></FaGoogle> Continue
                        with google
                      </div>
                    </div>
                    <p className="text-red-600 mt-3 text-center"></p>

                    <p className="mt-4 block text-center  text-base font-normal leading-relaxed text-gray-700 antialiased">
                      {"Don't have an account?"}
                      <Link
                        //   onClick={}
                        className="font-semibold hover:text-yellow ml-1 transition-colors text-accent"
                        to={"/sign-up"}
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              {/* <Toaster></Toaster> */}
            </div>
            <div className="flex-1 md:block md:pb-5 lg:px-20">
              <AuthLotie></AuthLotie>
            </div>
          </div>
        </BoxContainer>
      </div>
    );
};

export default SignIn;