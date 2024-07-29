type BannerProp = {
    image?: string;
    aos?: string;
};

const Banner = ({ image = "/images/main.jpg", aos = "fade-left" }: BannerProp) => {
    return (
        <div
            data-aos={aos}
            className=' flex-1  flex items-start my-3 relative overflow-hidden backdrop-blur-[120px] bg-white '>
            <img
                src={image}
                alt=''
                className='zoom-image w-full h-full object-cover object-top z-0 rounded-xl'
            />

            <div className='zoom-circle1 absolute top-[10%] left-[5%] size-5 rounded-full  flex justify-center items-center bg-rose-500'></div>
            <div className='zoom-circle2 absolute bottom-[15%] left-[5%] size-10 lg:size-16 rounded-full  flex justify-center items-center border-white border-[4px] lg:border-[8px]'></div>
            <div className='zoom-circle3 absolute top-[15%] right-[20%] size-10 lg:size-16 rounded-full  flex justify-center items-center border-white border-[4px] lg:border-[8px]'></div>
            <div className='zoom-circle4 absolute bottom-[15%] right-[5%] size-5 rounded-full  flex justify-center items-center bg-rose-500'></div>
            <div className='zoom-circle5 absolute bottom-[55%] right-[55%] size-10 rounded-full  flex justify-center items-center border-rose-500/50 border-[5px]'></div>
        </div>
    );
};
export default Banner;
