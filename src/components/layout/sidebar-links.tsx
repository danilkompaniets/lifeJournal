import {Link} from "react-router-dom";
import {ChartScatterIcon, HomeIcon, LayoutDashboardIcon, Users2Icon} from "lucide-react";


const links = [
    {href: "/dashboard", title: "Dashboard", icon: <LayoutDashboardIcon/>},
    {href: "/dashboard/results", title: "Results", icon: <ChartScatterIcon/>},
    {href: "/dashboard/my-profile", title: "My Profile", icon: <HomeIcon/>},
    {href: "/dashboard/friends", title: "Friends", icon: <Users2Icon/>},
];

const SidebarLinks = ({isCollapsed}: { isCollapsed: boolean }) => {
    if (isCollapsed) {
        return (
            <div className="w-full flex justify-end flex-col gap-3">
                {
                    links.map((link, id) => (
                        <Link
                            className={"w-full flex items-center justify-end duration-200 transition-all hover:drop-shadow-md"}
                            to={link.href}
                            key={id}
                        >
                            <div
                                className="text-gray-600 justify-end white p-2 bg-white border rounded-md">{link.icon}</div>
                        </Link>
                    ))
                }
            </div>
        )
    }

    if (!isCollapsed) {
        return (
            <div className="w-full flex flex-col gap-3">
                {
                    links.map((link, id) => (
                        <Link
                            className="flex items-center justify-between px-2 py-2 border bg-white rounded-md hover:bg-gray-100 transition-colors duration-200 ease-in-out"
                            to={link.href}
                            key={id}
                        >
                            <span className="text-gray-800 font-semibold">{link.title}</span>
                            <div className="text-gray-600">{link.icon}</div>
                        </Link>
                    ))
                }
            </div>
        );
    }

};

export default SidebarLinks;