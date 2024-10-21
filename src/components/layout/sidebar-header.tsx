import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Home} from "lucide-react";
import {Button} from "../ui/button";
import {Link} from "react-router-dom";

const userData = {
    fullName: "Danil Kompaniets",
    email: "kompaniets1592925@gmail.com",
    image: "https://github.com/shadcn.png",
};

const SidebarHeader = () => {
    return (
        <div className="flex justify-between w-full px-2 py-4">
            <div className="flex gap-x-2 items-center">
                <Avatar className="md:h-12 w-12">
                    <AvatarImage src={userData.image}/>
                </Avatar>
                <div className="flex flex-col ">
                    <p className="text-md font-bold">{userData.fullName}</p>
                    <p className="text-sm text-zinc-500">{userData.email}</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Link to={"/dashboard"}>
                    <Button className="px-2 py-2" variant={"outline"}>
                        <Home width={25} height={25}/>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SidebarHeader;
