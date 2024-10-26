import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefetch} from "@/services/authService.ts";

export const dayResultsApi = createApi({
    reducerPath: "api/dayResults",
    baseQuery: baseQueryWithRefetch,
    endpoints: () => ({}),
    tagTypes: ["dayResults", "goalsHeaders"]
});