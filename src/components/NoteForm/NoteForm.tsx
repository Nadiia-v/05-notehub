import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNote } from "../../services/noteService.ts";
import css from "./NoteForm.module.css";

const validationSchema = Yup.object({
  title: Yup.string().min(3).required(),
  content: Yup.string(),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});

type Props = {
  onSuccess: () => void;
};
type NoteFormValues = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

const NoteForm = ({ onSuccess }: Props) => {
  return (
    <Formik<NoteFormValues>
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await createNote(values);
        resetForm();
        onSuccess();
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <Field name="content" as="textarea" className={css.input} />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div>
          <label htmlFor="tag">Tag</label>
          <Field name="tag" as="select" className={css.input}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <button type="submit" className={css.submitButton}>
          Add
        </button>
      </Form>
    </Formik>
  );
};

export default NoteForm;
