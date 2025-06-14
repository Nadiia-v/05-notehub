import css from "./SearchBox.module.css";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SearchBox = ({ value, onChange }: Props) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBox;
