import { Link } from "react-router-dom";

const Button = ({text,icon, onClick,to}) => {
    return (
        <Link onClick={onClick} to={to} className="flex transition-all items-center gap-3 btn btn-accent text-white hover:text-white border-2">{text} {icon} </Link>
    );
};

export default Button;