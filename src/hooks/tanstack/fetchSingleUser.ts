import axios from "axios"
import Cookies from 'js-cookie'
import { useQuery } from "@tanstack/react-query";
import { serverURL } from "../serverUrl";

const fetchSingleUser = (userId:number | null)=>{
    return useQuery({
        queryKey:['singleUser'],
        queryFn: async()=>{
            const token = Cookies.get('token')
            try {
                const {data} = await axios.get(`${serverURL}/api/user/single/user?userId=${userId}`,{
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

export default fetchSingleUser;
