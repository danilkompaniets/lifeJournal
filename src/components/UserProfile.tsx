import {
    useGetUserByIdQuery,
    useGetUserDetailsQuery,
    useSendFriendRequestMutation
} from "@/features/userProfile/usersApiSlice.ts";
import {useParams} from "react-router";
import Spinner from "@/components/Spinner.tsx";
import {UserIcon} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {InfoTable} from "@/components/InfoTable.tsx";
import {Button} from "@/components/ui/button.tsx";

const UserProfile = () => {
    const {userId} = useParams();
    const {data: userDetails, isLoading: isUserDetailsLoading} = useGetUserDetailsQuery({})

    const {
        data: userData,
        isLoading: isUserDataLoading,
        refetch
    } = useGetUserByIdQuery(userId, {refetchOnMountOrArgChange: true});
    const [sendRequest, {isLoading, isSuccess}] = useSendFriendRequestMutation();

    let isFriends = false;

    if (isUserDataLoading || isUserDetailsLoading) {
        return (
            <Spinner/>
        )
    }

    isFriends = userDetails.incomingFriendRequests.some(friendRequest => friendRequest.friendId == userId) ||
        userDetails.outgoingFriendRequests.some(friendRequest => friendRequest.friendId == userId) ||
        userDetails.friends.some(friendRequest => friendRequest.friendId == userId);

    return (
        <div className={"w-full flex flex-col gap-y-2"}>
            <div className={"flex h-16 items-center justify-start gap-10"}>
                {
                    userData.imageUrl !== null ?
                        <Avatar className={"w-fit h-full border rounded-full flex items-center justify-center p-2"}>
                            <AvatarImage className={"w-full h-full"} src={userData.imageUrl}/>
                        </Avatar> :
                        (
                            <Avatar className={"w-fit h-full border rounded-full flex items-center justify-center p-2"}>
                                <UserIcon className={"w-full h-full"}/>
                            </Avatar>
                        )
                }
                <div className={"text-left"}>
                    <p className={"font-semibold text-lg"}>
                        {userData.username}
                    </p>
                    <p>
                        {userData.email}
                    </p>
                </div>
            </div>
            <Button disabled={isLoading || isSuccess || isFriends} onClick={() => {
                sendRequest(userId)
                refetch()
            }}
                    className={"w-fit mt-2"}>
                Send Friend Request
            </Button>
            <div className={"mt-4 flex flex-col gap-4"}>
                <h2 className={"font-semibold"}>
                    Current Progress.
                </h2>
                <InfoTable userId={userId}/>
            </div>

        </div>
    )
}

export default UserProfile