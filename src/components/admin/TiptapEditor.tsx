"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from "@tiptap/extension-code-block";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Code } from "lucide-react";

interface TiptapEditorProps {
  onContentChange: (content: string) => void;
  initialContent?: string;
}

const TiptapEditor = ({ onContentChange, initialContent = "" }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 rounded-md p-4 font-mono text-sm',
        },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Editor Toolbar */}
      <div className="px-4 py-2 border-b border-gray-200 flex items-center gap-1 bg-white">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor?.isActive('bold') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor?.isActive('italic') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor?.isActive('bulletList') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor?.isActive('orderedList') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor?.isActive('codeBlock') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
          }`}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) {
              editor?.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor?.isActive('link') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
          }`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter image URL');
            if (url) {
              editor?.chain().focus().setImage({ src: url }).run();
            }
          }}
          className={`p-2 rounded hover:bg-gray-100 transition-colors`}
          title="Add Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] bg-white">
        <EditorContent 
          editor={editor} 
          className="prose max-w-none p-4 min-h-full focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
