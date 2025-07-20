import { useState } from "react";
import NotesInput from "@/components/Input/NotesInput";
import { Button } from "@/components/ui/button";
import { addNote } from "@/lib/firebaseQuery";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import MarkdownView from "@/components/Input/MarkdownView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (title: string, content: string) => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      await addNote(user?.uid || "", {
        title,
        content,
      });
      alert("Note created successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error creating note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <div>
              <Button
                onClick={() => handleSubmit(title, content)}
                disabled={
                  loading || title.trim() === "" || content.trim() === ""
                }
              >
                Create Note
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
