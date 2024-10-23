import {authApi} from "@/services/auth/authService.ts";

export const authApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: "/user/my-profile",
                method: "GET",
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: {...credentials},
            }),
        }),
        registerUser: builder.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: {...credentials}
            })
        }),
    }),
})

export const {useGetUserDetailsQuery, useRegisterUserMutation, useLoginUserMutation} = authApiSlice