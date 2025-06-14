import { createPortal } from "react-dom";
import NoteForm from "../NoteForm/NoteForm.tsx";
import css from "./NoteModal.module.css";

interface Props {
  onClose: () => void;
}

const NoteModal = ({ onClose }: Props) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onSuccess={onClose} onCancel={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;
