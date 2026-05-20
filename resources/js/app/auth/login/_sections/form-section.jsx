import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import React from "react";
import { Gmail } from "@thesvg/react";
import Checkbox from "@/app/_components/checkbox";
import { useForm } from "@inertiajs/react";

export default function FormSection() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <form className="space-y-6" onSubmit={submit}>
                <Input
                    id="email"
                    label="Email"
                    value={data.data}
                    error={errors.email}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    error={errors.password}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                {/* Terms and Conditions Checkbox */}
                <div className="flex items-center ">
                    <Checkbox
                        name="remember"
                        label="Remember me"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Button
                        loading={processing}
                        className="w-full"
                        variant="primary"
                        type="submit"
                    >
                        LOGIN
                    </Button>
                    <Button className="w-full flex gap-2 items-center justify-center ">
                        <Gmail className="h-5 w-5 " />
                        <div className=" text-gray-900">LOGIN WITH GOOGLE</div>
                    </Button>
                </div>
            </form>
        </>
    );
}
