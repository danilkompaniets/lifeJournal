import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useForm} from "react-hook-form";

import {Link, useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";
import {selectAuthState} from "@/features/auth/authSlice.ts";
import {useEffect} from "react";
import {useRegisterUserMutation} from "@/features/auth/authApiSlice.ts";
import {PasswordInput} from "@/components/ui/password-input.tsx";


const formSchema = z.object({
    email: z.string().min(6, {message: "Email must be at least 6 characters."}),
    password: z.string().min(6, {
        message: "Password should be at least 6 characters",
    }),
    username: z.string().min(2, {
        message: "Username should be at least 2 characters",
    }),
});

const RegisterPage = () => {
    const [registerUser, {isSuccess, isError, error}] = useRegisterUserMutation();
    const {userInfo} = useSelector(selectAuthState);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    useEffect(() => {
        if (isSuccess) navigate("/login");
    }, [navigate, userInfo, isSuccess]);

    const inputs = ["email", "password", "username"];

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            registerUser(values).unwrap()
        } catch (error: any) {
            if (error?.response?.data?.errors) {
                const errors = error.response.data.errors;

                errors.forEach((fieldError: { field: string; message: string }) => {
                    form.setError(fieldError.field as keyof z.infer<typeof formSchema>, {
                        type: "server",
                        message: fieldError.message,
                    });
                });
            } else {
                form.setError("root", {
                    type: "server",
                    message: "Something went wrong. Please try again.",
                });
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className=" text-sm md:w-1/4 flex flex-col gap-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {inputs.map((name) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            {name.charAt(0).toUpperCase() + name.slice(1)}
                                        </FormLabel>
                                        <FormControl>
                                            {
                                                name === "password" ? (
                                                        <PasswordInput placeholder={""} {...field} />
                                                    ) :
                                                    (<Input placeholder="" {...field} />)
                                            }
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit">Register</Button>
                    </form>
                </Form>
                <p className={"text-red-600"}>
                    {isError && error.data}
                </p>

                <p>
                    Alredy registred?{" "}
                    <Link className="text-blue-600" to={"/login"}>
                        login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
