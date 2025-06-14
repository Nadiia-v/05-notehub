import { createPortal } from "react-dom";
import NoteForm from "../NoteForm/NoteForm.tsx";
import css from "./NoteModal.module.css";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const NoteModal = ({ onClose, onSuccess }: Props) => {
  return createPortal(
    <div className={css.backdrop} onClick={onClose} role="dialog">
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <NoteForm onSuccess={onSuccess} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;
