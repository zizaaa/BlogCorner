import { useParams } from 'react-router-dom'
import { BlogLayout, cookieStore, fetchSingleBlog, PopularBlogs, ShareButtons } from '../../components/links'
import { useEffect } from 'react';

function ViewBlog() {
    const { getToken } = cookieStore();
    const { id } = useParams<{id:string}>();

    const { data,isLoading } = fetchSingleBlog(id as string)

    useEffect(()=>{
        const handleGetCookie = () =>{
            //get cookie
            getToken();
        }
        handleGetCookie();
    },[])

    if (isLoading || !data) {
        return null; // Return null while loading or navigating
    }

    const newData = {
        cover: data.cover_img,
        title:data.title,
        content:data.content,
        timestamp:data.created_at,
        owner:data.owner
    }
    return (
        <section className="flex flex-row max-[1000px]:flex-col">
            <article className='flex-1 p-5'>
                <BlogLayout
                    data = {newData}
                    loading = {isLoading}
                    preview = {false}
                    id = {id}
                />
            </article>
            <aside className="w-80 p-5 max-[1000px]:w-full">
                <ShareButtons
                    id={id}
                />
                <div>
                    <PopularBlogs/>
                </div>
            </aside>
        </section>
    )
}

export default ViewBlog