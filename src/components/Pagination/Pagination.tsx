import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService.ts";
import css from "./Pagination.module.css";

interface Props {
  page: number;
  onPageChange: (selected: number) => void;
  search: string;
}

const Pagination = ({ page, onPageChange, search }: Props) => {
  const { data } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, 6, search),
  });

  if (!data || data.totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={data.totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.container}
      activeClassName={css.active}
      pageClassName={css.page}
      previousLabel="<"
      nextLabel=">"
    />
  );
};

export default Pagination;
