import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <header>
            <nav className="w-full shadow-sm bg-primary text-primary-foreground flex justify-between items-center px-8 h-16">
                <h1 className="text-lg font-bold">TaskTracker</h1>
                <UserButton />
            </nav>
        </header>
    )
}