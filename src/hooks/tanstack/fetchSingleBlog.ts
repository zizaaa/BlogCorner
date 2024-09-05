import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { serverURL } from "../serverUrl";

export const fetchSingleBlog = (id:string) =>{
    const navigate = useNavigate();

    return useQuery({
        queryKey:['singleBlog', id],
        queryFn: async()=>{
            try {
                const { data } = await axios.get(`${serverURL}/api/blogs/get/single/blog/${id}`)
                
                return data
            } catch (error) {
                navigate('/')
                return;
            }
        }
    })
}