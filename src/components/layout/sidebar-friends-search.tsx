import {UserCogIcon} from "lucide-react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useSearchForUserQuery} from "@/features/friends/friendsApiSlice.ts";
import {useState} from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";

const SidebarFriendsSearch = () => {
    const [username, setUsername] = useState("");
    const [isCanceled, setIsCanceled] = useState(true);
    const {data, isLoading} = useSearchForUserQuery(username, {skip: username == ""})

    const FriendCard = ({username, email, imageUrl}) => {
        return (
            <>
                <div className={"px-2 py-2 rounded-md"}>
                    {
                        imageUrl !== null ?
                            (<Avatar>
                                <AvatarImage src={imageUrl}/>
                            </Avatar>) :
                            (<Avatar
                                className={"w-11 h-11 flex p-2 items-center justify-center border rounded-full bg-white"}>
                                <UserCogIcon className={"w-full h-full"}/>
                            </Avatar>)
                    }
                    <p className={"font-medium"}>
                        {username}
                    </p>
                    <p className={"text-sm"}>
                        {email}
                    </p>
                    <Button className={"text-sm font-medium h-8 py-2 w-full mt-2"}>
                        View profile
                    </Button>
                </div>
                <div className={"border border-zinc-300 mt-2 border-dashed"}/>
            </>

        )
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="w-full flex flex-row gap-2">
                <Input onChange={(e) => {
                    setUsername(e.target.value)
                    setIsCanceled(false)
                }} className="text-sm"
                       placeholder="johndoe@mail.com"/>
            </div>
            {
                data && data.length > 0 && (
                    <div
                        className={`bg-white rounded-md p-2 relative border flex flex-col gap-2 transition-all duration-200 ${isCanceled ? "hidden" : "block"}`}>
                        <Button className={"w-10 text-lg"} onClick={() => setIsCanceled(true)}>
                            {"<"}
                        </Button>
                        {
                            data.map((friend) =>
                                (
                                    <FriendCard key={friend.id} username={friend.username} email={friend.email}
                                                imageUrl={friend.imageUrl}/>
                                ))
                        }
                    </div>

                )
            }
        </div>
    );
};

export default SidebarFriendsSearch;
