import Image from "next/image";
import { Config } from "../../config";
import { IDataMain } from "../../pages";
import Button from "../Buttons/Button";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export interface IGreyContentImage {
    Title: string;
    Text: string;
    Appointment?: boolean;
    Direction: string;
    ImageUrl: string;
    Main: IDataMain;
    RichText: string;
};

export default function GreyContentImage({ Title, Text, Appointment, Direction, ImageUrl, Main, RichText }: IGreyContentImage) {
    return (
        <section className={`lg:py-16 py-8`}>
            <div className={`mx-auto container lg:gap-0 gap-8 px-7 flex lg:flex-row flex-col items-center ${Direction === "Image first" ? "lg:flex-row-reverse" : "flex-row"}`}>
                <div className="bg-grey lg:p-12 p-6 lg:max-w-[50%] min-w-[50%] w-full flex flex-col items-start">
                    <h2 className="font-poppins text-blue font-medium lg:text-5xl text-3xl tracking-tighter mb-8">
                        {Title}
                    </h2>
                    <ReactMarkdown className="font-openSans text-blue lg:text-xl text-base leading-[150%] mb-12 rich-text">
                        {RichText ?? ""}
                    </ReactMarkdown>
                    {
                        Appointment && <Button Label="Maak een afspraak" Url={Main.data.attributes.AppointmentURL} Color="gold" OpenInNewTab={true} />
                    }
                </div>

                <div className={`lg:h-[965px] h-72 min-w-[70%] lg:max-w-[70%] w-full relative -z-10 ${Direction === "Image first" ? "lg:-mr-[20%]" : "lg:-ml-[20%]"}`}>
                    <Image src={`${Config.cmsUrl}${ImageUrl}`} alt={ImageUrl} fill className="object-cover" />
                </div>
            </div>
        </section>
    );
};