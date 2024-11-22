import {useGetUserDetailsQuery} from "@/features/userProfile/usersApiSlice.ts";

const MyProfile = () => {
  const userDetails = useGetUserDetailsQuery("userDetails");
  return (<div>

  </div>);
};

export default MyProfile;
