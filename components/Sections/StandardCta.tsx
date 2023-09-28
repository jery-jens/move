import Image from "next/image";
import { Config } from "../../config";
import { IDataMain } from "../../pages/over-mij";
import Button from "../Buttons/Button";

export interface IStandardCta {
    Title: string;
    Background: string;
    Main: IDataMain;
    SrcPublic?: boolean;
}

export default function StandardCta({Title, Background, Main, SrcPublic}:IStandardCta) {
    console.log(Background, SrcPublic)
    return (
        <div className="mx-auto container px-7 lg:my-16 my-8">
            <section className="lg:py-20 py-10 lg:px-20 px-10 bg-blue-gradient w-full relative">
                <img src="/logos/logo-white.png" alt="Logo" className="w-36 mb-8" />

                <h2 className="font-poppins text-white max-w-lg leading-[150%] tracking-tighter lg:text-5xl text-3xl font-medium mb-12">
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