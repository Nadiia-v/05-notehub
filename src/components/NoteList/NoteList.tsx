import type { Note } from "../../types/note.ts";
import css from "./NoteList.module.css";

type Props = {
  notes: Note[];
  onDelete: (id: string) => void;
};

const NoteList = ({ notes, onDelete }: Props) => (
  <ul className={css.list}>
    {notes.map((note) => (
      <li key={note.id} className={css.listItem}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
        <button className={css.button} onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default NoteList;
