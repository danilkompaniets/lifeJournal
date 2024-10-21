import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./app/features/auth/login/LoginPage.tsx";
import RegisterPage from "./app/features/auth/register/RegisterPage.tsx";
import HomePage from "@/app/features/home/HomePage.tsx";
import MainLayout from "./components/layout/main-layout";
import MyProfile from "./app/features/userProfile/MyProfile.tsx";
import Dashboard from "@/app/features/dashboard/Dashboard.tsx";
import ProtectedPage from "@/utils/ProtectedPage.tsx";

const App: FC = () => {
    return (
        <Routes>
            <Route element={<ProtectedPage/>}>
                <Route path="/dashboard" element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="table" element={<Dashboard/>}/>
                    <Route path="my-pronfile" element={<MyProfile/>}/>
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
    );
};

export default App;
