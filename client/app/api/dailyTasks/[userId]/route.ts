import prisma from "@/lib/prisma";
import { checkUser } from "@/services/checkUser";
import { NextRequest, NextResponse } from "next/server";
import { check } from "zod";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }>}) {
    const { userId } = await params;
    const url = new URL(request.url);
    const month = url.searchParams.get('month');
    const year = url.searchParams.get('year');
    console.log(userId)
    const user = await checkUser(userId); // Coming from the check user service

    if (!user) {
        return NextResponse.json({ message: `User with ID ${userId} not found.`, status: 404 });
    }

    const tasks = await prisma.dailyTask.findMany({
        where: {
            AND: [
                { userId: user.id },
                { CurrentMonth: parseInt(month || "0") || undefined },
                { CurrentYear: parseInt(year || "0") || undefined }
            ]
        }
    });
    if (tasks.length > 0){
        return NextResponse.json({ tasks, status: 200 });
    } else {
        return NextResponse.json({ message: `No tasks found for User ${userId}`, status: 404 });
    }

}