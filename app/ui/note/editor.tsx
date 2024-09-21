"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from '@tiptap/extension-image';
import { 
	BoldIcon, 
	ItalicIcon, 
	PhotoIcon
} from "@heroicons/react/24/solid";
import {
	StrikethroughIcon,
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon
} from "@heroicons/react/24/outline";
import { Button, Card } from '@nextui-org/react';

export default function Editor({ content, onUpdate }:
     { content: string, onUpdate: (content: string) => void }) {
	const editor = useEditor({
		extensions: [StarterKit, Image],
		content: content,
		editorProps: {
			attributes: {
				class: 'prose focus:outline-none',
			},
		},
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			onUpdate(editor.getHTML());
		},
	});

	const addImage = () => {
		const url = window.prompt('URL')
		if (url) {
			editor?.chain().focus().setImage({ src: url }).run()
		}
	}

	return (
		<Card className="p-4 bg-white shadow-md">
			<div className="flex flex-wrap gap-2 mb-4">
				<Button
					size="sm"
                    startContent={<BoldIcon className="w-4 h-4" />}
					color={editor?.isActive('bold') ? 'primary' : 'default'}
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
				</Button>
				<Button
					size="sm"
                    startContent={<ItalicIcon className="w-4 h-4" />}
					color={editor?.isActive('italic') ? 'primary' : 'default'}
					onClick={() => editor?.chain().focus().toggleItalic().run()}
				>
				</Button>
				<Button
					size="sm"
                    startContent={<StrikethroughIcon className="w-4 h-4" />}
					color={editor?.isActive('strike') ? 'primary' : 'default'}
					onClick={() => editor?.chain().focus().toggleStrike().run()}
				>
				</Button>
				<Button
					size="sm"
                    startContent={<ArrowUturnLeftIcon className="w-4 h-4" />}
					onClick={() => editor?.chain().focus().undo().run()}
				>
				</Button>
				<Button
					size="sm"
                    startContent={<ArrowUturnRightIcon className="w-4 h-4" />}
					onClick={() => editor?.chain().focus().redo().run()}
				>
				</Button>
			</div>
			<div className="prose max-w-none h-64 overflow-y-auto">
				<EditorContent editor={editor} className="h-full min-h-[200px] border border-teal-200 rounded p-2" />
			</div>
		</Card>
	);
}
