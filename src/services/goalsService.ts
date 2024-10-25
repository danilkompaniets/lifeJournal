import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefetch} from "@/services/authService.ts";

export const goalsApi = createApi({
    reducerPath: "api/goals",
    baseQuery: baseQueryWithRefetch,
    tagTypes: ["goalsHeaders", "goals"],
    endpoints: () => ({})
})