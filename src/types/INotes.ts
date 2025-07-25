import { Timestamp } from "firebase/firestore";

export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
