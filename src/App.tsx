import useAuthStore from "./store/useAuthStore";
import useGetNotes from "./hooks/useGetNotes";
import { INote } from "./types/INotes";
import useSearchStore from "./store/useSearchStore";
import { useMemo } from "react";
import useDebounce from "./hooks/useDebounce";
import { useNavigate } from "react-router";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { formatRelativeTime } from "./lib/utils";

const App = () => {
  const { user } = useAuthStore();
  const { searchTerm } = useSearchStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();

  const { notes, loading, error } = useGetNotes({
    userId: user?.uid || null,
  }) as {
    notes: INote[];
    loading: boolean;
    error: any;
  };

  const filteredNotes = useMemo(() => {
    return notes?.filter((note) =>
      searchTerm
        ? note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
  }, [notes, debouncedSearchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  const handleNavigate = (noteId: string, title: string, content: string) => {
    navigate(`/details/${noteId}`, {
      state: { noteId, title, content },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="hidden md:block">
        <p
          className={`font-bold text-gray-700 ${
            !searchTerm ? "invisible" : ""
          }`}
        >
          Searching for: {searchTerm}
        </p>
      </div>

      <div>
        <Button onClick={() => navigate("/new")}>
          <Plus />
          Create Note
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => handleNavigate(note.id, note.title, note.content)}
            className={`p-4 rounded-xl shadow hover:shadow-md hover:cursor-pointer transition-shadow ease-in-out duration-100 flex flex-col gap-4 border border-gray-300 dark:bg-gray-800`}
          >
            <div className="font-bold">{note.title}</div>
            <div className="">{note.content}</div>
            <div>
              <p className="text-xs">{formatRelativeTime(note.createdAt)}</p>
              <p className="text-xs">
                Updated: {formatRelativeTime(note.updatedAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
