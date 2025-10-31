"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "../Table";

type DailyTask = {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

const testTasks: DailyTask[] = [
    {
        id: 1,
        title: "Task 1",
        description: "This is task 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "user1",
    },
    {
        id: 2,
        title: "Task 2",
        description: "This is task 2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "user1",
    },
];
const columns: ColumnDef<DailyTask>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => {
            const date = getValue<Date>();
            return date.toLocaleDateString();
        }
    },
];


export default function DailyTasks() {


    return (
        
        <DataTable data={testTasks} columns={columns} />
    )
}