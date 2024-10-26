import {authApi} from "@/services/authService.ts";

const friendsApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        searchForUser: builder.query({
            query: (username: string) => ({
                url: `user/searchUser/${username}`,
                method: "GET"
            })
        }),
        getFriends: builder.query({
            query: () => ({
                url: "/user/getFriends",
                method: "GET",
            }),
            providesTags: ["friends"]
        }),
        addFriend: builder.mutation({
            query: (friendId: bigint) => ({
                url: `/user/sendFriendRequest/${friendId}`,
                method: "POST",
            }),
            invalidatesTags: ["friends"]
        })
    }),
})

export const {useAddFriendMutation, useGetFriendsQuery, useSearchForUserQuery} = friendsApiSlice