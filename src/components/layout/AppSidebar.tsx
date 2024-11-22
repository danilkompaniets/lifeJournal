import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import ProfileHeader from "./ProfileHeader.tsx";
import {useState} from "react";
import SidebarFriendsSearch from "@/components/layout/sidebar-friends-search.tsx";
import SidebarLinks from "@/components/layout/sidebar-links.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LucideLogOut} from "lucide-react";
import {logout} from "@/features/auth/authSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store.ts";


export const AppSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    return (
        <Sidebar className={"w-80"}>
            <SidebarTrigger onClick={() => setIsCollapsed(!isCollapsed)} className={"absolute z-40 -right-8"}/>
            <SidebarHeader className={"w-full flex items-center justify-center"}>
                <ProfileHeader isCollapsed={isCollapsed}/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className={"px-2"}>
                    <SidebarLinks isCollapsed={isCollapsed}/>
                </SidebarGroup>
                <SidebarGroup className={isCollapsed ? "hidden" : "px-2"}>
                    <SidebarFriendsSearch/>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={"w-full flex items-end justify-end"}>
                <Button onClick={() => {
                    dispatch(logout())
                }}>
                    <LucideLogOut className={"w-4"}/>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
