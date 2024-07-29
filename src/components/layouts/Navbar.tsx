import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust the import path as needed
import LogoutButton from "../custom/LogoutButton"; // Adjust the import path as needed
import { links } from "../../constants";

const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <header className='w-full shadow-md bg-white/50'>
            <nav className='flex flex-row justify-between items-center py-6 max-w-[1300px] mx-auto text-black'>
                <div>
                    <Link to='/' className='font-semibold text-xl text-rose-500'>
                        LucyFoods
                    </Link>
                </div>
                <ul className='flex flex-row gap-2'>
                    {links.map((link) => {
                        // Show Home link for all users
                        if (link.text === "Home") {
                            return (
                                <li key={link.id}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive ? "font-semibold text-rose-500" : "text-black"
                                        }>
                                        {link.text}
                                    </NavLink>
                                </li>
                            );
                        }

                        // Show Dashboard link only for logged-in users
                        if (link.text === "Dashboard" && user) {
                            return (
                                <li key={link.id}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive ? "font-semibold text-rose-500" : "text-black"
                                        }>
                                        {link.text}
                                    </NavLink>
                                </li>
                            );
                        }

                        // Show Login and Register links only for non-logged-in users
                        if ((link.text === "Login" || link.text === "Register") && !user) {
                            return (
                                <li key={link.id}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive ? "font-semibold text-rose-500" : "text-black"
                                        }>
                                        {link.text}
                                    </NavLink>
                                </li>
                            );
                        }

                        return null; // Don't render anything for other cases
                    })}
                    {user && (
                        <li>
                            <LogoutButton />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
