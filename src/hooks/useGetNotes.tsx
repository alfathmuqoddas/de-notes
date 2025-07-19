import { useState, useEffect } from "react";
import { getNotes } from "../lib/firebaseQuery";

const useGetNotes = ({ userId }: { userId: string | null }) => {
  const [notes, setNotes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!userId) return;
        const notes = await getNotes(userId || "");
        console.log(notes);
        setNotes(notes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return { notes, loading, error };
};

export default useGetNotes;
