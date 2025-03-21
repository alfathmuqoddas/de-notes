import { getNotes } from "./lib/firebaseQuery";
import { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState<any>([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await getNotes("2lnJSGoI54hD6id55JTI");
        console.log(notes);
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello World</h1>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
};

export default App;
