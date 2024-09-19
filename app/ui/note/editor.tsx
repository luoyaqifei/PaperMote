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
import { Button, Card } from '@nextui-org/react';

export default function Editor({ content, onUpdate }: { content: string, onUpdate: (content: string) => void }) {
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
			<div className="flex gap-2 mb-4">
				<Button
					size="sm"
					color={editor?.isActive('bold') ? 'primary' : 'default'}
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
					Bold
				</Button>
				{/* Add more formatting buttons here */}
			</div>
			<div className="prose max-w-none h-64 overflow-y-auto">
				<EditorContent editor={editor} className="h-full min-h-[200px] border border-teal-200 rounded p-2" />
			</div>
		</Card>
	);
}
