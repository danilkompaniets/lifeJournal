import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefetch} from "@/services/authService.ts";

export const usersApi = createApi({
    reducerPath: "api/users",
    baseQuery: baseQueryWithRefetch,
    endpoints: () => ({}),
    tagTypes: ["MyUserDetails", "Friends", "IncomingRequests", "OutgoingRequests"]
})