import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Goal} from "lucide-react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectAuthState} from "@/features/auth/authSlice.ts";

const AddTaskPopover = ({addGoal}: {
    addGoal: ({userId: bigint, title: string}) => void,
}) => {
    const {userInfo} = useSelector(selectAuthState)
    const [title, setTitle] = useState("");

    const handleSubmit = () => {
        const userId = userInfo?.id
        if (title != "") {
            addGoal({userId, title})
            setTitle("")
        }
        console.log(userInfo)
    }

    if (!userInfo) {
        return <div>Loading...</div>
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Goal/>
            </PopoverTrigger>
            <PopoverContent className="p-4">
                <p className="text-zinc-600 mb-2">enter the goal</p>
                <div className="flex gap-2">
                    <Input placeholder="go to mars" onChange={(e) => setTitle(e.target.value)}/>
                    <Button onClick={handleSubmit}>add</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default AddTaskPopover;
