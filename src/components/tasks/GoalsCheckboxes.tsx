import {TableCell} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

const GoalsCheckboxes = ({goals, changeCompletedGoal}: any) => (
    <>
        {goals.map((goal: any, id: number) => (
            <TableCell key={id} onClick={() => changeCompletedGoal(goal.id, !goal.completed)}>
                <Checkbox id={goal.id} checked={goal.completed} className="w-5 h-5"/>
            </TableCell>
        ))}
    </>
);

export default GoalsCheckboxes

