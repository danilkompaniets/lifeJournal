import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import {Outlet} from "react-router";
import ProfileHeader from "./ProfileHeader.tsx";
import SidebarLinks from "./sidebar-links";
import SidebarFriendsSearch from "./sidebar-friends-search";
import {LogOut} from "lucide-react";
import {Button} from "../ui/button";
import {useDispatch} from "react-redux";
import {logout} from "@/features/auth/authSlice.ts";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/layout/AppSidebar.tsx";

// <ResizablePanelGroup
//     direction="horizontal"
//     className="rounded-lg border w-full"
// >
//     {/* Sidebar */}
//     <ResizablePanel className="relative h-screen" defaultSize={25}>
//
//         <ProfileHeader/>
//         <SidebarFriendsSearch/>
//         <SidebarLinks/>
//         <Button onClick={() => {
//             dispatch(logout())
//         }} className="bottom-2 left-2 absolute" variant={"destructive"}>
//             <LogOut/>
//         </Button>
//     </ResizablePanel>
//
//     <ResizableHandle withHandle/>
//     <ResizablePanel defaultSize={75}>
//         <div className="flex h-screen items-center justify-center p-6">
//           <span className="font-semibold">
//             <Outlet/>
//           </span>
//         </div>
//     </ResizablePanel>
// </ResizablePanelGroup>

const MainLayout = () => {
    const dispatch = useDispatch();
    return (
        <SidebarProvider className={"w-full mx-auto flex items-center justify-center"}>
            <AppSidebar/>
            <main className={"h-full px-4 flex items-center justify-center min-h-screen w-auto container"}>
                <Outlet/>
            </main>
        </SidebarProvider>

    );
};

export default MainLayout;
