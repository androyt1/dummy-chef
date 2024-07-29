import { Mail, LucideIcon } from "lucide-react";

type InputProp = {
    label?: string;
    type?: string;
    name?: string;
    icon?: LucideIcon;
    placeholder?: string;
};

const Input = ({
    label = "Email Address",
    type = "email",
    name = "email",
    icon: Icon = Mail,
    placeholder = "Enter Email Address",
}: InputProp) => {
    return (
        <div className='w-full'>
            <label htmlFor='email' className='sr-only'>
                {label}
            </label>
            <div className='group rounded-lg py-2 w-full flex items-center justify-start bg-white px-1 focus-within:ring-2 ring-rose-500 shadow-md  '>
                <Icon size={34} className='fill-rose-500 text-rose-50' />
                <input
                    type={type}
                    id={name}
                    name={name}
                    className='w-full px-2 bg-white placeholder:text-rose-500 outline-none'
                    placeholder={placeholder}
                    required
                />
            </div>
        </div>
    );
};

export default Input;
