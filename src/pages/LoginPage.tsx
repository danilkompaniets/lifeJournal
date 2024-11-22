import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {FC, useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input.tsx";
import {useSelector} from "react-redux";
import {selectAuthState} from "@/features/auth/authSlice.ts";
import {useLoginUserMutation} from "@/features/auth/authApiSlice.ts";
import {PasswordInput} from "@/components/ui/password-input.tsx";


const LoginPage: FC = () => {
    const [loginUser, {isSuccess, isError, error, isLoading}] = useLoginUserMutation();
    const {userInfo} = useSelector(selectAuthState);
    const navigate = useNavigate();

    const formSchema = useMemo(() => z.object({
        username: z.string().min(2, {message: "Username must be at least 2 characters."}),
        password: z.string().min(6, {message: "Password should be at least 6 characters"}),
    }), []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    useEffect(() => {
        if (isSuccess || userInfo) {
            navigate("/dashboard");
        }
    }, [userInfo, isSuccess, navigate]);

    async function handleSubmit(values: z.infer<typeof formSchema>) {
        try {
            await loginUser(values).unwrap();
        } catch (error: any) {
            if (error?.data?.errors) {
                error.data.errors.forEach((fieldError: { field: string; message: string }) => {
                    form.setError(fieldError.field as keyof z.infer<typeof formSchema>, {
                        type: "server",
                        message: fieldError.message,
                    });
                });
            } else {
                form.setError("root", {
                    type: "server",
                    message: "An unexpected error occurred. Please try again.",
                });
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-sm md:w-1/4 flex flex-col gap-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {isError && (
                            <div className="flex items-center justify-center bg-red-100 rounded-md px-2 py-2">
                                <p>{error?.data ?? "Login failed. Please check your credentials."}</p>
                            </div>
                        )}
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Login"}
                        </Button>

                    </form>
                </Form>
                <p>
                    Not registered yet?{" "}
                    <Link className="text-blue-600" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;