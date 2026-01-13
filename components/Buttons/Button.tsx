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
    const getColorClasses = () => {
        switch (Color?.toLowerCase()) {
            case "gold":
                return "bg-gold text-white";
            case "blue":
                return "bg-blue text-white";
            case "outline":
                return "bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue";
            case "white":
            default:
                return "bg-white text-blue";
        }
    };

    return (
        <Link target={OpenInNewTab ? "_blank" : "_self"} href={Url} className={`${getColorClasses()} font-poppins font-medium text-md rounded-full py-4 px-6 inline-flex items-center justify-center text-center gap-3 hover:opacity-70 transition-all ease-in-out duration-300`}>
            {
                Icon ? <img src={`${Config.cmsUrl}${Icon}`} alt="Icon" className="w-6" /> : ""
            }

            {Label}
        </Link>
    )
};
