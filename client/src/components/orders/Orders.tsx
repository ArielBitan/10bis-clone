import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Order[] = [
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },
  {
    _id: "64d1f5b6a80b5f0012345678",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    createdAt: "2024-01-06T12:00:00.000Z",
    total_amount: 95.5,
  },

  {
    _id: "64d1f5b6a80b5f0012345679",
    order_items: ["64d1f5b6a80b5f0012345684"],
    status: "Delivered",
    createdAt: "2024-01-05T15:00:00.000Z",
    total_amount: 45.0,
  },
];

export type Order = {
  _id: string;
  order_items: string[];
  status: string;
  createdAt: string;
  total_amount: number;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: " מספר הזמנה",
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "order_items",
    header: "מוצרים",
    cell: ({ row }) => {
      const items = row.getValue("order_items") as string[];
      return <div className="text-center">{items.length}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "סטטוס",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "תאריך ",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleString()}</div>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "total_amount",
    header: "סכום",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium text-right">{formatted}</div>;
    },
    sortingFn: "basic",
  },
];

export function OrdersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="overflow-hidden border rounded-md">
        <Table className="w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-2 text-right">
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc"
                          ? "⬆"
                          : header.column.getIsSorted() === "desc"
                          ? "⬇"
                          : null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center py-4 space-x-2">
        <Button
          //   variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          הקודם
        </Button>
        <Button
          //   variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          הבא
        </Button>
      </div>
    </div>
  );
}
