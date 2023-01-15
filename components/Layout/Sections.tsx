import { IDataMain } from "../../pages";

import AdvancedCta from "../Sections/AdvancedCta";
import Blogs from "../Sections/Blogs";
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
    Image?: {
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
                    ) : ""
                })
            }
        </div>
    )
};