import {useDispatch, useSelector} from "react-redux";
import {Outlet, NavLink} from "react-router-dom";
import {selectAuthState, setCredentials} from "@/features/auth/authSlice.ts";
import {useEffect} from "react";
import {useGetUserDetailsQuery} from "@/features/auth/authApiSlice.ts";

function ProtectedRoute() {
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const {data, isLoading} = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 600000
    })


    useEffect(() => {
        if (data && !isLoading) dispatch(setCredentials(data))
    }, [data, dispatch])

    const {userInfo} = useSelector(selectAuthState)


    if (!userInfo && !isLoading) {
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

export default ProtectedRoute;