import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "@/utils/apiClient.ts";
import axios from "axios";

interface registerProps {
    username: string;
    email: string;
    password: string;
}

interface loginProps {
    username: string;
    password: string;
}

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({username, email, password}: registerProps, {rejectWithValue}) => {
        try {
            await apiClient.post(
                `/auth/register`,
                {
                    username,
                    email,
                    password,
                },
            );
        } catch (error: unknown) {
            if (
                axios.isAxiosError(error) &&
                error.response &&
                error.response.data.message
            ) {
                return rejectWithValue(error.response.data.message);
            } else if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({username, password}: loginProps, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(
                `/auth/login`,
                {username, password},
            );

            localStorage.setItem('accessToken', response.data.accessToken);

            return response.data;
        } catch (error) {
            if (
                axios.isAxiosError(error) &&
                error.response &&
                error.response.data.message
            ) {
                return rejectWithValue(error.response.data.message);
            } else if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);
