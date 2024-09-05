import React, { useEffect, useRef, useState } from 'react';
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaCode, FaHeading, FaItalic, FaParagraph, FaRedo, FaStrikethrough, FaTrashAlt, FaUnderline, FaUndo, GoListOrdered, IoEyeSharp, IoSend, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6, MdFormatListBulleted, TbBlockquote, VscHorizontalRule } from '../../components/icons'
import { useEditor, EditorContent } from '@tiptap/react';
import { BlogData, PreviewData } from '../../types/Data';
import { cookieStore, errorToast, fetchUser, generateTimestamp, serverURL, Spinner, successToast } from '../../components/links';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TiptapProps } from '../../types/Props';

import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const extensions = [
    StarterKit,
    Heading,
    BulletList,
    OrderedList,
    CodeBlock,
    Blockquote,
    HorizontalRule,
    Underline,
    TextAlign.configure({
        types: ['paragraph'],
    }),
];

const Tiptap:React.FC<TiptapProps> = (props) => {
    const { token } = cookieStore();
    const coverRef = useRef<HTMLInputElement | null>(null);
    const [coverSrc, setCoverSrc] = useState<string>('');
    const [title, setTitle] = useState<string>('')
    const [isCoverChange, setCoverChange] = useState<boolean>(false);
    const [isCoverLoading, setLoading] = useState<boolean>(false);
    const [isNewCover, setNewCover] = useState<boolean>(false);


    const editor = useEditor({
        extensions,
    });

    const navigate = useNavigate();
    
    if (!editor) {
        return null;
    }

    const { data:userData } = fetchUser();

    const mutation = useMutation({
        mutationFn: async (formData: FormData): Promise<void> => {
            try {
                const {data} = await axios.post(`${serverURL}/api/blogs/post/blog`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization:`Bearer ${token}`
                    }
                });
                
                //remove values
                handleCancelCoverChange()
                setTitle('');
                editor.commands.setContent("");

                //toast
                successToast(`${data.message}`);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if(error.response?.data === 'Unauthorized'){
                        errorToast("Please log in");
                    }else{
                        errorToast(error.response?.data.message);
                    }
                } else {
                    errorToast('Something went wrong.');
                }
            }
        }
    });

    const updateMutation = useMutation({
        mutationFn: async(formData:FormData): Promise<void>=>{
            try {
                const { data } = await axios.put(`${serverURL}/api/blogs/update`,formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization:`Bearer ${token}`
                    }
                });

                //remove values
                handleCancelCoverChange()
                setTitle('');
                editor.commands.setContent("");

                //toast
                successToast(`${data.message}`);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if(error.response?.data === 'Unauthorized'){
                        errorToast("Please log in");
                    }else{
                        errorToast(error.response?.data.message);
                    }
                } else {
                    errorToast('Something went wrong.');
                }
            }
        }
    })

    //file upload
    const handleFileUpload = (fileRef: React.RefObject<HTMLInputElement>, setSrc:React.Dispatch<React.SetStateAction<string>>): void=>{
        const file = fileRef.current?.files?.[0];

            if(file){
                const reader = new FileReader();

                reader.onload = (e)=>{
                    setSrc(e.target?.result as string);
                    setLoading(false);
                }

                reader.readAsDataURL(file);

                setCoverChange(true);
                setNewCover(true);
            }
    }

    //add cover image
    const handleCoverChange = () =>{
        setLoading(true);
        handleFileUpload(coverRef, setCoverSrc);
    }

    // delete cover
    const handleCancelCoverChange = () =>{
        if(coverRef.current) {
            coverRef.current.value = ''; // Reset the input value
        }
        setCoverSrc('');
        setCoverChange(false);
        setNewCover(false);
    }

    // validate blog
    const isValidBlog = (blog:BlogData | PreviewData)=>{

        if(!blog.cover){
            errorToast('Please add your cover image or upload it again!');
            return false
        }

        if(!blog.title){
            errorToast('Please add your blog title!');
            return false
        }

        if(blog.title.length >= 100){
            errorToast('Your title is too long!');
            return false
        }

        if (!blog.content || blog.content.replace(/<[^>]*>/g, '').trim() === '') {
            errorToast('Please add your blog content!');
            return false;
        }        

        return true;
    }

    const handleSubmit = () => {
        const editorContent = editor.getHTML(); 
        

        const blog:BlogData = {
            cover: coverRef.current?.files ? coverRef.current.files[0] : null,
            title:title,
            content:editorContent
        }

        if (!isValidBlog(blog)) {
            return;
        }
        
        // send to db
        const formData = new FormData();
        if (blog.cover && blog.title && blog.content) {
            formData.append('title', blog.title);
            formData.append('cover', blog.cover);
            formData.append('content', blog.content);

            mutation.mutate(formData)
        }
    };

    const handlePreview = () => {
        const editorContent = editor.getHTML(); 
    
        const blog:PreviewData = {
            cover: coverSrc,
            title: title,
            content: editorContent,
            owner:userData.id,
            timestamp:generateTimestamp()
        };
        
        if (!isValidBlog(blog)) {
            return;
        }
    
        // Convert the blog object to a JSON string
        const blogJson = JSON.stringify(blog);
    
        // Save to session storage
        sessionStorage.setItem(`${props.id}`, blogJson);
        
        //navigate
        navigate(`/blog/preview/${props.id}/${props.type}`);
    };  

    //if blog is just to edit and already in db
    const handleUpdate = () =>{
        const editorContent = editor.getHTML(); 
        
        const blog:BlogData = {
            cover: coverRef.current?.files ? coverRef.current.files[0] : null,
            title:title,
            content:editorContent
        }

        if (!isValidBlog(blog)) {
            return;
        }
        
        // send to db
        const formData = new FormData();
        if (blog.cover && blog.title && blog.content && props.id) {
            formData.append('id', props.id);
            formData.append('title', blog.title);
            formData.append('cover', blog.cover);
            formData.append('content', blog.content);

            updateMutation.mutate(formData)
        }
    }
    const handlePreviewBlog = () =>{
        const editorContent = editor.getHTML(); 
    
        const blog:PreviewData = {
            cover: coverSrc,
            title: title,
            content: editorContent,
            owner:props.data?.owner as number,
            timestamp:generateTimestamp()
        };
        
        if (!isValidBlog(blog)) {
            return;
        }
        
        // Convert the blog object to a JSON string
        const blogJson = JSON.stringify(blog);
    
        // Save to session storage
        sessionStorage.setItem(`update_${props.id}`, blogJson);

        //navigate
        navigate(`/blog/preview/${props.id}/${props.type}`);
    }
    
    useEffect(()=>{
        if(props.data && editor && props.data.cover){
            setNewCover(false);
            //set cover change to true
            setCoverChange(true);
            // set cover
            setCoverSrc(props.type === 'update' ? props.data.cover:props.data.cover);
            //set title
            setTitle(props.data.title);
            //set content
            editor.commands.setContent(props.data.content);
        }else{
            editor.commands.setContent('');
        }
    },[props.id,props.loading,props.data])

    return (
        <div className="m-8">
            <Toaster />
            <div className="w-full flex flex-col">
                <div className='mb-5 w-full'>
                    {
                        isCoverChange ?
                        (
                            isCoverLoading || props.loading ?
                            (
                                <div role="status" className="animate-pulse">
                                    <div className="flex items-center justify-center w-full h-56 bg-gray-300 rounded">
                                        <svg className="w-full h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                        </svg>
                                    </div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ):(
                                <div className='group flex items-center justify-center w-full h-56 relative'>
                                    <div className='absolute z-10 scale-0 group-hover:scale-100 transition-all duration-300'>
                                        <button onClick={handleCancelCoverChange} className='text-red-500 rounded-full p-4 bg-[#ffffff95] text-2xl'>
                                            <FaTrashAlt/>
                                        </button>
                                    </div>
                                    <div className='absolute top-0 right-0 bottom-0 left-0 backdrop-blur-none group-hover:backdrop-blur-lg transition-all duration-300 bg-transparent group-hover:bg-[#21202048]'></div>
                                    {
                                        isNewCover ?
                                        (
                                            <img 
                                                src={coverSrc}
                                                className='object-contain w-full h-full bg-[#FFFF]'
                                                loading='lazy'
                                            />
                                        ):(
                                            <img 
                                                src={props.type === 'update' ? `${serverURL}/${coverSrc}`:coverSrc}
                                                className='object-contain w-full h-full bg-[#FFFF]'
                                                loading='lazy'
                                            />
                                        )
                                    }
                                </div>
                            )
                        ):(null)
                    }
                    <div className={`flex items-center justify-center w-full ${isCoverChange ? 'hidden':'block'}`}>
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            </div>
                            <input 
                                id="dropzone-file" 
                                type="file" 
                                className="hidden" 
                                onChange={handleCoverChange}
                                ref={coverRef}
                                accept="image/png, image/jpeg"
                            />
                        </label>
                    </div> 
                </div>
                <div className='w-full mb-5'>
                    <input 
                        type='text' 
                        className='w-full border-x-0 border-t-0 text-3xl font-bold border-gray-300 bg-white focus:ring-transparent focus:border-darkCyan focus:placeholder:text-darkCyan'
                        placeholder='Title'
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                    />
                </div>
                <div>
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.can().chain().focus().undo().run() ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                        disabled={!editor.can().chain().focus().undo().run()}
                    >
                        <FaUndo />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.can().chain().focus().redo().run() ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                        disabled={!editor.can().chain().focus().redo().run()}
                    >
                        <FaRedo />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('bold') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaBold/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('italic') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaItalic/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('underline') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaUnderline />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('strike') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaStrikethrough/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('paragraph') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaParagraph/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('heading', { level: 1 }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaHeading/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('heading', { level: 2 }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <LuHeading2/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('heading', { level: 3 }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <LuHeading3/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('heading', { level: 4 }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <LuHeading4/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('heading', { level: 5 }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <LuHeading5/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('heading', { level: 6 }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <LuHeading6/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('bulletList') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <MdFormatListBulleted/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('orderedList') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <GoListOrdered/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('codeBlock') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaCode/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('blockquote') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <TbBlockquote/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive('horizontalRule') ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <VscHorizontalRule/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive({ textAlign: 'left' }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaAlignLeft />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive({ textAlign: 'center' }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaAlignCenter />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`p-2 text-lg mx-1 hover:bg-[#4d99bc33] ${editor.isActive({ textAlign: 'right' }) ? 'text-darkCyan bg-[#4d99bc33]' : 'text-gray-500'}`}
                    >
                        <FaAlignRight />
                    </button>
                </div>
        </div>
            <div className="mt-5">
                <EditorContent editor={editor} className='prose w-full max-h-[19rem] overflow-y-auto p-2'/>
            </div>
            <div className='flex flex-row items-center justify-end gap-5 w-full'>
                {
                    props.type === 'update' ?
                    (
                        <>
                            <button
                                onClick={handlePreviewBlog}
                                className="flex items-center gap-2 mt-4 px-4 py-2 rounded-sm border-[1px] border-gray-400 text-gray-500"
                            >
                                <span>
                                    <IoEyeSharp/>
                                </span>
                                Preview
                            </button>
                            <button
                                onClick={handleUpdate}
                                className={`flex items-center justify-center gap-2 mt-4 w-28 py-2 bg-green-500 text-white rounded-sm ${mutation.isPending ? 'cursor-not-allowed':'cursor-pointer'}`}
                                disabled={updateMutation.isPending}
                            >
                                {
                                    updateMutation.isPending ?
                                    (
                                        Spinner({textColor:'#FFFFFF',fillColor:'#000000'})
                                    ):(
                                        <>
                                            <span>
                                                <IoSend/>
                                            </span>
                                            Update
                                        </>
                                    )
                                }
                            </button>
                        </>
                    ):(
                        <>
                            <button
                                onClick={handlePreview}
                                className="flex items-center gap-2 mt-4 px-4 py-2 rounded-sm border-[1px] border-gray-400 text-gray-500"
                            >
                                <span>
                                    <IoEyeSharp/>
                                </span>
                                Preview
                            </button>
                            <button
                                onClick={handleSubmit}
                                className={`flex items-center justify-center gap-2 mt-4 w-28 py-2 bg-green-500 text-white rounded-sm ${mutation.isPending ? 'cursor-not-allowed':'cursor-pointer'}`}
                                disabled={mutation.isPending}
                            >
                                {
                                    mutation.isPending ?
                                    (
                                        Spinner({textColor:'#FFFFFF',fillColor:'#000000'})
                                    ):(
                                        <>
                                            <span>
                                                <IoSend/>
                                            </span>
                                            Publish
                                        </>
                                    )
                                }
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Tiptap;