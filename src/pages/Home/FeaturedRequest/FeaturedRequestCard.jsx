import { Link } from "react-router-dom";

const FeaturedRequestCard = ({request}) => {
    const {_id,recipientDistrict,recipientName,donationTime,donationDate,hospitalName,recipientUpazila} = request
    
    return (
      <div className="max-w-sm p-6 bg-neutral border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link  to={`/view-donation-request/${_id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           {hospitalName}
          </h5>
        </Link>
        <h2>{recipientUpazila}, {recipientDistrict}</h2>
        <h2>Time: {donationTime}</h2>
        <h2>Date: {donationDate}</h2>
        <p className="mb-3 font-medium text-lg text-secondary dark:text-gray-400">
         Receiver: {recipientName}
        </p>
        <Link to={`/view-donation-request/${_id}`}>
        <button className="btn btn-sm btn-accent text-white">View </button>
        </Link>
      </div>
    );
};

export default FeaturedRequestCard;