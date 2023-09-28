import Image from "next/image";
import ArrowButton from "../Buttons/ArrowButton";
import { Config } from "../../config";


export interface IHero {
    Title: string;
    Text: string;
    AppointmentUrl: string;
    Picture: string;
};

export default function Hero({ Title, Text, AppointmentUrl, Picture }: IHero) {
    return (
        <section className="relative lg:pt-80 pt-52 border-b-blue border-b-[2px] border-solid border-opacity-20 mb-16">
            <div className="container mx-auto px-7 relative">
                <div className="lg:pb-40 lg:ml-[600px] pb-20 max-w-2xl w-full flex flex-col lg:items-start items-center">
                    <h1 className="text-blue font-poppins tracking-tighter font-medium lg:text-6xl lg:text-start text-4xl text-center lg:mb-8 mb-4">
                        {Title}
                    </h1>
                    <p className="text-blue font-openSans lg:text-xl text-lg leading-[150%] mb-8 lg:text-start text-center">
                        {Text}
                    </p>
                    <ArrowButton 
                        Label="Maak een afspraak"
                        Url={AppointmentUrl}
                        OpenInNewTab={false}
                    />

                    <div className="lg:w-[550px] w-full lg:h-[580px] h-[480px] lg:flex hidden absolute left-0 lg:mt-0 mt-10 lg:-top-[120px]">
                        <Image src={`${Config.cmsUrl}${Picture}`} alt="About" className="object-cover" fill />
                    </div>
                </div>
            </div>

            <div className="lg:w-[550px] w-full lg:h-[580px] h-[480px] lg:absolute lg:hidden flex relative right-0 lg:mt-0 mt-10 lg:-top-[80px]">
                <Image src={`${Config.cmsUrl}${Picture}`} alt="About" className="object-cover" fill />
            </div>
            <img src="/images/hero-blur.png" alt="Blur" className="absolute left-0 bottom-0 -z-10 h-full" />
        </section>
    )
};