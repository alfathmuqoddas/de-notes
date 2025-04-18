import useAuthStore from "./store/useAuthStore";
import useGetNotes from "./hooks/useGetNotes";
import { INote } from "./types/INotes";

const App = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Please Login</div>;
  }

  const notes = useGetNotes({ userId: user?.uid }) as INote[];

  if (notes.length === 0) {
    return <div>No notes found</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 rounded-xl border border-gray-500 flex flex-col gap-4"
        >
          <div className="font-bold">{note.title}</div>
          <div>{note.content}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
