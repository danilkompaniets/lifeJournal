import {Button} from "@/components/ui/button.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/app/store.ts";
import {loginUser} from "@/app/features/auth/authActions.ts";
import {selectAuthState} from "@/app/features/auth/authSlice.ts";

const formSchema = z.object({
    username: z
        .string()
        .min(2, {message: "Email must be at least 2 characters."}),
    password: z.string().min(6, {
        message: "Password should be at least 6 characters",
    }),
});

const LoginPage: FC = () => {
    const {userInfo, success} = useSelector(selectAuthState)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    useEffect(() => {
        if (success || userInfo !== null) {
            navigate("/dashboard")
        }
    }, [userInfo, success, navigate]);

    async function handleSubmit(values: z.infer<typeof formSchema>) {
        try {
            dispatch(loginUser(values)).unwrap()
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
            <div className="text-sm md:w-1/4 flex flex-col gap-y-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
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
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Login</Button>
                    </form>
                </Form>
                <p>
                    Not register yet?{" "}
                    <Link className="text-blue-600" to={"/register"}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;