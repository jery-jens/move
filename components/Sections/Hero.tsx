import ArrowButton from "../Buttons/ArrowButton";


export interface IHero {
    Title: string;
    Text: string;
    AppointmentUrl: string;
};

export default function Hero({ Title, Text, AppointmentUrl }: IHero) {
    return (
        <section className="relative lg:pt-80 pt-52 border-b-blue border-b-[2px] border-solid border-opacity-20 mb-16 overflow-hidden">
            <div className="container mx-auto px-7">
                <div className="lg:ml-[40%] lg:pb-40 pb-20 max-w-2xl w-full flex flex-col lg:items-start items-center">
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
                </div>
            </div>

            <img src="/images/hero-img.png" alt="Niels" className="lg:absolute left-0 bottom-0 lg:w-[700px] w-full" />
            <img src="/images/hero-blur.png" alt="Blur" className="absolute left-0 bottom-0 -z-10 h-full" />
        </section>
    )
};