// import {authApi} from "@/services/authService.ts";
//
// const friendsApiSlice = authApi.injectEndpoints({
//     endpoints: (builder) => ({
//         searchForUser: builder.query({
//             query: (username: string) => ({
//                 url: `user/searchUser/${username}`,
//                 method: "GET"
//             })
//         }),
//         getFriends: builder.query({
//             query: () => ({
//                 url: "/user/getFriends",
//                 method: "GET",
//             }),
//             providesTags: ["my-profile"]
//         }),
//         addFriend: builder.mutation({
//             query: (friendId: bigint) => ({
//                 url: `/user/sendFriendRequest/${friendId}`,
//                 method: "POST",
//             }),
//             invalidatesTags: ["my-profile"]
//         }),
//         deleteFriend: builder.mutation({
//             query: (friendId: bigint) => ({
//                 url: `/user/deleteFriend/${friendId}`,
//                 method: "DELETE",
//             })
//         }),
//         sendFriendRequest: builder.mutation({
//             query: (friendId) => ({
//                 url: `/user/sendFriendRequest/${friendId}`,
//                 method: "POST",
//             }),
//             invalidatesTags: ["my-profile"]
//         }),
//         acceptFriendRequest: builder.mutation({
//             query: (friendRequestId) => ({
//                 url: `/user/acceptFriendRequest/${friendRequestId}`,
//                 method: "POST",
//             }),
//             invalidatesTags: ["my-profile"]
//         }),
//         getUserById: builder.query({
//             query: (userId) => ({
//                 url: `/user/${userId}`,
//                 method: "GET"
//             })
//         })
//     }),
// })
//
// export const {
//     useAddFriendMutation,
//     useGetFriendsQuery,
//     useAcceptFriendRequestMutation,
//     useSendFriendRequestMutation,
//     useGetUserByIdQuery,
//     useSearchForUserQuery
// } = friendsApiSlice