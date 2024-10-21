import {columns} from "@/components/tasks/columns.tsx";
import {DataTable} from "@/components/tasks/data-table.tsx";

const data = [
    {
        date: new Date().getDay(),
        title: "name",
        desc: "desc",
    },
];

const HomePage = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="container flex flex-col gap-y-3 mt-4">
                <p>
                    {}
                </p>
                <h1 className="md:text-4xl text-2xl">
                    Track your progress. Keep it simple.
                </h1>
                <DataTable columns={columns} data={data}/>
            </div>
        </div>
    );
};

export default HomePage;
