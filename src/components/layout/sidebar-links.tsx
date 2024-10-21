import {Link} from "react-router-dom";

const links = [
    {href: "/dashboard", title: "dashboard"},
    {href: "/dashboard/results", title: "results"},
    {href: "/dashboard/my-profile", title: "my profile"},
];

const SidebarLinks = () => {
    return (
        <div className="w-full flex flex-col gap-2 mt-4 px-4">
            {links.map((link,) => (
                <Link
                    className="w-full px-3 py-2 border border-neutral-100 rounded-md hover:bg-neutral-100/50 transition-all"
                    to={link.href}
                >
                    {link.title}
                </Link>
            ))}
        </div>
    );
};

export default SidebarLinks;
