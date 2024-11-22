import {Link} from "react-router-dom";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {UserCogIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
    useAcceptFriendRequestMutation,
    useDeleteFriendMutation,
    useGetUserByIdQuery,
    useGetUserDetailsQuery
} from "@/features/userProfile/usersApiSlice.ts";

function FriendsPage() {
    const {data: userInfo} = useGetUserDetailsQuery({}, {})
    const [accept] = useAcceptFriendRequestMutation();
    const [deleteFriend] = useDeleteFriendMutation();

    const FriendCard = ({id}: {
        id: bigint
    }) => {
        const {data, isLoading} = useGetUserByIdQuery(id)

        if (isLoading) {
            return <div>Loading...</div>
        }

        return (
            <>
                <div className={"rounded-md"}>
                    {
                        data.imageUrl != null ?
                            (<Avatar>
                                <AvatarImage src={data.imageUrl}/>
                            </Avatar>) :
                            (<Avatar
                                className={"w-11 h-11 flex p-2 items-center justify-center border rounded-full bg-white"}>
                                <UserCogIcon className={"w-full h-full"}/>
                            </Avatar>)
                    }
                    <p className={"font-medium"}>
                        {data.username}
                    </p>
                    <p className={"text-sm"}>
                        {data.email}
                    </p>
                    <Link to={`/dashboard/user/${id}`}>
                        <Button
                            className={"text-sm font-medium h-8 py-2 w-full mt-2"}>
                            View profile
                        </Button>
                    </Link>
                </div>
            </>

        )
    }

    if (userInfo == null) {
        return <div>Loading...</div>
    }

    return (
        <div className={"w-full min-h-screen"}>
            <h2 className={"font-semibold text-xl mb-4"}>
                Incoming Friend Requests
            </h2>
            <ul className={"flex gap-2 flex-wrap w-full"}>
                {
                    userInfo.incomingFriendRequests.length > 0 ?
                        userInfo.incomingFriendRequests.map((request) =>
                            (<li key={request.id}>
                                <FriendCard id={request.friendId}/>
                                <Button
                                    onClick={() => accept(request.id)}
                                    className={" text-sm font-medium h-8 py-2 w-full mt-2"}>
                                    Accept
                                </Button>
                            </li>)) : (
                            <p>No incoming friend requests</p>)
                }
            </ul>
            <h2 className={"font-semibold text-xl my-4"}>
                Outgoing Friend Requests
            </h2>
            <ul className={"flex gap-2 flex-wrap w-full"}>
                {
                    userInfo.outgoingFriendRequests.length > 0 ?
                        userInfo.outgoingFriendRequests.map((request) => {
                            return (
                                <li key={request.id}>
                                    <FriendCard id={request.friendId}/>
                                </li>
                            )
                        }) : (
                            <p>No incoming friend requests</p>)
                }
            </ul>
            <h2 className={"font-semibold text-xl my-4"}>
                My Friends
            </h2>
            <ul className={"flex gap-2 flex-wrap w-full"}>
                {
                    userInfo.friends.length > 0 ?
                        userInfo.friends.map((friend) => {
                            return (
                                <li key={friend.id}>
                                    <FriendCard id={friend.friendId}/>
                                    <Button
                                        onClick={() => deleteFriend(friend.id)}
                                        variant={"destructive"}
                                        className={"text-sm font-medium h-8 py-2 w-full mt-2"}>
                                        Remove from friends
                                    </Button>
                                </li>
                            )
                        }) : (
                            <p>No friends</p>)
                }
            </ul>
        </div>
    );
}

export default FriendsPage;