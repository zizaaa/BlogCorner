import { useQuery } from "@tanstack/react-query"
import { BookMarked, LoadingBlogCard, serverURL } from "../../components/links"
import axios from "axios"
import Cookies from 'js-cookie'
import { SavedDataProps } from "../../types/Props"

function Bookmark() {

    const { data, isLoading,refetch } = useQuery({
        queryKey:['bookmarked'],
        queryFn: async()=>{
            const token = Cookies.get('token')
            try {
                const { data } = await axios.get(`${serverURL}/api/bookmark/get/bookmarked`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });

                return data
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <article className="p-2 w-full flex flex-col gap-2">
            {
                isLoading ?
                (
                    <LoadingBlogCard/>
                ):(
                    data && data.length > 0 ?
                    (
                        data.map((saved:SavedDataProps)=>(
                            <BookMarked
                                data = {saved}
                                refetch = {refetch}
                                key={saved.id}
                            />
                        ))
                    ):(
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-sm font-medium text-gray-400">No bookmarks</p>
                        </div>
                    )
                )
            }
        </article>
    )
}

export default Bookmark