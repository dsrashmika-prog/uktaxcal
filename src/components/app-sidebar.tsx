import { Calculator, Landmark } from "lucide-react"
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Your Take Home Pay Tax Calculator",
        url: "/",
        icon: Calculator,
    },
    {
        title: "About Us",
        url: "/about",
        icon: Landmark,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="p-4 border-b">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600 hover:opacity-80 transition-opacity">
                    <Landmark className="h-6 w-6" />
                    <span>taxcaluk</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Calculators</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
