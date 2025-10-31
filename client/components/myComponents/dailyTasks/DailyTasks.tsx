"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "../Table";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FetchGet } from "@/services/fetchService";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/nextjs";

type DailyTask = {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}
type DailyTaskDTO = {
    tasks: DailyTask[];
    status: number;
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
        accessorKey: "CurrentMonth",
        header: "Current Month",
        cell: ({ getValue }) => {
            const month = getValue<number>();
            return dayjs().month(month - 1).format("MMMM");
        }
    },
    {
        accessorKey: "CurrentYear",
        header: "Current Year",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
    }
];

const currMonth = parseInt(dayjs().format('M'))
const currYear = parseInt(dayjs().format('YYYY'))
export default function DailyTasks() {
    const { user } = useUser();
    console.log(user)
    const [currentMonth, setCurrentMonth] = useState<number>(currMonth);
    const [currentYear, setCurrentYear] = useState<number>(currYear);
    const [tasks, setTasks] = useState<DailyTask[]>([]);

    const fetchTasks = async () => {
        const getFetch: DailyTaskDTO = await FetchGet(`/api/dailyTasks/${user?.id}?month=${currentMonth}&year=${currentYear}`)
        if (getFetch.status === 200) {
            console.log(getFetch.tasks)
            setTasks(getFetch.tasks);
        } else {
            setTasks([]);
        }
    }

    useEffect(() => {
        fetchTasks();
        
    }, [currentMonth, currentYear]);
    if(!tasks){
        return <Spinner />
    }
    if(tasks.length === 0){
        return <div>No tasks found for {currentMonth}-{currentYear}</div>
    }


    return (
        <>
        {currentMonth}-{currentYear}
        <DataTable data={tasks} columns={columns} />
        </>
        
    )
}