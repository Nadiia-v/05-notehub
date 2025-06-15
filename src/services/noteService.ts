import axios from "axios";
import type { Note } from "../types/note.ts";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export const fetchNotes = (search: string, page: number) => {
  const params: { search: string; page: number; perPage: number } = {
    search,
    page,
    perPage: 10,
  };
  return API.get<{ results: Note[]; totalPages: number }>("/notes", {
    params,
  }).then((r) => r.data);
};

type NoteInput = {
  title: string;
  content: string;
  tag: string;
};
export const createNote = (data: NoteInput) => {
  return API.post<Note>("/notes", data).then((r) => r.data);
};

export const deleteNote = (id: number) => {
  return API.delete<Note>(`/notes/${id}`).then((r) => r.data);
};
