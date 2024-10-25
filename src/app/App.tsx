import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import MainLayout from "../components/layout/main-layout.tsx";
import MyProfile from "@/features/userProfile/MyProfile.tsx";
import Dashboard from "@/components/Dashboard.tsx";
import ProtectedRoute from "@/utils/ProtectedRoute.tsx";

const App: FC = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute/>}>
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
