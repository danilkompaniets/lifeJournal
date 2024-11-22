import {DataTable} from "@/components/tasks/data-table.tsx";
import {useGetGoalsHeadersByUserIdQuery} from "@/features/goals/goalsApiSlice.ts";
import {useGetDayResultsByUserIdQuery} from "@/features/dayResults/dayResultsApiSlice.ts";
import {useGetUserDetailsQuery} from "@/features/userProfile/usersApiSlice.ts";

const HomePage = () => {
    const {data: userInfo, isLoading: isUserLoading} = useGetUserDetailsQuery(
        {},
        {pollingInterval: 600000, refetchOnMountOrArgChange: true}
    );

    const {
        data: dayResults,
        refetch: dayResultsRefetch
    } = useGetDayResultsByUserIdQuery(userInfo?.id, {skip: isUserLoading || !userInfo})

    const {
        data: goalsHeaders,
        isLoading: isGoalsHeadersLoading
    } = useGetGoalsHeadersByUserIdQuery(userInfo?.id, {skip: isUserLoading || !userInfo});


    if (isUserLoading || isGoalsHeadersLoading || !userInfo || !dayResults) {
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
                    dayResultsRefetch={dayResultsRefetch}
                    goalsHeaders={goalsHeaders}
                    userId={userInfo.id}
                />
            </div>
        </div>
    );
};

export default HomePage;