"use client";

import {flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {useGetUserByIdQuery} from "@/features/userProfile/usersApiSlice.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";

interface InfoTableProps {
    userId: bigint,
}

export function InfoTable({
                              userId
                          }: InfoTableProps) {
    const {data: userData,} = useGetUserByIdQuery(userId)


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
        data: [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
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
                                userData.goalsHeaders.map((goalHeader) => {
                                    return (
                                        <TableHead>
                                            {goalHeader.title}
                                        </TableHead>
                                    )
                                })
                            }
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {userData.dayResults.map((dayResult) => {
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
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </div>);
}