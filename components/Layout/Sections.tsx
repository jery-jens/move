import { IDataMain } from "../../pages";

import AdvancedCta from "../Sections/AdvancedCta";
import Blogs from "../Sections/Blogs";
import ContentWithImage from "../Sections/ContentWithImage";
import GreyContentImage from "../Sections/GreyContentImage";
import Icons, { IIcon } from "../Sections/Icons";
import Services from "../Sections/Services";
import StandardCta from "../Sections/StandardCta";

export interface IContent {
    Main: IDataMain;
    Content: Array<IContentItem>;
};

export interface IContentItem {
    __component: string;
    Title?: string;
    Text?: string;
    Appointment?: boolean;
    Direction?: string;
    RichText?: string;
    Image?: {
        data: {
            attributes: {
                url: string;
            }
        }
    };
    Icon?: {
        data: {
            attributes: {
                url: string;
            }
        }
    };
    Background?: {
        data: {
            attributes: {
                url: string;
            }
        }
    };
    Icons: Array<IIcon>;
    DownloadLabel?: string;
    DownloadFile?: {
        data: [{
            attributes: {
                url: string;
            }
        }]
    };
};

export default function Sections({ Content, Main }:IContent) {
    return (
        <div className="sections">
            {
                Content && Content.map((item:IContentItem, i:number) => {
                    return item.__component == "sections.grey-content-with-image" ? (
                        <GreyContentImage 
                            key={i}
                            Title={item.Title ?? ""}
                            Text={item.Text ?? ""}
                            Appointment={item.Appointment} 
                            Direction={item.Direction ?? ""}
                            ImageUrl={item.Image?.data.attributes.url ?? ""}
                            Main={Main}
                            RichText={item.RichText ?? ""}
                        />
                    ) : item.__component == "sections.advanced-cta" ? (
                        <AdvancedCta 
                            key={i}
                            Text={item.Text ?? ""}
                            Background={item.Background?.data.attributes.url ?? ""}
                            Main={Main}
                        />
                    ) : item.__component == "sections.icons" ? (
                        <Icons 
                            key={i}
                            Icons={item.Icons}
                        />
                    ) : item.__component == "sections.services" ? (
                        <Services 
                            key={i}
                            Title={item.Title ?? ""}
                            Text={item.Text ?? ""}
                        />
                    ) : item.__component == "sections.blogs" ? (
                        <Blogs 
                            key={i}
                            Title={item.Title ?? ""}
                        />
                    ) : item.__component == "sections.standard-cta" ? (
                        <StandardCta 
                            key={i}
                            Title={item.Title ?? ""}
                            Background={item.Background?.data.attributes.url ?? ""}
                            Main={Main}
                        />
                    ) : item.__component == "sections.content-with-image" ? (
                        <ContentWithImage 
                            key={i}
                            Title={item.Title ?? ""}
                            Text={item.Text ?? ""}
                            Icon={item.Icon?.data.attributes.url ?? ""}
                            Image={item.Image?.data.attributes.url ?? ""}
                            Appointment={item.Appointment ?? false}
                            Direction={item.Direction ?? "Image first"}
                            Main={Main}
                            DownloadFile={item.DownloadFile?.data ? item.DownloadFile?.data[0].attributes.url : ""}
                            DownloadLabel={item.DownloadLabel ?? ""}
                        />
                    ) : ""
                })
            }
        </div>
    )
};