import Link from "next/link";

import ReactMarkdown from "react-markdown";

export interface IFooter {
    Address?: string;
    Phone?: string;
    Email?: string;
    Facebook?: string;
    Instagram?: string;
    Openinghours?: string;
    Links?: Array<IFooterLink>;
};

export interface IFooterLink {
    Label: string;
    Link: string;
    OpenInNewTab: string;
}

export default function Footer({Address, Phone, Email, Facebook, Instagram, Openinghours, Links}:IFooter) {
    return (
        <footer className="border-t border-t-blue border-opacity-10 border-solid">
            <div className="mx-auto container px-7 py-16 flex gap-14">
                <div className="w-full">
                    <h4 className="font-poppins font-semibold uppercase tracking-wider text-xl mb-4">Contact</h4>

                    <div className="flex flex-col gap-3 mb-8">
                        <div className="flex items-center gap-3 text-xl font-openSans text-blue">
                            <div className="w-8 h-8 flex items-center">
                                <img src="/icons/map.png" alt="Map" className="w-5" />
                            </div>

                            {Address}
                        </div>
                        <div className="flex items-center gap-3 text-xl font-openSans text-blue">
                            <div className="w-8 h-8 flex items-center">
                                <img src="/icons/mail.png" alt="Mail" className="w-7" />
                            </div>

                            {Email}
                        </div>
                        <div className="flex items-center gap-3 text-xl font-openSans text-blue">
                            <div className="w-8 h-8 flex items-center">
                                <img src="/icons/phone.png" alt="Phone" className="w-6" />
                            </div>

                            {Phone}
                        </div>
                    </div>

                    <h4 className="font-poppins font-semibold uppercase tracking-wider text-xl mb-3">Socials</h4>

                    <div className="flex items-center gap-3">
                        <Link href={"/"}>
                            <img src="/icons/instagram.png" alt="Instagram" className="w-7" />
                        </Link>
                        <Link href={"/"}>
                            <img src="/icons/facebook.png" alt="Facebook" className="w-7" />
                        </Link>
                    </div>
                </div>

                <div className="w-full">
                    <h4 className="font-poppins font-semibold uppercase tracking-wider text-xl mb-4">Openingsuren</h4>

                    <ReactMarkdown className="text-blue font-openSans text-xl">
                        {Openinghours ?? ""}
                    </ReactMarkdown>
                </div>

                <div className="w-full">
                    <h4 className="font-poppins font-semibold uppercase tracking-wider text-xl mb-4">Navigatie</h4>

                    <div className="flex flex-col gap-1 items-start">
                        {
                            Links && Links.map((link:IFooterLink, i:number) => {
                                return <Link key={i} className="text-blue underline font-openSans text-xl" href={link.Link} target={link.OpenInNewTab ? "_blank" : "_self"}>{link.Label}</Link>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="bg-blue py-5">
                <div className="mx-auto container px-7 flex justify-between items-center">
                    <span className="font-openSans text-sm text-white">
                        © Copyright MOVE, {new Date().getFullYear()}
                    </span>

                    <div className="flex items-center gap-3 font-openSans text-white text-sm">
                        Build by
                        <Link href="https://jery.be" target="_blank">
                            <img src="/logos/jery.png" alt="Jery" className="w-14" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
};