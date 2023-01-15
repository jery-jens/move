import { Main } from "next/document";
import Image from "next/image";
import { Config } from "../../config";
import { IDataMain } from "../../pages";
import Button from "../Buttons/Button";

export interface IAdvancedCta {
    Text: string;
    Background: string;
    Main: IDataMain;
}

export default function AdvancedCta({Text, Background, Main}:IAdvancedCta) {
    return (
        <div className="mx-auto container px-7 my-16">
            <section className="py-20 px-7 flex flex-col items-center bg-gold-gradient w-full relative">
                <img src="/logos/logo-white.png" alt="Logo" className="w-36 mb-8" />

                <p className="font-openSans text-white text-center max-w-lg font-light leading-[150%] text-2xl mb-12">
                    {Text}
                </p>

                <Button Label="Maak een afspraak" Url={Main.data.attributes.AppointmentURL} OpenInNewTab={true} Color="white" />

                <div className="absolute left-0 top-0 w-full h-full -z-10">
                    <Image src={`${Config.cmsUrl}${Background}`} alt="Background" fill className="object-cover" />
                </div>
            </section>
        </div>
    )
};