import prisma from "@/lib/prisma";
export async function checkUser(clerkUserId: string) {
    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: clerkUserId
        }
    });
    return user;
}