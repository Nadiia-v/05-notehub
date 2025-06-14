import axios from "axios";
import type { Note, FetchNotesResponse } from "../types/note";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string
): Promise<FetchNotesResponse> => {
  const { data } = await API.get(`/notes`, {
    params: { page, perPage, search },
  });
  return data;
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const { data } = await API.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await API.delete(`/notes/${id}`);
  return data;
};
