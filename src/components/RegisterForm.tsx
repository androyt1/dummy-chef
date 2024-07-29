import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Lock, User } from "lucide-react";
import { registerUser, clearError } from "../redux/features/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import Input from "./custom/Input";
import Button from "./custom/Button";

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error,
            });
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const userData = {
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        const resultAction = await dispatch(registerUser(userData));

        if (registerUser.fulfilled.match(resultAction)) {
            await Swal.fire({
                icon: "success",
                title: "Congratulations",
                text: "New User Successfully Created",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/dashboard");
            form.reset();
        }
        // Error handling is done in the useEffect for error
    };

    return (
        <div className='flex-1 flex flex-col justify-center items-center p-3'>
            <form
                onSubmit={handleSubmit}
                data-aos='fade-down'
                className='w-full md:max-w-[500px] space-y-4'>
                <div className='flex justify-start items-center w-full'>
                    <h2 className='text-4xl font-semibold'>Join Us</h2>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Input type='text' icon={User} name='firstname' placeholder='Enter Firstname' />
                    <Input type='text' icon={User} name='lastname' placeholder='Enter Lastname' />
                </div>
                <Input type='email' name='email' placeholder='Enter Email' icon={User} />
                <Input type='password' name='password' placeholder='Enter Password' icon={Lock} />
                <div className='w-full'>
                    <Button
                        type='submit'
                        text={loading ? "Processing ..." : "Register"}
                        aos='fade-down'
                    />
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
