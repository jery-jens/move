import Link from "next/link";
import { Config } from "../../config";

export interface IButton {
    Label: string;
    Url: string;
    Color?: string;
    OpenInNewTab: boolean;
    Icon?: string;
};

export default function Button({Url, Label, Color, OpenInNewTab, Icon}: IButton) {
    return (
        <Link target={OpenInNewTab ? "_blank" : "_self"} href={Url} className={`${Color?.toLowerCase() === "gold" ? "bg-gold text-white" : "bg-white text-blue"} font-poppins font-medium text-md rounded-full py-4 px-6 inline-flex items-center gap-3 hover:opacity-70 transition-all ease-in-out duration-300`}>
            {
                Icon ? <img src={`${Config.cmsUrl}${Icon}`} alt="Icon" className="w-6" /> : ""
            }

            {Label}
        </Link>
    )
};
