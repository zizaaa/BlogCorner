import { useNavigate, useParams } from 'react-router-dom';
import Tiptap from './Tiptap';
import { useEffect, useState } from 'react';
import { PreviewData } from '../../types/Data';
import { cookieStore } from '../../components/links';

function PostEditor() {
  const { id } = useParams();
  const { getToken } = cookieStore();

  const [data, setData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  if(!id){
    navigate('/')
    return;
  }

  useEffect(() => {

    if(!id){
        return navigate('/');
    }

    //get token
    getToken();

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
    }else {
      setData(null);
    }

}, [id]);

  return (
    <div>
      <Tiptap
        id = {id}
        data = {data}
        loading = {loading}
      />
    </div>
  );
}

export default PostEditor;