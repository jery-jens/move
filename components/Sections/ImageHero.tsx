import Image from "next/image";
import { Config } from "../../config";
import { IDataMain } from "../../pages/over-mij";
import ArrowButton from "../Buttons/ArrowButton";

export interface IImageHero {
    Label: string;
    Title: string;
    Picture: string;
    Text: string;
    Main?: IDataMain;
};

export default function ImageHero({Label, Title, Picture, Text, Main}:IImageHero) {
    return (
        <section className="bg-grey pt-64 pb-24 mb-36">
            <div className="mx-auto container px-7 relative">
                <div className="max-w-xl">
                    <span className="text-blue text-opacity-50 font-poppins font-medium text-2xl tracking-wider uppercase">{Label}</span>
                    <h1 className="text-blue font-poppins tracking-tighter font-medium text-6xl mt-2 mb-4">{Title}</h1>
                    <p className="text-blue font-openSans text-xl leading-[150%] mb-9">{Text}</p>
                    <ArrowButton Label="Maak een afspraak" Url={Main?.data.attributes.AppointmentURL ?? ""} OpenInNewTab />
                </div>

                <div className="w-[550px] h-[580px] absolute right-0 -top-[80px]">
                    <Image src={`${Config.cmsUrl}${Picture}`} alt="About" className="object-cover" fill />
                </div>
            </div>
        </section>
    )
};