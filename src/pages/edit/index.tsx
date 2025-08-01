import { useState } from "react";
import { useLocation } from "react-router";
import NotesInput from "@/components/Input/NotesInput";
import { Button } from "@/components/ui/button";
import { updateNote } from "@/lib/firebaseQuery";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownView from "@/components/Input/MarkdownView";

export default function EditNote() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const {
    title: noteTitle,
    content: noteContent,
    noteId,
  } = location.state as {
    noteId: string;
    title: string;
    content: string;
  };

  const [title, setTitle] = useState(noteTitle);
  const [content, setContent] = useState(noteContent);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    userId: string,
    noteId: string,
    title: string,
    content: string
  ) => {
    if (!userId || !noteId) return;
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await updateNote(userId, noteId, {
        title,
        content,
      });
      alert("Note updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error updating note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="edit">
      <TabsList className="mb-4">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="edit">Edit</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <MarkdownView content={`${content}`} />
      </TabsContent>
      <TabsContent value="edit">
        <div className="flex flex-col gap-4">
          <NotesInput
            title={title}
            content={content}
            onSetTitle={setTitle}
            onSetContent={setContent}
          />
          <div className="flex justify-end">
            <Button
              onClick={() =>
                handleSubmit(user?.uid || "", noteId, title, content)
              }
              disabled={loading || title.trim() === "" || content.trim() === ""}
            >
              Update Note
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
