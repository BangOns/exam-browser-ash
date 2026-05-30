import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
}: PaginationProps) {
  const startItem = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  if (lastPage <= 1 && total <= perPage) {
    return (
      <div className="text-sm text-muted-foreground">
        Menampilkan {startItem} - {endItem} dari {total} data
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">
        Menampilkan <span className="font-medium">{startItem}</span> -{" "}
        <span className="font-medium">{endItem}</span> dari{" "}
        <span className="font-medium">{total}</span> data
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-md border disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-9 min-w-9 rounded-md border px-3 text-sm ${
              currentPage === page
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-md border disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
