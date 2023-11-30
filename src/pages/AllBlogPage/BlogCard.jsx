import { Link } from "react-router-dom";
import ExcerptMaker from "../../components/ExcerptMaker/ExcerptMaker";

const BlogCard = ({blog}) => {
   
    const {_id,title,content,imageUrl,author} = blog
    // const {name:authorName,image:authorImage} = author
  
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/single-blog/${_id}`}>
        <img
            className="rounded-t-lg w-full h-48 object-cover"
            src={imageUrl}
            alt=""
          />
        </Link>
        <div className="p-5">
        <Link  to={`/single-blog/${_id}`}>
          <h5 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
           {title}
          </h5>
        </Link>
        
          
          <ExcerptMaker maxLength={600} content={content}></ExcerptMaker>
         
          <Link to={`/single-blog/${_id}`}>
        <button className="btn btn-sm btn-accent text-white">Read More... </button>
        </Link>
        </div>
      </div>
    );
};

export default BlogCard;