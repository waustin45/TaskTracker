"use client"
import DailyTasks from "@/components/myComponents/dailyTasks/DailyTasks";
import InsertTask from "@/components/myComponents/dailyTasks/InsertTask";
import Image from "next/image";

export default function Home() {
  return (
    <section className="grid grid-cols-12 gap-4">
      <div className="col-span-8 ">
        <DailyTasks />
      </div>
      <div className="col-span-4 border p-2 rounded-lg shadow-sm">
        <InsertTask />
      </div>    
    </section>
  );
}
