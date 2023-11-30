import PageTitle from "../../../../components/PageTitle/PageTitle";
import { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import useUser from "../../../../hooks/useUser";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useProvider from "../../../../hooks/useProvider";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../../../hooks/usePublicAxios";

const EditBlog = ({placeholder}) => {
    const {id} = useParams()
    const editor = useRef(null);
    const {successNotify} = useProvider()
    const {data:user} = useUser()
	const [content, setContent] = useState('');
    const imagebbApi = import.meta.env.VITE_IMGBBAPI
    const imgbburl = `https://api.imgbb.com/1/upload?key=${imagebbApi}`
    const [imageUrl,setImageUrl] = useState('')
    const axiosSecure = useAxiosSecure()
    const axiosPublic = usePublicAxios()

    const {data} = useQuery({
        queryKey:['blog'],
        queryFn: async()=>{
        const res = await axiosPublic.get(`/blog?id=${id}`)
        return res.data
        }
    })
    useEffect(()=>{
    setContent(data?.content)
    setImageUrl(data?.imageUrl)
    },[data])
	// const config = useMemo({
    //     readonly: false,placeholder: placeholder || 'Start typings...'
    // },
    // [placeholder]
    // )
    const config = useMemo(()=>{
        
    },[placeholder])

    const handleUploadFeatured = (e) =>{
        const featuredImage = {image: e.target.files[0]}
        console.log(featuredImage);
        axios.post(imgbburl,featuredImage,{headers:{'content-type': 'multipart/form-data'}})
       .then(d=>{
        setImageUrl(d.data.data.display_url)
       })
    }
    const handleSubmitPost=(e)=>{
        e.preventDefault()
        const form = e.target 
        const title = form.title.value
        const post = {title,content,imageUrl}

        axiosSecure.patch(`/posts?id=${id}`,post)
        .then((d)=>{ 
            console.log(d.data);
            if (d.data.modifiedCount>0) {
                successNotify('Post have been saved to draft')
            }
        })
        .catch((e)=>{
            console.log(e.message);
        })
       
    }
    return (
      <div>
        <PageTitle title={"Add new Blog"}></PageTitle>
        <form onSubmit={handleSubmitPost} className="flex gap-5">
          <div className="w-4/5">
            <label htmlFor="" className="font-medium text-2xl">Post Title:</label> <br />
            <input
              type="text"
              name="title"
              defaultValue={data?.title}
              required
              placeholder="title here"
              className="input w-full focus:outline-none border-none mb-5 mt-2"
            />
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {
                // console.log(newContent);
              }}
            />
          </div>
          <div className="bg-error p-5 flex flex-col justify-between h-fit rounded-lg w-1/5">
            <div>
                <h2 className="text-white text-2xl font-semibold">Featured Image:</h2>
                <input type="file" onChange={handleUploadFeatured} name="featuredImage" className="file-input file-input-bordered outline-none file-input-secondary w-full my-4" />
               <img src={imageUrl} alt="" />
            </div>
            <div className="flex mt-5 items-end justify-center">
                <button disabled={imageUrl===''} type="submit" className="btn btn-neutral ">Update</button>
            </div>
            
          </div>
        </form>
      </div>
    );
};

export default EditBlog;