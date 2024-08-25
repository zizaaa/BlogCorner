import React from 'react';
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaCode, FaHeading, FaItalic, FaParagraph, FaStrikethrough, FaUnderline, GoListOrdered, MdFormatListBulleted, RiCodeBlock, TbBlockquote, VscHorizontalRule } from '../../components/icons'
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

    if (!editor) {
        return null;
    }

    const handleSubmit = () => {
        const editorContent = editor.getHTML(); // Get the editor's content as HTML
        console.log('Editor Content:', editorContent);
    };

    return (
        <div className="m-8">
            <div className="w-full flex flex-wrap p-3 gap-2 rounded-t-md text-white bg-gray-600">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('bold') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaBold/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('italic') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaItalic/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('underline') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaUnderline />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('strike') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaStrikethrough/>
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('paragraph') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaParagraph/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaHeading/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('bulletList') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <MdFormatListBulleted/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('orderedList') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <GoListOrdered/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('codeBlock') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaCode/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive('blockquote') ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <TbBlockquote/>
                </button>
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="px-3 py-1 rounded-sm bg-gray-400"
                >
                    <VscHorizontalRule/>
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive({ textAlign: 'left' }) ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaAlignLeft />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive({ textAlign: 'center' }) ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaAlignCenter />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`px-3 py-1 rounded-sm ${editor.isActive({ textAlign: 'right' }) ? 'bg-darkCyan text-white' : 'bg-gray-400'}`}
                >
                    <FaAlignRight />
                </button>
        </div>
            <div className="rounded-b-md border-[1px] border-gray-300">
                <EditorContent editor={editor} className='prose w-full max-h-96 overflow-y-auto p-2'/>
            </div>
            <button
                onClick={() => console.log(editor.getHTML())}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-sm"
            >
                Get Content
            </button>
        </div>
    );
}

export default Tiptap;