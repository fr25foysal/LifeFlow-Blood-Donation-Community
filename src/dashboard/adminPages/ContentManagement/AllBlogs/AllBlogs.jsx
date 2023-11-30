import { Link } from "react-router-dom";
import { MdDelete, MdPublish} from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { RiDraftFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import LoadingLotie from "../../../../components/Lotties/LoadingLotie";
import { BiSolidEdit } from "react-icons/bi";

const AllBlogs = () => {
    
    const {data:user} = useUser()
    const [page,setPage] = useState(0)
   const [filter,setFilter] = useState('')
    const axiosSecure = useAxiosSecure()
    const {data:{result,dataCount},isLoading,refetch} = useQuery({
        queryKey: ['dashboard-requests',page,filter],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/posts?page=${page}&filter=${filter}`)
            return res.data
        },
        initialData: {result: [],dataCount: 0}
    })
    const postPerPage = 5
    const totalData = Math.ceil(dataCount/postPerPage)
    const pageNumbersArr = [...new Array(totalData).fill(0)]
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

    const handleChangePublish=(id)=>{
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d90429",
        cancelButtonColor: "#2b2d42",
        confirmButtonText: "Yes, Do it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/posts?id=${id}`,{'status': 'published'})
          .then((d)=>{
            if (d.data.modifiedCount) {
                refetch()
              Swal.fire({
             title: "Published!",
             text: "Post has been published.",
             icon: "success"
           });
            }
              
    })   
        }
      });
    }
    const handleChangeDraft=(id)=>{
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d90429",
        cancelButtonColor: "#2b2d42",
        confirmButtonText: "Yes, Do it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/posts?id=${id}`,{status: 'draft'})
          .then((d)=>{
            if (d.data.modifiedCount) {
                console.log(d.data)
              refetch()
              Swal.fire({
             title: "Unpublished!",
             text: "Post has been unpublished.",
             icon: "success"
           });
            }
              
    })   
        }
      });
    }

    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d90429",
            cancelButtonColor: "#2b2d42",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/post/${id}`)
        .then((d)=>{
            console.log(d.data)
            if (d.data.deletedCount>0) {
                refetch()
                 Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
           
        })   
            }
          });
        
    }
    
    if (isLoading) {
        return <LoadingLotie/>
     }
    return (
        <div>
            <PageTitle title={'All Blogs'}></PageTitle>
            <div className="m-10">
                <div className=" justify-end flex mb-5 "><Link to={'/dashboard/content-management/add-blog'} className="btn btn-md text-white btn-secondary">Add Blog</Link>
                </div>
           <div>
           <div className="overflow-x-auto bg-error rounded-lg p-10 text-black">
          <div className="flex items-center gap-5">
            <h2 className="text-xl font-medium">Filter: </h2>
            <select
              onChange={handleFilter}
              className="select focus:outline-none border-none bg-secondary text-white"
            >
              <option value="">Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <table className="table mb-5">
            {/* head */}
            <thead>
              <tr className="text-base">
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Status Action</th>
                <th>Post Action</th>
              </tr>
            </thead>
            <tbody>
              {result?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="avatar bg-secondary rounded-2">
                      <div className=" w-20 h-12">
                        <img src={item.imageUrl} alt="Post image" />
                      </div>
                    </div>
                  </td>

                  <td>
                    <h2 className="font-semibold">{item.title}</h2>
                  </td>

                  <td className="font-semibold">
                    {item?.author?.name}
                    <br />
                    <span className="badge font-normal badge-ghost badge-sm">
                      {item?.author?.role}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                        <div className="font-semibold capitalize">{item.status}</div>
                    </div>
                  </td>

                  <td>                        
                    {item?.status === 'draft' ?
                    <button disabled={'admin' !==user.role}
                    onClick={() => handleChangePublish(item._id)}
                    className="btn btn-secondary text-white btn-xs"
                  > Publish
                    <MdPublish />
                  </button> 
                  :
                   <button disabled={'admin' !==user.role}
                    onClick={() => handleChangeDraft(item._id)}
                    className="btn btn-secondary text-white btn-xs"
                  > Unpublish
                    <RiDraftFill />
                  </button>
                     }

                  </td>

                  <th className="flex flex-col gap-2">
                  <Link to={`/dashboard/content-management/edit-blog/${item._id}`} className="btn btn-secondary text-white btn-xs">Edit<BiSolidEdit/></Link>
                  {/* <Link to={`/dashboard/details-request/${item._id}`} className="btn text-lg btn-secondary text-white btn-xs"><FaRegEye /></Link> */}
                  <button disabled={'admin' !==user.role} onClick={()=>handleDelete(item._id)} className="btn btn-secondary text-white btn-xs">Delete<MdDelete /></button>
                  
                  </th>
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
           </div>
            </div>
            
        </div>
    );
};

export default AllBlogs;