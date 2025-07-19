import {
  collection,
  query,
  // where,
  getDocs,
  doc,
  setDoc,
  orderBy,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { INote } from "@/types/INotes";

export const getNotes = async (userId: string) => {
  try {
    const q = query(
      collection(db, "notesByUserId", userId, "notes"),
      orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(q);
    let notes: INote[] = [];
    querySnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() } as INote);
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

// Writes a new note to Firestore, generating a new ID for it.
export const addNote = async (
  userId: string,
  note: Omit<INote, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const notesCollectionRef = collection(db, `notesByUserId/${userId}/notes`);
    const docRef = await addDoc(notesCollectionRef, {
      ...note,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("Note added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

// Writes or updates a note in Firestore with a specific note ID.
export const setNotes = async (
  userId: string,
  noteId: string,
  note: Omit<INote, "id" | "updatedAt">
): Promise<string> => {
  if (!userId || !noteId) {
    throw new Error("User ID and Note ID are required to set a note.");
  }

  try {
    const noteDocRef = doc(db, `notesByUserId/${userId}/notes/${noteId}`);
    await setDoc(
      noteDocRef,
      {
        ...note,
        createdAt: note.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("Note updated successfully!");
    return noteDocRef.id;
  } catch (error) {
    console.error(`Error updating note ${noteId}:`, error);
    throw error;
  }
};

export const updateNote = async (
  userId: string,
  noteId: string,
  updates: Partial<Omit<INote, "id" | "createdAt">>
): Promise<string> => {
  if (!userId || !noteId) {
    throw new Error("User ID and Note ID are required to update a note.");
  }
  try {
    const noteDocRef = doc(db, `notesByUserId/${userId}/notes/${noteId}`);
    await setDoc(
      noteDocRef,
      {
        ...updates,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`Note ${noteId} updated successfully!`);
    return noteDocRef.id;
  } catch (error) {
    console.error(`Error updating note ${noteId}:`, error);
    throw error;
  }
};

export const deleteNote = async (
  userId: string,
  noteId: string
): Promise<void> => {
  if (!userId || !noteId) {
    throw new Error("User ID and Note ID are required to delete a note.");
  }
  try {
    const noteDocRef = doc(db, `notesByUserId/${userId}/notes/${noteId}`);

    await deleteDoc(noteDocRef);
    console.log(`Note ${noteId} successfully deleted.`);
  } catch (error) {
    console.error(`Error deleting note ${noteId}:`, error);
    throw error;
  }
};
