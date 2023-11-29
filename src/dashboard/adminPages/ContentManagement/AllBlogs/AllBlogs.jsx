import { Link } from "react-router-dom";
import PageTitle from "../../../../components/PageTitle/PageTitle";

const AllBlogs = () => {
    return (
        <div>
            <PageTitle title={'All Blogs'}></PageTitle>
            <Link to={'/dashboard/content-management/add-blog'} className="btn btn-md btn-secondary">Add Blog</Link>
            All Blogs
        </div>
    );
};

export default AllBlogs;