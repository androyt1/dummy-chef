import React from "react";
import { Menu, ArrowUp, LucideIcon } from "lucide-react";

interface ButtonProps {
    text: string;
    backgroundColor?: string;
    textColor?: string;
    width?: string;
    icon?: LucideIcon;
    hoverIcon?: LucideIcon;
    onClick?: () => void;
    aos?: string;
    type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    text,
    backgroundColor = "bg-rose-500",
    textColor = "text-white",
    width = "w-1/3",
    icon: Icon = Menu,
    hoverIcon: HoverIcon = ArrowUp,
    aos = "fade-up",
    type = "submit",
    onClick,
}) => {
    return (
        <button
            data-aos={aos}
            type={type}
            className={`relative h-10 ${backgroundColor} ${textColor} ${width} rounded-sm mt-4 flex items-center justify-between shadow-md group overflow-hidden`}
            onClick={onClick}>
            <span className='flex-1 font-semibold'>{text}</span>
            <div className='border-l-2 border-current pr-3 pl-1 h-full flex items-center'>
                <div className='relative h-6 w-6 overflow-hidden'>
                    <Icon className='absolute top-0 left-0 transition-transform duration-700 ease-in-out group-hover:-translate-y-full' />
                    <HoverIcon className='absolute top-full left-0 transition-transform duration-700 ease-in-out group-hover:-translate-y-full' />
                </div>
            </div>
        </button>
    );
};

export default Button;
