import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function NotesInput({
  title,
  content,
  onSetContent,
  onSetTitle,
}: {
  title: string;
  content: string;
  onSetContent: (content: string) => void;
  onSetTitle: (title: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="title">
          Title
        </label>
        <Input
          placeholder="title"
          value={title}
          onChange={(e) => onSetTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="content">
          Content
        </label>
        <Textarea
          placeholder="content"
          value={content}
          onChange={(e) => onSetContent(e.target.value)}
        />
      </div>
    </div>
  );
}
