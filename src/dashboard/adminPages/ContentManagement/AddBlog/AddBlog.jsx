import PageTitle from "../../../../components/PageTitle/PageTitle";
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import useUser from "../../../../hooks/useUser";

const AddBlog = ({placeholder}) => {
    const editor = useRef(null);
    const {data:user} = useUser()
	const [content, setContent] = useState('');
    const imagebbApi = import.meta.env.VITE_IMGBBAPI
    const imgbburl = `https://api.imgbb.com/1/upload?key=${imagebbApi}`
    const [imageUrl,setImageUrl] = useState('')

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
    console.log(imageUrl);
    const handleSubmitPost=(e)=>{
        e.preventDefault()
        const form = e.target 
        const title = form.title.value
        const author = {name: user.name,email: user.email,role:user.role,image: user.image}
        const post = {title,content,imageUrl,author}
        console.log(post);
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
          <div className="bg-error p-5 flex flex-col justify-between h-80 rounded-lg w-1/5">
            <div>
                <h2 className="text-white text-2xl font-semibold">Featured Image:</h2>
                <input type="file" required onChange={handleUploadFeatured} name="featuredImage" className="file-input file-input-bordered outline-none file-input-secondary w-full my-4" />
               
            </div>
            <div className="flex items-end justify-center">
                <button disabled={imageUrl===''} type="submit" className="btn btn-neutral ">Publish</button>
            </div>
            
          </div>
        </form>
      </div>
    );
};

export default AddBlog;