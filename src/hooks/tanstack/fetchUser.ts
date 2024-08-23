import axios from "axios"
import Cookies from 'js-cookie'
import { useQuery } from "@tanstack/react-query";

const fetchUser = ()=>{
    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;

    return useQuery({
        queryKey:['userData'],
        queryFn: async()=>{
            const token = Cookies.get('token')
            try {
                const {data} = await axios.get(`${serverURL}/api/validate/user`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                return data;
            } catch (error) {
                if(axios.isAxiosError(error)){
                    return error.response?.data.message
                }else{
                    return "An unexpected error occurred"
                }
            }
        }
    })
}

export default fetchUser;
