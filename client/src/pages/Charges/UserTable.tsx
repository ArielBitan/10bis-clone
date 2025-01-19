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
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { IOrder } from "@/types/orderTypes";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "_id",
    header: "מספר הזמנה",
    cell: ({ row }) => (
      <Link
        to={`/order/${row.getValue("_id")}`}
        className="text-blue-500 hover:underline"
      >
        {row.getValue("_id")}
      </Link>
    ),
  },
  {
    accessorKey: "restaurant_id",
    header: "מסעדה",
    cell: ({ row }) => {
      const restaurant = row.getValue("restaurant_id") as {
        name: string;
        _id: string;
      };

      if (!restaurant || !restaurant.name || !restaurant._id) {
        return <span>אין מידע על המסעדה</span>;
      }

      return (
        <Link
          to={`/restaurant/${restaurant._id}`}
          className="text-blue-500 hover:underline"
        >
          {restaurant.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "order_items",
    header: "מוצרים",
    cell: ({ row }) => {
      const items = row.getValue("order_items") as string[];
      return <div className="">{items.length}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "סטטוס",
    cell: ({ row }) => {
      const status:
        | "Awaiting Payment"
        | "Pending"
        | "Open"
        | "Accepted"
        | "Picked Up"
        | "Delivered" = row.getValue("status");
      const statusMapping: {
        [key in
          | "Awaiting Payment"
          | "Pending"
          | "Open"
          | "Accepted"
          | "Picked Up"
          | "Delivered"]: string;
      } = {
        "Awaiting Payment": "ממתין לתשלום",
        Pending: "ממתין",
        Open: "פתוח",
        Accepted: "התקבל",
        "Picked Up": "נלקח",
        Delivered: "נמסר",
      };
      return <div className="text-orangePrimary">{statusMapping[status]}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "תאריך",
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
        currency: "ILS",
      }).format(amount);

      return <div className="font-medium text-right">{formatted}</div>;
    },
    sortingFn: "basic",
  },
];

interface UserTableProps {
  orders: IOrder[];
}

export function UserTable({ orders }: UserTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: orders,
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
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          הקודם
        </Button>
        <Button
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
