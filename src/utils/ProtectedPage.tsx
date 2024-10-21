import {useDispatch, useSelector} from "react-redux";
import {Outlet, NavLink} from "react-router-dom";
import {selectAuthState, setCredentials} from "@/app/features/auth/authSlice.ts";
import {useGetUserDetailsQuery} from "@/app/services/auth/authService.ts";
import {useEffect} from "react";

function ProtectedPage() {
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const {data, isLoading} = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 600000
    })

    useEffect(() => {
        if (data && !isLoading) dispatch(setCredentials(data))
    }, [data, dispatch])

    const {userInfo} = useSelector(selectAuthState)

    if (!userInfo) {
        return (
            <div>
                <h1>Unauthorized :(</h1>
                <span>
          <NavLink to='/login'>
              Login
          </NavLink>
        </span>
            </div>
        )
    }

    return <Outlet/>
}

export default ProtectedPage;