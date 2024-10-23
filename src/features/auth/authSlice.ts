import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/app/store.ts";

const accessToken = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null

interface UserInfo {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    loading: boolean;
    userInfo: UserInfo | null;
    accessToken: string | null;
    error: null | unknown | string;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    accessToken: accessToken,
    error: null,
    success: false,
};

export const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            logout: (state) => {
                state.userInfo = null;
                state.accessToken = null;
                state.success = false;
                state.error = null;
                localStorage.removeItem("accessToken");
            },
            setCredentials: (state, action) => {
                state.userInfo = action.payload;
            },
            removeAccessToken: (state) => {
                state.accessToken = null;
                localStorage.removeItem("accessToken");
            },
            setAccessToken: (state, action) => {
                state.accessToken = action.payload;
                localStorage.setItem("accessToken", action.payload);
            }
        }
    }
);


export const selectAuthState = (state: RootState): AuthState => state.auth;

export const {logout, setCredentials, removeAccessToken, setAccessToken} = authSlice.actions;