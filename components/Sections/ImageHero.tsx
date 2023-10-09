import Image from "next/image";
import { Config } from "../../config";
import { IDataMain } from "../../pages/over-mij";
import ArrowButton from "../Buttons/ArrowButton";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehyperaw from "rehype-raw";
import dompurify from "dompurify";

export interface IImageHero {
    Label: string;
    Title: string;
    Picture: string;
    RichText: string;
    Main?: IDataMain;
};

export default function ImageHero({Label, Title, Picture, Main, RichText}: IImageHero) {
    return (
        <section className="bg-grey lg:pt-64 pt-44 lg:pb-24 pb-0 lg:mb-36 mb-16">
            <div className="mx-auto container px-7 relative">
                <div className="max-w-xl">
                    <span className="text-blue text-opacity-50 font-poppins font-medium lg:text-2xl text-lg tracking-wider uppercase">{Label}</span>
                    <h1 className="text-blue font-poppins tracking-tighter font-medium lg:text-6xl text-4xl mt-2 mb-8">{Title}</h1>
                    <ReactMarkdown rehypePlugins={[rehyperaw]}
                        className="text-blue font-openSans lg:text-xl text-base leading-[150%] mb-9 rich-text">
                        {dompurify.sanitize(RichText)}
                    </ReactMarkdown>
                    <ArrowButton Label="Maak een afspraak" Url={Main?.data.attributes.AppointmentURL ?? ""} OpenInNewTab />

                    <div className="lg:w-[550px] w-full lg:h-[580px] h-[480px] lg:flex hidden absolute right-0 lg:mt-0 mt-10 lg:-top-[80px]">
                        <Image src={`${Config.cmsUrl}${Picture}`} alt="About" className="object-cover" fill />
                    </div>
                </div>
            </div>


            <div className="lg:w-[550px] w-full lg:h-[580px] h-[480px] lg:absolute lg:hidden flex relative right-0 lg:mt-0 mt-10 lg:-top-[80px]">
                <Image src={`${Config.cmsUrl}${Picture}`} alt="About" className="object-cover" fill />
            </div>
        </section>
    )
};