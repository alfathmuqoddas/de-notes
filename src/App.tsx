import useAuthStore from "./store/useAuthStore";
import useGetNotes from "./hooks/useGetNotes";
import { INote } from "./types/INotes";
import useSearchStore from "./store/useSearchStore";
import { useState, useMemo } from "react";
import useDebounce from "./hooks/useDebounce";
import { CircleCheck } from "lucide-react";

const App = () => {
  const [selectedNotes, setSelectedNotes] = useState<INote[]>([]);
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuthStore();
  const { searchTerm } = useSearchStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  if (!user) {
    return <div>Please Login</div>;
  }

  const { notes, loading, error } = useGetNotes({ userId: user?.uid }) as {
    notes: INote[];
    loading: boolean;
    error: any;
  };

  //function to check whete the notes are selected
  const isSelected = (note: INote) => {
    return selectedNotes.some((selectedNote) => selectedNote.id === note.id);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      searchTerm
        ? note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
  }, [notes, debouncedSearchTerm]);

  if (notes.length === 0) {
    return <div>No notes found</div>;
  }

  //function to toggle edit mode, when the toggle is o the notes are selectable
  const handleToggleEditMode = () => {
    if (editMode) {
      setSelectedNotes([]);
    }
    setEditMode(!editMode);
  };

  // Function to select or deselect notes
  const toggleNoteSelection = (notes: INote[]) => {
    if (!editMode) return;

    setSelectedNotes((prevSelected) => {
      const noteIdsToToggle = notes.map((n) => n.id);
      const isAllSelected = notes.every((note) =>
        prevSelected.some((sel) => sel.id === note.id)
      );

      if (isAllSelected) {
        // Deselect notes that are already selected
        return prevSelected.filter(
          (note) => !noteIdsToToggle.includes(note.id)
        );
      } else {
        // Add notes that aren't selected
        const newNotes = notes.filter(
          (note) => !prevSelected.some((sel) => sel.id === note.id)
        );
        return [...prevSelected, ...newNotes];
      }
    });
  };

  console.log({ selectedNotes });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          {searchTerm && (
            <p className="font-bold text-gray-700">
              Searching for: {searchTerm}
            </p>
          )}
        </div>
        <button
          onClick={handleToggleEditMode}
          className={`px-4 py-2 rounded-md text-white ${
            editMode
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } transition-colors duration-200`}
        >
          {editMode ? "Cancel Selection" : "Select Notes"}
        </button>
      </div>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => toggleNoteSelection([note])}
              className={`p-4 rounded-xl shadow hover:shadow-md hover:cursor-pointer transition-shadow ease-in-out duration-100 flex flex-col gap-4 ${
                isSelected(note)
                  ? "bg-blue-100 border-blue-500 border-2"
                  : "border border-gray-300"
              }`}
            >
              <div className="font-bold">{note.title}</div>
              <div className="text-gray-700">{note.content}</div>
              <p className="text-xs text-gray-500">ID: {note.id}</p>
            </div>
          ))}
        </div>
      )}
      {editMode && selectedNotes.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-4 border-t border-gray-200 flex justify-end gap-4">
          <p className="text-gray-700">{selectedNotes.length} notes selected</p>
          <button className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-200">
            Delete Selected
          </button>
          <button className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors duration-200">
            Archive Selected
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
