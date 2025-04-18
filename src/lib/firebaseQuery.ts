import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export const getNotes = async (userId: string) => {
  try {
    const q = query(
      collection(db, "notesByUserId", userId, "notes"),
      orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(q);
    let notes: {
      id: string;
      title: string;
      content: string;
      createdAt: any;
      updatedAt: any;
    }[] = [];
    querySnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() } as {
        id: string;
        title: string;
        content: string;
        createdAt: any;
        updatedAt: any;
      });
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

export const addNotes = async (userId: string, payload: any) => {
  try {
    const notesRef = doc(db, "notesByUserId", userId);
    await updateDoc(notesRef, {
      notes: arrayUnion(payload),
    });
    console.log("Notes added successfully");
  } catch (error) {
    console.error(error);
  }
};

export const updateNote = async (
  userId: string,
  noteId: string,
  updatedNote: any
) => {
  try {
    const userRef = doc(db, "notesByUserId", userId);

    // Fetch current notes array
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      console.error("User document not found!");
      return;
    }

    const notes = userSnap.data().notes || [];

    // Find and update the specific note
    const updatedNotes = notes.map((note: any) =>
      note.id === noteId ? { ...note, ...updatedNote } : note
    );

    // Update Firestore document with new notes array
    await updateDoc(userRef, { notes: updatedNotes });

    console.log("Note updated successfully!");
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

export const deleteNote = async (userId: string, noteId: string) => {
  try {
    const userRef = doc(db, "notesByUserId", userId);

    // Fetch current notes array
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      console.error("User document not found!");
      return;
    }

    const notes = userSnap.data().notes || [];

    // Find and remove the specific note
    const updatedNotes = notes.filter((note: any) => note.id !== noteId);

    // Update Firestore document with new notes array
    await updateDoc(userRef, { notes: updatedNotes });

    console.log("Note deleted successfully!");
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
