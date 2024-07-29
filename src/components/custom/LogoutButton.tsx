import { logout } from "../../redux/store";

const LogoutButton: React.FC = () => {
    return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
