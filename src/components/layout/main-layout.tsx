import {Outlet} from "react-router";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/layout/AppSidebar.tsx";

const MainLayout = () => {
    return (
        <SidebarProvider className="w-full mx-auto flex">
            <div className="w-fit"> {/* Fixed width or percentage for sidebar */}
                <AppSidebar/>
            </div>
            <div className="ml-16 py-4 px-8 relative flex-grow flex items-center justify-center bg-white bg-opacity-50 ">
                <Outlet/>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;