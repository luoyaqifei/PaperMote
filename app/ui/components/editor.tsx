"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import UploadImage from "tiptap-extension-upload-image";
import "tiptap-extension-upload-image/dist/upload-image.min.css";
import StarterKit from "@tiptap/starter-kit";
import { BoldIcon, ItalicIcon } from "@heroicons/react/24/solid";
import {
  StrikethroughIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Button, Card } from "@nextui-org/react";
import { borderColor } from "@/app/ui/style-variants/variables";
import { uploadImage } from "@/app/lib/actions";

export default function Editor({
  content,
  onUpdate,
  errors,
  name,
}: {
  content: string;
  onUpdate: (content: string) => void;
  errors: string[] | undefined;
  name: string;
}) {
  const upLoadFn = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);
    return result?.secure_url || "";
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      UploadImage.configure({
        uploadFn: upLoadFn,
        // inline: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: `prose min-h-[200px] max-h-[500px] focus:outline-none rounded p-2`,
        name: name,
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onUpdate(editor.getHTML());
    },
  });

  return (
    <Card className="control-group">
      <section className="flex flex-wrap gap-2 m-4 button-group">
        <Button
          size="sm"
          className="w-8 h-8 flex m-0 p-0 min-w-0"
          startContent={<BoldIcon className="w-4 h-4" />}
          color={editor?.isActive("bold") ? "primary" : "default"}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        ></Button>
        <Button
          size="sm"
          className="w-8 h-8 flex m-0 p-0 min-w-0"
          startContent={<ItalicIcon className="w-4 h-4" />}
          color={editor?.isActive("italic") ? "primary" : "default"}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        ></Button>
        <Button
          size="sm"
          className="w-8 h-8 flex m-0 p-0 min-w-0"
          startContent={<StrikethroughIcon className="w-4 h-4" />}
          color={editor?.isActive("strike") ? "primary" : "default"}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        ></Button>
        <Button
          size="sm"
          className="w-8 h-8 flex m-0 p-0 min-w-0"
          startContent={<ArrowUturnLeftIcon className="w-4 h-4" />}
          onClick={() => editor?.chain().focus().undo().run()}
        ></Button>
        <Button
          size="sm"
          className="w-8 h-8 flex m-0 p-0 min-w-0"
          startContent={<ArrowUturnRightIcon className="w-4 h-4" />}
          onClick={() => editor?.chain().focus().redo().run()}
        ></Button>
        <Button
          size="sm"
          className="w-8 h-8 flex m-0 p-0 min-w-0"
          startContent={<PhotoIcon className="w-4 h-4" />}
          onClick={() => editor?.chain().focus().addImage().run()}
        ></Button>
        <Button
          size="sm"
          className="w-8 h-8 flex m-0 p-0 min-w-0 items-start justify-center"
          color={editor?.isActive("blockquote") ? "primary" : "default"}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <div className="w-4 h-4 text-xl font-bold">"</div>
        </Button>
      </section>
      <EditorContent
        editor={editor}
        className={`h-full min-h-[200px] border ${
          errors ? "border-danger" : borderColor
        } rounded p-2 max-w-full overflow-y-auto`}
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
