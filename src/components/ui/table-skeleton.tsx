import { TableCell, TableRow } from "./table";

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(cols)].map((_, j) => (
            <TableCell key={j}>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
