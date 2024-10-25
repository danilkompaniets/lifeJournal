import {useDeleteGoalMutation} from "@/features/goals/goalsApiSlice.ts";
import {DeleteIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const DeleteTaskPopover = ({goalId}: { goalId: bigint }) => {
    const [deleteGoal] = useDeleteGoalMutation();

    return (
        <div className={"p-4 bg-white"}>
            <Button onClick={() => deleteGoal({goalId})}>
                <DeleteIcon/>
            </Button>
        </div>
    )
};

export default DeleteTaskPopover;