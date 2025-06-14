import axios from "axios";
import type { Note, FetchNotesResponse } from "../types/note.ts";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export const fetchNotes = (page: number, search?: string) => {
  const params: { page: number; perPage: number; search?: string } = {
    page,
    perPage: 10,
  };
  if (search) params.search = search;
  return API.get<FetchNotesResponse>("/notes", { params }).then((r) => r.data);
};

type NoteInput = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};
export const createNote = (data: NoteInput) => {
  return API.post<Note>("/notes", data).then((r) => r.data);
};

export const deleteNote = (id: string) => {
  return API.delete<Note>(`/notes/${id}`).then((r) => r.data);
};
