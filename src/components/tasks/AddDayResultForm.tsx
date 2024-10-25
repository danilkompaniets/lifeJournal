import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import GoalsCheckboxes from "@/components/tasks/GoalsCheckboxes.tsx";

export const AddDayResultForm = ({
                                     newDayResult,
                                     changeTitle,
                                     changeDescription,
                                     goals,
                                     changeCompletedGoal,
                                 }: any) => {
    return (
        <TableRow key="new_task">
            <TableCell>{new Date().toLocaleDateString()}</TableCell>
            <TableCell>
                <Input
                    placeholder="Add title"
                    value={newDayResult.title}
                    onChange={(e) => changeTitle(e.target.value)}
                />
            </TableCell>
            <TableCell>
                <Textarea
                    placeholder="Add description"
                    value={newDayResult.description}
                    onChange={(e) => changeDescription(e.target.value)}
                />
            </TableCell>
            <GoalsCheckboxes goals={goals} changeCompletedGoal={changeCompletedGoal}/>
        </TableRow>
    )

};
