import Banner from "../components/custom/Banner";
import RegisterForm from "../components/RegisterForm";
const Register = () => {
    return (
        <div className='flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden'>
            <Banner aos='fade-up' image='/images/image3.jpg' />
            <RegisterForm />
        </div>
    );
};
export default Register;
