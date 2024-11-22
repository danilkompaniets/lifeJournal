import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {UserRoundIcon} from "lucide-react";

import {useSelector} from "react-redux";
import {selectAuthState} from "@/features/auth/authSlice.ts";

const ProfileHeader = ({isCollapsed}: { isCollapsed: boolean }) => {
    const {userInfo, loading} = useSelector(selectAuthState)

    if (!userInfo || loading) {
        return <div>
            Loading...
        </div>
    }

    if (isCollapsed) {
        return (
            <div className={"w-full flex items-center justify-end"}>
                {
                    userInfo.imageUrl !== null ?
                        (
                            <Avatar className={"w-11 h-11"}>
                                <AvatarImage src={userInfo.imageUrl}/>
                            </Avatar>
                        )
                        :
                        (
                            <Avatar
                                className={"w-11 h-11 p-2 border rounded-full bg-white hover:drop-shadow-lg transition-all duration-200"}>
                                <UserRoundIcon className={"w-full h-full"}/>
                            </Avatar>
                        )
                }
            </div>
        )
    }

    if (!isCollapsed) {
        return (
            <div className={"flex w-fit justify-between gap-x-2"}>
                <div>
                    <p className={"font-bold"}>
                        {userInfo.username}
                    </p>
                    <p>
                        {userInfo.email}
                    </p>
                </div>
                {
                    userInfo.imageUrl !== null ?
                        (
                            <Avatar className={"w-11 h-11"}>
                                <AvatarImage src={userInfo.imageUrl}/>
                            </Avatar>
                        )
                        :
                        (
                            <Avatar
                                className={"w-11 h-11 p-2 border rounded-full bg-white hover:drop-shadow-lg transition-all duration-200"}>
                                <UserRoundIcon className={"w-full h-full"}/>
                            </Avatar>
                        )
                }
            </div>
        );
    }
};

export default ProfileHeader;
