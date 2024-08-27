import { useEffect, useState } from 'react'
import { BlogLayout } from '../../components/links'
import { useParams } from 'react-router-dom'
import { PreviewData } from '../../types/Data';

function BlogPreview() {
    const {id} = useParams();

    const [data, setData] = useState<PreviewData | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const savedData = sessionStorage.getItem(`${id}`);

        if (savedData) {
            setLoading(true)
            try {
                const parsedData: PreviewData = JSON.parse(savedData);
                setData(parsedData);
                setLoading(false);
            } catch (error) {
                console.error('Error parsing saved data:', error);
            }
        }
    }, [id]);
    return (
        <section className='p-5'>
            <BlogLayout
                data = {data}
                loading = {loading}
                preview = {true}
            />
        </section>
    )
}

export default BlogPreview