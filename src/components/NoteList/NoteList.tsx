import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService.ts";
import { toast } from "react-hot-toast";
import css from "./NoteList.module.css";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

interface Props {
  page: number;
  search: string;
}

const NoteList = ({ page, search }: Props) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, 6, search),
    placeholderData: (previousData) => previousData,
  });

  if (isError) {
    toast.error("Failed to load notes. Try again later");
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted");
    } catch {
      toast.error("Error deleting note");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  if (!data?.results.length) return null;

  return (
    <ul className={css.list}>
      {data.results.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
