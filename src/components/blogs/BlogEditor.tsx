import { useNavigate, useParams } from "react-router-dom"
import { cookieStore, serverURL, Tiptap } from "../links";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PreviewData } from "../../types/Data";

function BlogEditor() {
    const { id } = useParams();

    const [data, setData] = useState<PreviewData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { getToken,token } = cookieStore();

    const navigate = useNavigate();

    if(!id){
        navigate('/')
        return;
    }

    const { data:savedBlogData } = useQuery({
        queryKey:['singlePosted',token,id],
        queryFn: async()=>{
            try {
                const { data } = await axios.get(`${serverURL}/api/blogs/get/single/posted/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })

                const newData = {
                    cover: data.cover_img as string,
                    content:data.content as string,
                    timestamp:data.created_at as string,
                    title:data.title as string,
                    owner:data.owner as number
                }

                return newData
            } catch (error) {
                console.error(error)
            }
        }
    })

    useEffect(()=>{
        //get token
        getToken();
    },[])
    
    useEffect(()=>{
        if(!id){
            navigate('/')
            return;
        }
        
        const savedData = sessionStorage.getItem(`update_${id}`);

        if (savedData) {
            setLoading(true)
            try {
                const parsedData: PreviewData = JSON.parse(savedData);
                setData(parsedData);
                setLoading(false);
            } catch (error) {
                console.error('Error parsing saved data:', error);
            }
        }else if(!savedData && savedBlogData) {
            setData(savedBlogData);
        }
    },[id,token,savedBlogData])

    return (
        <div>
            <Tiptap
                id = {id}
                data = {data}
                loading = {loading}
                type = 'update'
            />
        </div>
    )
}

export default BlogEditor