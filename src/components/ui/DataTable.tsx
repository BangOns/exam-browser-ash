type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TableSkeleton } from "./table-skeleton";

export default function DataTable<T>({
  columns,
  data,
  title,
  action,
  className,
  isLoading,
}: {
  columns: Column<T>[];
  data: T[];
  title?: string;
  action?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <Card
      className={`rounded-2xl border bg-white/50 backdrop-blur-sm shadow-sm  animate-slide-up ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100/50">
          {title && (
            <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && !data.length ? (
              <TableSkeleton />
            ) : (
              data.map((row, idx) => (
                <TableRow key={idx}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(row)
                        : ((row[col.key as keyof T] as React.ReactNode) ?? "—")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-400"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
