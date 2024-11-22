import {authApi} from "@/services/authService.ts";

export const authApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: {...credentials},
            })
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

export const {useRegisterUserMutation, useLoginUserMutation} = authApiSlice