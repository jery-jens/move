import Link from "next/link";

export interface IArrowButton {
    Url: string;
    Label: string;
    OpenInNewTab: boolean;
};

export default function ArrowButton({ Url, Label, OpenInNewTab }: IArrowButton) {
    return (
        <Link href={Url} target={OpenInNewTab ? "_blank" : "_self"} className="flex items-center gap-3 font-poppins text-md font-medium text-blue">
            <div className="w-10 h-10 rounded-full bg-gold flex justify-center items-center">
                <img src="/icons/arrow.png" alt="arrow" className="w-4" />
            </div>

            {Label}
        </Link>
    )
};
