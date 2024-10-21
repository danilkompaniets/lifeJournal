import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import {Outlet} from "react-router";
import SidebarHeader from "./sidebar-header";
import SidebarLinks from "./sidebar-links";
import SidebarFriendsSearch from "./sidebar-friends-search";
import {LogOut} from "lucide-react";
import {Button} from "../ui/button";
import {useDispatch} from "react-redux";
import {logout} from "@/app/features/auth/authSlice.ts";

const MainLayout = () => {
    const dispatch = useDispatch();

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border w-full"
        >
            {/* Sidebar */}
            <ResizablePanel className="relative h-screen" defaultSize={25}>

                <SidebarHeader/>
                <SidebarFriendsSearch/>
                <SidebarLinks/>
                <Button onClick={() => {
                    dispatch(logout())
                }} className="bottom-2 left-2 absolute" variant={"destructive"}>
                    <LogOut/>
                </Button>
            </ResizablePanel>

            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={75}>
                <div className="flex h-screen items-center justify-center p-6">
          <span className="font-semibold">
            <Outlet/>
          </span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default MainLayout;
