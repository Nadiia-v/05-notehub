import { useState } from "react";
import NoteList from "../NoteList/NoteList.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { useDebounce } from "../../hooks/useDebounce.ts";
import css from "./App.module.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <Pagination
          page={page}
          onPageChange={setPage}
          search={debouncedSearch}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <NoteList page={page} search={debouncedSearch} />

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
