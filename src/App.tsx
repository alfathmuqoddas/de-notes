import useAuthStore from "./store/useAuthStore";
import useGetNotes from "./hooks/useGetNotes";
import { INote } from "./types/INotes";
import useSearchStore from "./store/useSearchStore";
import { useMemo } from "react";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const { user } = useAuthStore();
  const { searchTerm } = useSearchStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { notes, loading, error } = useGetNotes({
    userId: user?.uid || null,
  }) as {
    notes: INote[];
    loading: boolean;
    error: any;
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      searchTerm
        ? note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
  }, [notes, debouncedSearchTerm]);

  if (!user) {
    return <div>Please Login</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  if (notes.length === 0) {
    return <div>No notes found</div>;
  }

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <p
          className={`font-bold text-gray-700 ${
            !searchTerm ? "invisible" : ""
          }`}
        >
          Searching for: {searchTerm}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-xl shadow hover:shadow-md hover:cursor-pointer transition-shadow ease-in-out duration-100 flex flex-col gap-4 border border-gray-300`}
          >
            <div className="font-bold">{note.title}</div>
            <div className="text-gray-700">{note.content}</div>
            <p className="text-xs text-gray-500">ID: {note.id}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
