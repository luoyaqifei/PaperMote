"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from '@tiptap/extension-image';
import { 
	BoldIcon, 
	ItalicIcon, 
	QrCodeIcon
} from "@heroicons/react/24/solid";
import {
	StrikethroughIcon,
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon
} from "@heroicons/react/24/outline";

export default function Editor({ content, onUpdate }: { content: string, onUpdate: (content: string) => void }) {



  const editor = useEditor({
    extensions: [StarterKit, Image],
		content: content,
		immediatelyRender: true,
		onUpdate: ({ editor }) => {
			onUpdate(editor.getHTML());
		},
	});
    const addImage = () => {
        const url = window.prompt('URL')
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      }
	return (
		<>
			<div className="flex flex-wrap gap-2 mb-4">
            <button onClick={addImage}>Add image from URL</button>

				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("bold")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} disabled:opacity-50`}
				>
					<BoldIcon className="w-5 h-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("italic")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} disabled:opacity-50`}
				>
					<ItalicIcon className="w-5 h-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("strike")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} disabled:opacity-50`}
				>
					<StrikethroughIcon className="w-5 h-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleCode().run()}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("code")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} disabled:opacity-50`}
				>
					<QrCodeIcon className="w-5 h-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().unsetAllMarks().run()}
					className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
				>
					Clear marks
				</button>
				<button
					onClick={() => editor.chain().focus().clearNodes().run()}
					className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
				>
					Clear nodes
				</button>
				<button
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("paragraph")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					Paragraph
				</button>
				{[1, 2, 3, 4, 5, 6].map((level) => (
					<button
						key={level}
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()
						}
						className={`px-3 py-1 rounded ${
							editor.isActive("heading", { level })
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
					>
						H{level}
					</button>
				))}
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("bulletList")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					Bullet list
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("orderedList")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					Ordered list
				</button>
				<button
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("codeBlock")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					Code block
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={`px-3 py-1 rounded ${
						editor.isActive("blockquote")
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					Blockquote
				</button>
				<button
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
					className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
				>
					Horizontal rule
				</button>
				<button
					onClick={() => editor.chain().focus().setHardBreak().run()}
					className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
				>
					Hard break
				</button>
				<button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
				>
					<ArrowUturnLeftIcon className="w-5 h-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
				>
					<ArrowUturnRightIcon className="w-5 h-5" />
				</button>
			</div>
			<EditorContent editor={editor} className="prose max-w-none h-64 overflow-y-auto" />
		</>
	);
}
