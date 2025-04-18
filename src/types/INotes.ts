export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}
