import React, { useRef, useState } from 'react';
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaCode, FaHeading, FaItalic, FaParagraph, FaRedo, FaStrikethrough, FaTrashAlt, FaUnderline, FaUndo, GoListOrdered, IoEyeSharp, IoSend, MdFormatListBulleted, RiCodeBlock, TbBlockquote, VscHorizontalRule } from '../../components/icons'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { BlogData } from '../../types/Data';

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

function Tiptap() {
    const editor = useEditor({
        extensions,
        content: '',
    });

    const coverRef = useRef<HTMLInputElement | null>(null);
    const [coverSrc, setCoverSrc] = useState<string>('');
    const [title, setTitle] = useState<string>('')
    const [isCoverChange, setCoverChange] = useState<boolean>(false);
    const [isCoverLoading, setLoading] = useState<boolean>(false);

    if (!editor) {
        return null;
    }

    const handleFileUpload = (fileRef: React.RefObject<HTMLInputElement>, setSrc:React.Dispatch<React.SetStateAction<string>>): void=>{
        const file = fileRef.current?.files?.[0];

            if(file){
                const reader = new FileReader();

                reader.onload = (e)=>{
                    setSrc(e.target?.result as string);
                    setCoverChange(true);
                    setLoading(false);
                }

                reader.readAsDataURL(file);
            }
    }

    const handleCoverChange = () =>{
        setLoading(true);
        handleFileUpload(coverRef, setCoverSrc);
    }

    const handleCancelCoverChange = () =>{
        coverRef.current = null;
        setCoverSrc('');
        setCoverChange(false);
    }

    const handleSubmit = () => {
        const editorContent = editor.getHTML(); // Get the editor's content as HTML

        const blog:BlogData = {
            cover:coverRef.current?.value,
            title:title,
            content:editorContent
        }

        console.log(blog)
    };

    // const handlePreview = ()=>{
        
    // }

    return (
        <div className="m-8">
            <div className="w-full flex flex-col">
                <div className='mb-5 w-full'>
                    {
                        isCoverChange ?
                        (
                            isCoverLoading ?
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
                                    <img 
                                        src={coverSrc}
                                        className='object-cover w-full h-full'
                                        loading='lazy'
                                    />
                                </div>
                            )
                        ):(
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                    />
                                </label>
                            </div> 
                        )
                    }
                </div>
                <div className='w-full mb-5'>
                    <input 
                        type='text' 
                        className='w-full border-x-0 border-t-0 text-3xl font-bold border-gray-300 focus:ring-transparent focus:border-darkCyan focus:placeholder:text-darkCyan'
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
            <div className="rounded-b-md border-[1px] border-gray-300 mt-5">
                <EditorContent editor={editor} className='prose w-full max-h-[19rem] overflow-y-auto p-2'/>
            </div>
            <div className='flex flex-row items-center justify-end gap-5 w-full'>
                <button
                    onClick={() => console.log(editor.getHTML())}
                    className="flex items-center gap-2 mt-4 px-4 py-2 rounded-sm border-[1px] border-gray-400 text-gray-500"
                >
                    <span>
                        <IoEyeSharp/>
                    </span>
                    Preview
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 mt-4 px-4 py-2 bg-green-500 text-white rounded-sm"
                >
                    <span>
                        <IoSend/>
                    </span>
                    Publish
                </button>
            </div>
        </div>
    );
}

export default Tiptap;