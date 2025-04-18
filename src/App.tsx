import useAuthStore from "./store/useAuthStore";
import useGetNotes from "./hooks/useGetNotes";
import { INote } from "./types/INotes";
import useSearchStore from "./store/useSearchStore";

const App = () => {
  const { user } = useAuthStore();
  const { searchTerm } = useSearchStore();

  if (!user) {
    return <div>Please Login</div>;
  }

  const notes = useGetNotes({ userId: user?.uid }) as INote[];

  if (notes.length === 0) {
    return <div>No notes found</div>;
  }

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notes</h1>
        <p className="text-sm">
          {notes.length} notes found for {user?.displayName}
        </p>
        <p className="font-bold">{searchTerm}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-xl shadow hover:shadow-md hover:cursor-pointer transtition-shadow ease-in-out duration-100 border border-gray-300 flex flex-col gap-4"
          >
            <div className="font-bold">{note.title}</div>
            <div>{note.content}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
