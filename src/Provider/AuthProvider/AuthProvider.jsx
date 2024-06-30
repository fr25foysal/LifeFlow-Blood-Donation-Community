import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../../configs/firebase.config";
import usePublicAxios from '../../hooks/usePublicAxios'
export const authContext= createContext()
const AuthProvider = ({children}) => {
    
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    // Toast notification
    const successNotify = (text) => toast.success(text)
    const errorNotify = (text) => toast.error(text)

    // create user by email & pass
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // Google Login
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = ()=>{
        setLoading(true)               
        return signInWithPopup(auth,googleProvider)
    }

    // login user
    const userLogin = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // update user name
    const updateUser = (name,photoUrl)=>{
        return updateProfile(auth.currentUser,{
            displayName: name,photoURL: photoUrl
        })
    }

    // Log out user 
    const logOut =()=>{
        localStorage.removeItem('access-token')
        return signOut(auth)
    }

    // keep the user alive on website😂
const publicAxios = usePublicAxios()
    useEffect(()=>{
        onAuthStateChanged(auth, currentuser=>{
            setUser(currentuser)
            // const email = currentuser?.email || user?.email
            // console.log(currentuser);
            if (currentuser) {
                console.log('order');
                publicAxios.post('/jwt',{email: currentuser.email})
                .then(d=>{
                    console.log(d.data);
                    localStorage.setItem('access-token',d.data.token)
                })
            }else{
                // 
            }
            
            setLoading(false)
        })
    },[])

     // const keepAlive = onAuthStateChanged(auth,(currentUser)=>{
        //     setUser(currentUser)
        //     console.log("current",currentUser)
        //     setLoading(false)
        //     if (currentUser) {
        //         axios.post('/jwt',{email: currentUser?.email},{withCredentials: true})
        //         .then(d=>console.log(d.data))
        //     }            
        // })
        // return ()=> keepAlive
    


    //✈ ✈ ✈ sending values ✈ ✈ ✈ 

    const values = {
        user,loading,createUser,userLogin,updateUser,logOut,
        successNotify,errorNotify,googleLogin
    }
    return (
        <authContext.Provider value={values}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;