import ReactMarkdown from "react-markdown";
import { Config } from "../../config";
import { IDataMain } from "../../pages";
import Button from "../Buttons/Button";

export interface IContentWithImage {
    Title: string;
    Text: string;
    Icon: string;
    Image: string;
    Direction: string;
    Appointment: boolean;
    Main?: IDataMain;
    DownloadLabel?: string;
    DownloadFile?: string;
};

export default function ContentWithImage({ Title, Text, Icon, Image, Direction, Appointment, Main, DownloadFile, DownloadLabel }: IContentWithImage) {
    return (
        <section className="lg:py-16 py-8">
            <div className="mx-auto container px-7">
                <div className={`grid lg:grid-cols-2 lg:gap-24 gap-8 items-center`}>
                    <img src={`${Config.cmsUrl}${Image}`} alt="ContentImage" className={`w-full h-full object-cover ${Direction == "Image last" ? "lg:order-2 order-2" : "lg:order-1 order-2"}`} />

                    <div className={`py-12 ${Direction == "Image last" ? "lg:order-1 order-1" : "lg:order-2 order-1"}`}>
                        {
                            Icon && (
                                <img src={`${Config.cmsUrl}${Icon}`} alt="Icon" className="w-20 mb-8" />
                            )
                        }

                        <h2 className="font-poppins tracking-tighter font-medium text-blue lg:text-5xl text-3xl !leading-[150%] mb-8">{Title}</h2>

                        <ReactMarkdown className="text-blue font-openSans lg:text-xl text-base">
                            {Text ?? ""}
                        </ReactMarkdown>

                        {
                            Appointment && (
                                <div className="mt-10">
                                    <Button 
                                        Label="Maak een afspraak"
                                        Color="gold"
                                        Url={Main?.data.attributes.AppointmentURL ?? "/"}
                                        OpenInNewTab
                                    />
                                </div>
                            )
                        }

                        {
                            DownloadFile && (
                                <div className="mt-10">
                                    <Button 
                                        Label={DownloadLabel ?? "Download hier"}
                                        Color="gold"
                                        Url={`${Config.cmsUrl}${DownloadFile}`} 
                                        OpenInNewTab
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
};