import {createApi, fetchBaseQuery, BaseQueryFn} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/app/store.ts";
import {FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {apiClient} from "@/utils/apiClient.ts";

const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}: { getState: () => RootState }) => {
        const token = getState().auth.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
    credentials: 'include'
});

const baseQueryWithRefetch: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        try {
            const refreshResponse = await apiClient.post('/auth/refresh-token');
            const newToken = refreshResponse.data;

            console.log(refreshResponse);

            api.dispatch({type: "auth/removeToken"})
            api.dispatch({type: 'auth/setAccessToken', payload: newToken});

            result = await baseQuery(args, api, extraOptions);
        } catch (error) {
            console.error('Token refresh failed', error);
        }
    }

    return result;
};
export const authApi = createApi({
    reducerPath: "api/auth",
    baseQuery: baseQueryWithRefetch,
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: "/user/my-profile",
                method: "GET",
            })
        })
    }),
});

export const {useGetUserDetailsQuery} = authApi;