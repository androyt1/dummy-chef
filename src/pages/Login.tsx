import Banner from "../components/custom/Banner";
import LoginForm from "../components/LoginForm";
const Login = () => {
    return (
        <div className='flex-1 grid grid-cols-1 md:grid-cols-2'>
            <Banner aos='fade-down' image='/images/login.jpg' />
            <LoginForm />
        </div>
    );
};
export default Login;
