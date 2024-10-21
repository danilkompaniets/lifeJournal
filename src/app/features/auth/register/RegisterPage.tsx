import {Button} from "@/components/ui/button.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useForm} from "react-hook-form";

import {Link, useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {selectAuthState} from "@/app/features/auth/authSlice.ts";
import {registerUser} from "@/app/features/auth/authActions.ts";
import {AppDispatch} from "@/app/store.ts";
import {useEffect} from "react";

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
    const {userInfo, success} = useSelector(selectAuthState);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const inputs = ["email", "password", "username"];

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            dispatch(registerUser(values)).unwrap();
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

    useEffect(() => {
        if (success) navigate("/login");
    }, [navigate, userInfo, success]);

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
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit">Register</Button>
                    </form>
                </Form>

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
