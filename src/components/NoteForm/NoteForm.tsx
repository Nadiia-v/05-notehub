import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { createNote } from "../../services/noteService.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import type { Note } from "../../types/note.ts";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required("Required"),
  content: Yup.string().max(500).required("Required"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});

const NoteForm = ({ onSuccess, onCancel }: Props) => {
  const queryClient = useQueryClient();
  type NotePayload = Omit<Note, "id">;
  const mutation = useMutation<Note, Error, NotePayload>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create a note");
    },
  });

  return (
    <Formik<NotePayload>
      initialValues={{ title: "", content: "", tag: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" className={css.input} />
          <FormikError name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            name="content"
            rows="8"
            className={css.textarea}
          />
          <FormikError name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field name="tag" as="select" className={css.select}>
            <option value="">Select tag</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <FormikError name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
