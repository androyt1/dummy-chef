import Button from "./Button";

const LeftHeader = () => {
    return (
        <div className='flex flex-col justify-center h-full px-3 md:px-7 lg:px-10 3'>
            <h1
                data-aos='fade-up'
                className='text-5xl md:text-6xl lg:text-7xl font-bold text-pretty tracking-tighter drop-shadow-xl'>
                Foodies Classics Experience
            </h1>
            <p data-aos='fade-up' className='mt-4'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates optio corrupti
                et debitis, accusamus reiciendis porro dignissimos excepturi animi eius numquam
                libero soluta, deleniti voluptatem eos reprehenderit assumenda laborum asperiores.
            </p>
            <Button text='Foodies' />
        </div>
    );
};

export default LeftHeader;
