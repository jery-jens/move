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
        <section className="relative border-b-blue border-b-[2px] border-solid border-opacity-20 mb-16 overflow-hidden">
            <div className="container mx-auto px-7 lg:pt-80 pt-52">
                <div className="lg:pb-40 lg:pl-[40vw] pb-20 flex flex-col lg:items-start items-center w-full">
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

                    <div className="lg:w-[40vw] w-[450px] h-full lg:flex hidden absolute left-0 top-0">
                        <div className="absolute left-0 top-0 w-full h-full bg-hero-gradient z-10 bg-opacity-50"></div>
                        <Image src={`${Config.cmsUrl}${Picture}`} alt="About" className="object-cover" fill />
                    </div>
                </div>
            </div>

            <div className="lg:w-[40vw] w-full lg:h-[580px] h-[480px] lg:absolute lg:hidden flex relative right-0 lg:mt-0 mt-10 lg:-top-[80px]">
                <Image src={`${Config.cmsUrl}${Picture}`} alt="About" className="object-cover" fill />
            </div>
            <img src="/images/hero-blur.png" alt="Blur" className="absolute left-0 bottom-0 -z-10 h-full" />
        </section>
    )
};