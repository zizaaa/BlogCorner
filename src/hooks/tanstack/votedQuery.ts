import { useQuery } from "@tanstack/react-query";
import { serverURL } from "../serverUrl";
import axios from "axios";
import fetchUser from "./fetchUser";

const votedQuery = (id:number) =>{
    const { data:user } = fetchUser();
    
    return useQuery({
        queryKey:['isVoted', id],
        queryFn: async()=>{
            try {
                const { data } = await axios.get(`${serverURL}/api/blogs/get/isvoted?blogId=${id}&userId=${user.id}`)
                return data;
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.log(error)
                }
                console.error(error)
            }
        },
        enabled: !!id && !!user?.id
    })
}

export default votedQuery;