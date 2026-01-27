import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Undo,
  Redo,
  RemoveFormatting,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    active,
    children,
    className,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-1.5 rounded hover:bg-muted transition-colors",
        active && "bg-muted text-primary",
        className
      )}
    >
      {children}
    </button>
  );

  const handleAddLink = () => {
    const url = prompt("输入链接地址:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleAddImage = () => {
    const url = prompt("输入图片地址:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Menu Bar */}
      <div className="border-b border-border bg-muted/30 px-2 py-1 flex items-center gap-4 text-sm text-muted-foreground">
        <span>文件</span>
        <span>编辑</span>
        <span>视图</span>
        <span>插入</span>
        <span>格式</span>
        <span>工具</span>
        <span>表格</span>
        <span>帮助</span>
      </div>
      
      {/* Toolbar */}
      <div className="border-b border-border bg-card px-2 py-1 flex items-center gap-1 flex-wrap">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </ToolbarButton>
        
        <div className="w-px h-5 bg-border mx-1" />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        
        <div className="flex items-center">
          <div className="w-4 h-4 bg-foreground" />
          <ChevronDown className="h-3 w-3" />
        </div>
        
        <div className="w-px h-5 bg-border mx-1" />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          active={editor.isActive({ textAlign: "justify" })}
        >
          <AlignJustify className="h-4 w-4" />
        </ToolbarButton>
        
        <div className="w-px h-5 bg-border mx-1" />
        
        <ToolbarButton onClick={handleAddLink}>
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={handleAddImage}>
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => {}}>
          <Video className="h-4 w-4" />
        </ToolbarButton>
        
        <div className="w-px h-5 bg-border mx-1" />
        
        <div className="flex items-center">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ChevronDown className="h-3 w-3" />
        </div>
        
        <div className="flex items-center">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ChevronDown className="h-3 w-3" />
        </div>
        
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        
        <div className="w-px h-5 bg-border mx-1" />
        
        <ToolbarButton onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <RemoveFormatting className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton onClick={() => {}}>
          <HelpCircle className="h-4 w-4" />
        </ToolbarButton>
      </div>
      
      {/* Editor Content */}
      <EditorContent editor={editor} className="tiptap-editor bg-card" />
    </div>
  );
}
