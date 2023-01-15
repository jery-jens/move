import Image from "next/image";
import { Config } from "../../config";
import { IDataMain } from "../../pages";
import Button from "../Buttons/Button";

export interface IGreyContentImage {
    Title: string;
    Text: string;
    Appointment?: boolean;
    Direction: string;
    ImageUrl: string;
    Main: IDataMain;
};

export default function GreyContentImage({ Title, Text, Appointment, Direction, ImageUrl, Main }: IGreyContentImage) {
    return (
        <section className={`py-16`}>
            <div className={`mx-auto container px-7 flex items-center ${Direction === "Image first" ? "flex-row-reverse" : "flew-row"}`}>
                <div className="bg-grey p-12 max-w-[50%] min-w-[50%] w-full flex flex-col items-start">
                    <h2 className="font-poppins text-blue font-medium text-5xl tracking-tighter mb-8">
                        {Title}
                    </h2>
                    <p className="font-openSans text-blue text-xl leading-[150%] mb-12">
                        {Text}
                    </p>
                    {
                        Appointment && <Button Label="Maak een afspraak" Url={Main.data.attributes.AppointmentURL} Color="gold" OpenInNewTab={true} />
                    }
                </div>

                <div className={`h-[965px] min-w-[70%] max-w-[70%] w-full relative -z-10 ${Direction === "Image first" ? "-mr-[20%]" : "-ml-[20%]"}`}>
                    <Image src={`${Config.cmsUrl}${ImageUrl}`} alt={ImageUrl} fill className="object-cover" />
                </div>
            </div>
        </section>
    );
};