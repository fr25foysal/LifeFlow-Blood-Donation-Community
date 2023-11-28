import { useContext } from "react";
import { authContext } from "../Provider/AuthProvider/AuthProvider";

const useProvider = () => {
    return useContext(authContext)
};

export default useProvider;