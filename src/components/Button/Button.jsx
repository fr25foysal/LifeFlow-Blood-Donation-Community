import { FaUserEdit } from "react-icons/fa";

const Button = () => {
    return (
        <button className="flex bg-secondary transition-all items-center gap-3 btn">Edit Profile <FaUserEdit /> </button>
    );
};

export default Button;