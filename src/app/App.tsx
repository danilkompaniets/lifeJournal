import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import MainLayout from "../components/layout/main-layout.tsx";
import Dashboard from "@/components/Dashboard.tsx";
import ProtectedRoute from "@/utils/ProtectedRoute.tsx";
import UserProfile from "@/components/UserProfile.tsx";
import FriendsPage from "@/pages/FriendsPage.tsx";
import MarketingPage from "@/pages/MarketingPage.tsx";

const App: FC = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="table" element={<Dashboard/>}/>
                    <Route path={"user/:userId"} element={<UserProfile/>}/>
                    <Route path={"friends"} element={<FriendsPage/>}/>
                </Route>
            </Route>
            <Route path={"/"} element={<MarketingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
    );
};

export default App;
