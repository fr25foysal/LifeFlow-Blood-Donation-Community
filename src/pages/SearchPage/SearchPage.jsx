
import PageTitle from '../../components/PageTitle/PageTitle'
import districts from "../../assets/resources/districts.json"
import upazilas from "../../assets/resources/upozillas.json"
import BoxContainer from '../../components/BoxContainer/BoxContainer'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import usePublicAxios from '../../hooks/usePublicAxios';
const SearchPage = () => {

   districts.sort((a, b) =>a.name.localeCompare(b.name));
   upazilas.sort((a, b) =>a.name.localeCompare(b.name));
    const [page,setPage] = useState(0)
   const [filter,setFilter] = useState('active')
   const [blood,setBlood] = useState('')
   const [district,setDistrict] = useState('')
   const [upazila,setUpazila] = useState('')
   const [email,setEmail] = useState('')
    const axiosPublic = usePublicAxios()
    const {data:{result,dataCount},isLoading,refetch} = useQuery({
        queryKey: ['donor-requests',page,filter,blood, district, upazila,email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/donors?page=${page}&filter=${filter}&blood=${blood}&district=${district}&upazila=${upazila}&email=${""}`)
            return res.data
        },
        initialData: {result: [],dataCount: 0}
    })
    
    const postPerPage = 5
    const totalData = Math.ceil(dataCount/postPerPage)
    const pageNumbersArr = [...new Array(totalData).fill(0)]
    console.log(result);
    const handlePrev = ()=>{
        
        if (!page==0) {
          setPage(page-1)
        }
      }
      const handleNext = ()=>{
       if (!page== pageNumbersArr.length-1) {
        setPage(page+1)
       }
          
      }
      const handleFilter= (e)=>{
        setFilter(e.target.value);
      }
      const handleSearch= (e) =>{
        e.preventDefault()
        const blood = e.target.blood.value
        const upazila = e.target.district.value
        const district = e.target.division.value
        const email = e.target.email.value

        console.log(blood);
        setDistrict(district)
        setBlood(blood)
        setUpazila(upazila)
        setEmail(email)
      }
  return (
    <div className="p-10">
      
      <BoxContainer>
      <PageTitle title={"Search Donors"}></PageTitle>
        <form onSubmit={handleSearch} className="grid grid-cols-5 gap-5 justify-center py-10">
          <div className="relative flex-1">
            <select
              name="blood"
              className=" h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 "
            >
              <option value="AP">A+</option>
              <option value="AN">A-</option>
              <option value="BP">B+</option>
              <option value="BN">B-</option>
              <option value="ABP">AB+</option>
              <option value="ABN">AB-</option>
              <option value="OP">O+</option>
              <option value="ON">O-</option>
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Blood Group
            </label>
          </div>

          <div className="relative">
            <select
              name="division"
              
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
          <div className="relative">
            <select
              name="district"
              className=" h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 "
            >
              {upazilas.map((division) => (
                <option key={division.id} value={division.name}>
                  {division.name}
                </option>
              ))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Upazila
            </label>
          </div>
          <div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
                name="email"
                
                type="email"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
            </div>
          </div>
          <div>
            <button className="btn text-white btn-secondary min-w-[200px]">Search </button>
          </div>
        </form>
        <div className="overflow-x-auto bg-accent rounded-lg p-10 text-white">
          <div className="flex items-center gap-5">
            <h2 className="text-xl font-medium">Filter: </h2>
            <select
              onChange={handleFilter}
              className="select focus:outline-none border-none bg-secondary text-white"
            >
              {/* <option value="">Status</option> */}
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          <table className="table mb-5">
            {/* head */}
            <thead>
              <tr className="text-base">
                <th>Image</th>
                <th>Email</th>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {result?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="avatar bg-secondary rounded-2xl">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="User Avater" />
                      </div>
                    </div>
                  </td>

                  <td>
                    <h2 className="font-semibold">{item.email}</h2>
                  </td>

                  <td className="font-semibold">
                    {item.name}
                    <br />
                    <span className="badge font-normal badge-ghost badge-sm">
                      {item.district} , {item.upazila}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold capitalize">
                         {
                          item.blood === "AP"
                           ? "A Positive"
                            : item.blood === "AN"
                           ? "A Negative"
                            : item.blood === "BP"
                           ? "B Positive"
                            : item.blood === "BN"
                           ? "B Negative"
                            : item.blood === "ABP"
                           ? "AB Positive"
                            : item.blood === "ABN"
                           ? "AB Negative"
                            : item.blood === "OP"
                           ? "O Positive"
                            : item.blood === "ON"
                           ? "O Negative"
                            : ""
                         }
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                       
                        <div className="font-semibold capitalize"> {item.status}</div>
                      </div>
                    </div>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-5 justify-center">
            <button onClick={handlePrev} className="btn btn-sm">
              Prev
            </button>
            <div>
              {pageNumbersArr.map((pageNumber, index) => (
                <button
                  onClick={() => setPage(index)}
                  className={`btn btn-sm rounded-full mx-2 ${
                    page == index ? "btn-secondary" : ""
                  } `}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button onClick={handleNext} className="btn btn-sm">
              Next
            </button>
          </div>
        </div>
      </BoxContainer>
    </div>
  );
};

export default SearchPage;