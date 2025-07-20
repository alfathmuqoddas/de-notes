import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import { deleteNote } from "@/lib/firebaseQuery";
import useAuthStore from "@/store/useAuthStore";
import MarkdownView from "@/components/Input/MarkdownView";

export default function DetailNote() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleNavigate = (title: string, content: string, noteId: string) => {
    navigate(`edit`, {
      state: { title, content, noteId },
    });
  };

  const handleDeleteNote = async (userId: string, noteId: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    if (!userId || !noteId) return;

    try {
      await deleteNote(userId, noteId);
      alert("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error deleting note");
    }
  };

  const {
    title: noteTitle,
    content: noteContent,
    noteId,
  } = location.state as {
    noteId: string;
    title: string;
    content: string;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4 flex gap-2">
        <Button onClick={() => handleNavigate(noteTitle, noteContent, noteId)}>
          <Pencil />
          Edit Note
        </Button>
        <Button
          onClick={() =>
            handleDeleteNote(user?.uid || "", location.state.noteId)
          }
          variant="destructive"
        >
          <Trash />
          Delete Note
        </Button>
      </div>

      <h1 className="text-2xl font-bold">{noteTitle}</h1>
      <MarkdownView content={`${noteContent}`} />
    </div>
  );
}
