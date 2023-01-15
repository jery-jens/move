import Image from "next/image";
import { Config } from "../../config";
import { IDataMain } from "../../pages/over-mij";
import Button from "../Buttons/Button";

export interface IStandardCta {
    Title: string;
    Background: string;
    Main: IDataMain;
}

export default function StandardCta({Title, Background, Main}:IStandardCta) {
    return (
        <div className="mx-auto container px-7 my-16">
            <section className="py-20 px-20 bg-blue-gradient w-full relative">
                <img src="/logos/logo-white.png" alt="Logo" className="w-36 mb-8" />

                <h2 className="font-poppins text-white max-w-lg leading-[150%] tracking-tighter text-5xl font-medium mb-12">
                    {Title}
                </h2>

                <Button Label="Maak een afspraak" Url={Main.data.attributes.AppointmentURL} OpenInNewTab={true} Color="white" />

                <div className="absolute left-0 top-0 w-full h-full -z-10">
                    <Image src={`${Config.cmsUrl}${Background}`} alt="Background" fill className="object-cover" />
                </div>
            </section>
        </div>
    )
};