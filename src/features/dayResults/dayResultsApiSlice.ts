import {dayResultsApi} from "@/services/dayResultsService.ts";

type DayResult = {
    id: bigint;
    title: string;
    description: string;
    date: string;
};

export const dayResultsApiSlice = dayResultsApi.injectEndpoints({
    endpoints: (builder) => ({
        getDayResultsByUserId: builder.query<DayResult[], string | bigint>({
            query: (userId) => ({
                url: `/tasks/getAllDayResults/${userId}`,
                method: "GET",
            }),
            providesTags: (result) => [{type: "dayResults", id: "LIST"}],
        }),
        addNewFilledDayResult: builder.mutation({
            query: ({userId, data}) => ({
                url: `/tasks/addDayResultFilled/${userId}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{type: "dayResults", id: "LIST"}],
        }),
    }),
});

// Export the hook for usage in components
export const {useGetDayResultsByUserIdQuery, useAddNewFilledDayResultMutation} = dayResultsApiSlice;