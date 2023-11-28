
const Button = ({text,icon, onClick}) => {
    return (
        <button onClick={onClick} className="flex bg-secondary transition-all items-center gap-3 btn">{text} {icon} </button>
    );
};

export default Button;