import {usersApi} from "@/services/usersService.ts";

export const usersApiSlice = usersApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: "/user/my-profile",
                method: "GET",
            }),
            providesTags: ["MyUserDetails"]
        }),

        searchForUser: builder.query({
            query: (username: string) => ({
                url: `user/searchUser/${username}`,
                method: "GET"
            }),
        }),

        getFriends: builder.query({
            query: () => ({
                url: "/user/getFriends",
                method: "GET",
            }),
            providesTags: ["MyUserDetails"]
        }),

        getIncomingRequests: builder.query({
            query: () => ({
                url: "/user/incoming",
                method: "GET",
            }),
            providesTags: ["MyUserDetails"]
        }),

        getOutgoingRequests: builder.query({
            query: () => ({
                url: "/user/outgoing",
                method: "GET",
            }),
            providesTags: ["MyUserDetails"]
        }),

        deleteFriend: builder.mutation({
            query: (friendId: bigint) => ({
                url: `/user/deleteFriend/${friendId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["MyUserDetails"]
        }),

        sendFriendRequest: builder.mutation({
            query: (friendId) => ({
                url: `/user/sendFriendRequest/${friendId}`,
                method: "POST",
            }),
            invalidatesTags: ["MyUserDetails"]
        }),

        acceptFriendRequest: builder.mutation({
            query: (friendRequestId) => ({
                url: `/user/acceptFriendRequest/${friendRequestId}`,
                method: "POST",
            }),
            invalidatesTags: ["MyUserDetails"]
        }),

        getUserById: builder.query({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: "GET"
            }),
        })
    })
})

export const {
    useGetUserDetailsQuery,
    useGetUserByIdQuery,
    useSearchForUserQuery,
    useGetFriendsQuery,
    useAcceptFriendRequestMutation,
    useSendFriendRequestMutation,
    useGetIncomingRequestsQuery,
    useGetOutgoingRequestsQuery,
    useDeleteFriendMutation
} = usersApiSlice