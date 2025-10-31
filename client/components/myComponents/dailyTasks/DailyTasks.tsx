"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "../Table";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FetchGet } from "@/services/fetchService";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/nextjs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

const currMonth = parseInt(dayjs().format('M'))
const currYear = parseInt(dayjs().format('YYYY'))
const currDay = parseInt(dayjs().format('D'))
export default function DailyTasks() {
    const { user } = useUser();

    const [currentMonth, setCurrentMonth] = useState<number>(currMonth);
    const [currentYear, setCurrentYear] = useState<number>(currYear);
    const [tasks, setTasks] = useState<DailyTask[] | null>(null);

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
        if (user) {
            fetchTasks();
        }
    }, [currentMonth, currentYear, user]);
    if (!tasks) {
        return <Spinner />
    }
    if (tasks.length === 0) {
        return <div>No tasks found for {currentMonth}-{currentYear}</div>
    }


    return (


        <div className="flex flex-col gap-3 border shadow-sm p-3 rounded-lg">
            <div className="flex gap-3 items-center justify-end">
                <div className="flex gap-1 items-center">
                    <label className="text-sm font-medium">Today:</label>
                    <Input type='text' value={`${currMonth}-${currDay}-${currYear}`}  readOnly disabled className="w-[180px]" />
                </div>
                
                <Select onValueChange={(value) => setCurrentMonth(parseInt(value))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Months</SelectLabel>
                            {months.map((month) => (
                                <SelectItem key={month.value} value={month.value.toString()} >
                                    {month.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input type="number" value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value))} className="w-[180px]" />
                <Button type="button" onClick={fetchTasks}>Fetch Tasks</Button>
            </div>
            <DataTable data={tasks} columns={columns} />
        </div>

    )
}