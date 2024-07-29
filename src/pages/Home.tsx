import Banner from "../components/custom/Banner";
import LeftHeader from "../components/custom/LeftHeader";
const Home = () => {
    return (
        <div className='flex-1 grid grid-cols-1 md:grid-cols-2 select-none'>
            <LeftHeader />
            <Banner />
        </div>
    );
};
export default Home;
