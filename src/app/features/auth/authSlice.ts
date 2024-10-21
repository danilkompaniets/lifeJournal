import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "./authActions";
import {RootState} from "@/app/store";

const accessToken = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null


// Define the structure of the user's information
interface UserInfo {
    id: string;
    email: string;
    name: string;
}

// State interface definition
interface AuthState {
    loading: boolean;
    userInfo: UserInfo | null;  // UserInfo when logged in, empty object otherwise
    accessToken: string | null;
    error: null | unknown | string;
    success: boolean;
}

// Initial state definition
const initialState: AuthState = {
    loading: false,
    userInfo: null,
    accessToken: accessToken,
    error: null,
    success: false,
};

export const authSlice = createSlice({
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

    },
    extraReducers: (builder) => {
        builder
            //
            // Register action
            //
            .addCase(
                registerUser.pending, (state
                ) => {
                    state.loading = true;
                    state.error = null;
                })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Registration failed";  // Handle undefined payload
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })

            //
            // Login actions
            //
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: UserInfo, accessToken: string }>) => {
                const {user, accessToken} = action.payload;

                state.userInfo = user;
                state.accessToken = accessToken;
                state.success = true;
                state.error = null;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload ?? "Login failed";
                state.loading = false;
            });
    },
});

export const selectAuthState = (state: RootState): AuthState => state.auth;

export const {logout, setCredentials, removeAccessToken, setAccessToken} = authSlice.actions;

export default authSlice.reducer;