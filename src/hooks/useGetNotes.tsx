import { useState, useEffect } from "react";
import { getNotes } from "../lib/firebaseQuery";

const useGetNotes = ({ userId }: { userId: string }) => {
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await getNotes(userId || "");
        console.log(notes);
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);

  return notes;
};

export default useGetNotes;
