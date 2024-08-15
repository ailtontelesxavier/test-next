'use client';
import { SessionProvider } from "next-auth/react";
import SideNavbar from "@/components/SideNavbar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section className={cn(
        "min-h-screen w-screen bg-white text-black flex ",
        {
            "debug-screens": process.env.NODE_ENV === "development"
        }
    )}><SessionProvider><SideNavbar /><div className="p-8 w-full">{children}</div></SessionProvider></section>
}