import ArrowButton from "../Buttons/ArrowButton";


export interface IHero {
    Title: string;
    Text: string;
    AppointmentUrl: string;
};

export default function Hero({ Title, Text, AppointmentUrl }: IHero) {
    return (
        <section className="relative pt-80 pb-40 border-b-blue border-b-[2px] border-solid border-opacity-20 mb-16">
            <div className="container mx-auto px-7">
                <div className="ml-[40%] max-w-2xl w-full">
                    <h1 className="text-blue font-poppins tracking-tighter font-medium text-6xl mb-8">
                        {Title}
                    </h1>
                    <p className="text-blue font-openSans text-xl leading-[150%] mb-8">
                        {Text}
                    </p>
                    <ArrowButton 
                        Label="Maak een afspraak"
                        Url={AppointmentUrl}
                        OpenInNewTab={false}
                    />
                </div>
            </div>

            <img src="/images/hero-blur.png" alt="Blur" className="absolute left-0 bottom-0 -z-10 h-full" />
        </section>
    )
};