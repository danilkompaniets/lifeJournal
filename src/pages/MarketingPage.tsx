import React from 'react';
import {ChevronsUp, LaptopMinimal, PinIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

const MarketingPage = () => {
    const navigate = useNavigate();
    return (
        <div className={"w-full min-h-screen flex flex-col  gap-y-2 justify-center items-center"}>
            <h1 className={"text-4xl font-bold"}>
                Stop wasting your life.
            </h1>
            <p className={"text-xl font-medium"}>
                LifeJournal. New way to track your life
            </p>
            <p>
                Features:
            </p>
            <ul className={"flex flex-col gap-y-2"}>
                <li className={"flex gap-x-2"}>
                    <ChevronsUp/>
                    <p>
                        Competing with your friends
                    </p>
                </li>
                <li className={"flex gap-x-2"}>
                    <PinIcon/>
                    <p>
                        Simplicity of using
                    </p>
                </li>
                <li className={"flex gap-x-2"}>
                    <LaptopMinimal/>
                    <p>
                        Instant journaling of your life
                    </p>
                </li>
            </ul>
            <Button onClick={() => navigate("/register")} className={"mt-2"}>
                Register Now
            </Button>
        </div>
    );
};

export default MarketingPage;