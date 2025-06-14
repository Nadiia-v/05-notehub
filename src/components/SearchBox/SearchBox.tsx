import css from "./SearchBox.module.css";

type Props = {
  search: string;
  setSearch: (val: string) => void;
};

const SearchBox = ({ search, setSearch }: Props) => (
  <input
    className={css.input}
    type="text"
    placeholder="Search notes"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
);

export default SearchBox;
