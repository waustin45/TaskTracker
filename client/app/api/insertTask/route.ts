import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { title, description, currentMonth, currentYear, userId } = data;
    console.log(`Inserting task for user: ${userId} - Title: ${title}, Description: ${description}, Month: ${currentMonth}, Year: ${currentYear}`);

    const insertTask = await prisma.dailyTask.create({
        data: {
            title: title,
            description: description,
            CurrentMonth: currentMonth,
            CurrentYear: currentYear,
            userId: userId
        }
    })
    if (insertTask) {
        return NextResponse.json({ message: `Task inserted for User ${userId}` }, { status: 200 });
    } else {
        console.error("Failed to insert task.");
        return NextResponse.json({ message: `Failed to insert task for User ${userId}` }, { status: 500 });
    }


}
