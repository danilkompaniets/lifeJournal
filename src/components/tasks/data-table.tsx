"use client";

import {flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import AddTaskPopover from "./AddTaskPopover";
import {useEffect, useReducer, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeftIcon, DeleteIcon} from "lucide-react";
import {useAddGoalMutation, useDeleteGoalMutation} from "@/features/goals/goalsApiSlice.ts";
import {useAddNewFilledDayResultMutation} from "@/features/dayResults/dayResultsApiSlice.ts";
import {dayResultsReducer, initialNewDayResult} from "@/components/tasks/dayResultsReducer.ts";
import GoalsCheckboxes from "@/components/tasks/GoalsCheckboxes.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

interface DataTableProps<TData> {
    data: TData[];
    dayResults: any[]
    goalsHeaders: any[],
    userId: bigint,
    dayResultsRefetch: () => void,
}

const date = new Date().toLocaleDateString();


export function DataTable<TData>({
                                     data,
                                     dayResults,
                                     goalsHeaders,
                                     userId,
                                     dayResultsRefetch,
                                 }: DataTableProps<TData>) {
    const [activeGoalId, setActiveGoalId] = useState()
    const [addGoal] = useAddGoalMutation();
    const [deleteGoal] = useDeleteGoalMutation();
    const [addNewDayResult] = useAddNewFilledDayResultMutation();
    const [error, setError] = useState<string | null>(null);

    const [isAddingTask, setIsAddingTask] = useState(false)

    const columns = [
        {
            accessorKey: "date",
            header: "Date",
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const [newDayResult, dispatch] = useReducer(dayResultsReducer, initialNewDayResult(goalsHeaders));

    useEffect(() => {
        newDayResult.goals = [...goalsHeaders];
    }, [goalsHeaders]);

    console.log(newDayResult);

    const changeTitle = (title: string) => dispatch({type: "changedTitle", title});
    const changeDescription = (description: string) => dispatch({type: "changedDescription", description});
    const changeCompletedGoal = (goalId: bigint, state: boolean) => dispatch({
        type: "changedCompletedGoal",
        goalId,
        state,
    });
    const clearForm = () => dispatch({type: "clearData"});


    const handleAddingNewTask = () => {
        if (isAddingTask && newDayResult.title.length > 0 && newDayResult.description.length > 0) {
            addNewDayResult({userId: userId, data: newDayResult})
            setIsAddingTask(false);
            setError(null);
            clearForm()
            dayResultsRefetch()
        }
        if ((newDayResult.title.length == 0 || newDayResult.description.length == 0) && isAddingTask) {
            setError("You cannot leave title or description empty.")
        } else {
            setIsAddingTask(true);
        }
    }

    return (
        <div>
            <div className={"flex gap-x-2"}>
                <Button className={"mb-2"} onClick={handleAddingNewTask}>
                    {
                        isAddingTask ? "Save" : "Add Task"
                    }
                </Button>
                {
                    isAddingTask && (
                        <Button className={"mb-2"} variant={"destructive"} onClick={() => setIsAddingTask(false)}>
                            <ArrowLeftIcon/>
                        </Button>
                    )
                }
                {
                    error != null && (
                        <div className="flex items-center justify-center bg-red-100 rounded-md px-2">
                            <p>{error}</p>
                        </div>
                    )
                }
            </div>
            <div className="rounded-md border w-full">
                <Table>
                    <TableHeader className="">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, id) => {
                                    return (
                                        <TableHead key={id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                                {
                                    goalsHeaders.map((goalHeader) => {
                                        return (
                                            <TableHead
                                                onClick={() => {
                                                    if (activeGoalId == goalHeader.id) {
                                                        setActiveGoalId(null)
                                                    } else {
                                                        setActiveGoalId(goalHeader.id)
                                                    }
                                                }}
                                                className={"cursor-pointer hover:text-black transition-colors relative select-none"}
                                                key={goalHeader.id}>
                                                {goalHeader.title}
                                                {goalHeader.id === activeGoalId &&
                                                    (
                                                        <div
                                                            className={"absolute z-40 top-10 flex gap-x-2 p-2 bg-white border border-zinc-100 rounded-md"}>
                                                            <Button
                                                                onClick={() => {
                                                                    deleteGoal(goalHeader.id.toString())
                                                                    dayResultsRefetch()
                                                                }}
                                                                className={"flex items-center justify-center hover:text-red-600"}
                                                                variant={"ghost"}>
                                                                <DeleteIcon/>
                                                            </Button>
                                                        </div>
                                                    )
                                                }
                                            </TableHead>
                                        )
                                    })
                                }
                                <TableHead>
                                    <AddTaskPopover addGoal={addGoal}/>
                                </TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {
                            isAddingTask && (
                                <TableRow key="new_task">
                                    <TableCell>{date}</TableCell>
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

                                    <GoalsCheckboxes goals={newDayResult.goals} changeCompletedGoal={changeCompletedGoal}/>
                                    <TableCell/>
                                </TableRow>
                            )
                        }
                        {dayResults.map((dayResult) => {
                            const date = new Date(dayResult.date).toLocaleDateString()
                            return (
                                <TableRow key={dayResult.id}>
                                    <TableCell>
                                        {date}
                                    </TableCell>
                                    <TableCell>
                                        {dayResult.title}
                                    </TableCell>
                                    <TableCell>
                                        {dayResult.description}
                                    </TableCell>
                                    {dayResult.goals.map((goal) => (
                                        <TableCell>
                                            <Checkbox disabled={true} checked={goal.completed}/>
                                        </TableCell>
                                    ))}
                                    <TableCell/>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}