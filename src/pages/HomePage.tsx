import {DataTable} from "@/components/tasks/data-table.tsx";
import {
    useGetGoalsHeadersByUserIdQuery
} from "@/features/goals/goalsApiSlice.ts";
import {useGetUserDetailsQuery} from "@/features/auth/authApiSlice.ts";
import {useGetDayResultsByUserIdQuery} from "@/features/dayResults/dayResultsApiSlice.ts";

const HomePage = () => {
    const {data: userInfo, isLoading: isUserLoading} = useGetUserDetailsQuery(
        {},
        {pollingInterval: 600000, refetchOnMountOrArgChange: true}
    );

    const {
        data: dayResults,
        isLoading: isDayResultsLoading,
    } = useGetDayResultsByUserIdQuery(userInfo?.id, {skip: isUserLoading || !userInfo})

    const {
        data: goalsHeaders,
        isLoading: isGoalsHeadersLoading
    } = useGetGoalsHeadersByUserIdQuery(userInfo?.id, {skip: isUserLoading || !userInfo});


    if (isUserLoading || isGoalsHeadersLoading || !userInfo || isDayResultsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div className="container flex flex-col gap-y-3 mt-4">
                <h1 className="md:text-4xl text-2xl">
                    Track your progress. Keep it simple.
                </h1>
                <DataTable
                    data={[]}
                    dayResults={dayResults}
                    goalsHeaders={goalsHeaders}
                    userId={userInfo.id}
                />
            </div>
        </div>
    );
};

export default HomePage;