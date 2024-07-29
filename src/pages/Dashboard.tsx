import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { User } from "lucide-react";

const Dashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className=' grid grid-cols-1 md:grid-cols-2  flex-1'>
            <div className=' w-full  flex flex-row items-center justify-center '>
                <User size={200} />
            </div>
            <div className=''>{user?.displayName}</div>
        </div>
    );
};
export default Dashboard;
