"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from '@tiptap/extension-image';
import { 
	BoldIcon, 
	ItalicIcon, 
} from "@heroicons/react/24/solid";
import {
	StrikethroughIcon,
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon
} from "@heroicons/react/24/outline";
import { Button, Card } from '@nextui-org/react';
import { borderColor } from "@/app/ui/style-variants/variables";

export default function Editor({ content, onUpdate, errors, name }:
     { content: string, onUpdate: (content: string) => void, errors: string[] | undefined, name: string }) {
	const editor = useEditor({
		extensions: [StarterKit, Image],
		content: content,
		editorProps: {
			attributes: {
				class: `prose min-h-[200px] focus:outline-none rounded p-2`,
				name: name,
			},
		},
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			console.log(editor.getHTML());
			onUpdate(editor.getHTML());
		},
	});

	// const addImage = () => {
	// 	const url = window.prompt('URL')
	// 	if (url) {
	// 		editor?.chain().focus().setImage({ src: url }).run()
	// 	}
	// }

	return (
		<Card className="button">
			<section className="flex flex-wrap gap-2 mb-4">
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
			</section>
			<EditorContent 
				editor={editor}
				className={`h-full min-h-[200px] border ${errors ? 'border-danger' : borderColor} rounded p-2`}
				onBlur={() => {
					if (editor?.isEmpty) {
						editor?.commands.clearContent();
					}
				}}
			/>
			{errors && <div className="text-danger text-xs mt-2">{errors}</div>}
		</Card>
	);
}
