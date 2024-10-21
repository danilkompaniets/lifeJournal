import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SidebarFriendsSearch = () => {
  return (
    <div className="flex flex-col w-full gap-2 px-4">
      <h2 className="text-neutral-400">Search friend by email</h2>
      <div className="w-full flex flex-row gap-2">
        <Input className="text-sm" placeholder="johndoe@mail.com" />
        <Button className="px-2 py-2">
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
};

export default SidebarFriendsSearch;
