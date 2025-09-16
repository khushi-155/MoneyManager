import { useEffect , useContext} from "react";
import { AppContext } from "../src/context/AppContext"
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../src/utils/axiosConfig";
import { API_ENDPOINTS } from "../src/utils/apiEndpoints";

export const useUser = () =>{
    const {user,setUser,clearUser} = useContext(AppContext)
    const navigate = useNavigate();
  useEffect(()=>{
    if(user!==null){
        return;
    }
    let isMounted = true;
    const fetchUserInfo = async ()=>{
         try{
            debugger
           const response = await axiosInstance.get(API_ENDPOINTS.CURRENT_PROFILE);
           if(isMounted&&response.data){
              setUser(response.data);
           }
         }
         catch(error){
           console.log("fetch the user information ", error);
           if(isMounted){
             clearUser();
             navigate("/login")
           }
         }
    }
     fetchUserInfo();

  return () => {
    isMounted = false; // cleanup: mark component unmounted
  }; 

  },[user, setUser, navigate, clearUser])
}