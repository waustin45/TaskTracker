import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }>}) {
    const { userId } = await params;
    const url = new URL(request.url);
    const month = url.searchParams.get('month');
    const year = url.searchParams.get('year');
    console.log(`Fetching daily tasks for user: ${userId} and month: ${month}, year: ${year}`);
    return new Response(JSON.stringify({ message: `Hello, User ${userId}!` }), {
        status: 200
    });
}