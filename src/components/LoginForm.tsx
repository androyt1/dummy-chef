import React, { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Lock } from "lucide-react";
import { loginUser, clearError } from "../redux/features/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import Button from "./custom/Button";
import Input from "./custom/Input";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
        return () => {
            dispatch(clearError());
        };
    }, [user, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({ icon: "error", title: "Error", text: error });
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className='flex-1 flex flex-col justify-center items-center p-3'>
            <form
                onSubmit={handleSubmit}
                data-aos='fade-up'
                className='w-full md:max-w-[500px] space-y-4'>
                <div className='flex justify-start items-center w-full'>
                    <h2 className='text-4xl font-semibold'>Welcome Back</h2>
                </div>
                <Input type='email' name='email' placeholder='Enter Email' icon={Lock} />
                <Input type='password' name='password' placeholder='Enter Password' icon={Lock} />
                <div className='w-full'>
                    <Button type='submit' text={loading ? "processing..." : "login"} />
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
