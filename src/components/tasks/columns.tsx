import { ColumnDef } from "@tanstack/react-table";

export type Task = {
  date: number;
  title: string;
  desc: string;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
];
