import Footer from "./Footer";
import Navbar from "./Navbar";

type MainLayoutProp = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProp) => {
    return (
        <div className='w-full flex flex-col min-h-screen bg-rose-100'>
            <Navbar />
            <main className='flex-1 flex flex-col max-w-[1300px] mx-auto bg-rose-100'>
                {" "}
                {children}
            </main>
            <Footer />
        </div>
    );
};
export default MainLayout;
