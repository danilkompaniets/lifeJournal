import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Goal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AddTaskPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Goal />
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <p className=" text-zinc-600 mb-2">enter the goal</p>
        <div className="flex gap-2">
          <Input placeholder="go to mars" />
          <Button>add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddTaskPopover;
