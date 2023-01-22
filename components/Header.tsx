import Link from "next/link";
import { useEffect, useState } from "react";
import { Config } from "../config";
import Button from "./Buttons/Button";

export interface IHeader {
    logo?: string;
    navigation?: Array<INavLink>;
};

export interface INavLink {
    Label: string;
    Link: string;
    Color?: string;
    OpenInNewTab: boolean;
    Icon?: {
        data: {
            attributes: {
                url: string;
            }
        }
    };
};

export default function Header({logo, navigation}: IHeader) {
    const [ currentPath, setCurrentPath ] = useState("/");
    const [ showMenu, setShowMenu ] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        setCurrentPath(path);
    });

    return (
        <header className="absolute top-0 left-0 py-10 w-full z-50">
            <div className="container mx-auto px-7 flex items-center justify-between w-full">
                <Link href="/" className="relative z-[101]">
                    <img src={`${Config.cmsUrl}${logo}`} alt="logo" className="lg:w-36 w-28" />
                </Link>

                <div className="lg:flex hidden items-center gap-12">
                    {
                        navigation && navigation.map((item: INavLink) => {
                            return !item.Color ? (
                                <Link key={item.Label} href={item.Link} target={item.OpenInNewTab ? "_blank" : "_self"} className={`font-poppins ${currentPath === item.Link ? "font-bold opacity-50" : "font-medium"} text-md text-blue ease-in-out transition-all duration-200 hover:opacity-70`}>
                                    {item.Label}
                                </Link>
                            ) : (
                                <Button 
                                    key={item.Label}
                                    Label={item.Label} 
                                    Url={item.Link}
                                    Icon={item.Icon?.data.attributes.url}
                                    OpenInNewTab={item.OpenInNewTab}
                                    Color={item.Color}
                                />
                            )
                        })
                    }
                </div>

                <div className="w-8 h-5 relative lg:hidden cursor-pointer z-[103]" onClick={() => setShowMenu(!showMenu)}>
                    <div className={`w-8 h-1 absolute bg-gold left-0 top-0 rounded-full transition-all ease-in-out duration-300 ${showMenu ? "rotate-45" : "rotate-0"}`}></div>
                    <div className={`w-8 h-1 absolute bg-gold left-0 top-0 bottom-0 my-auto rounded-full transition-all ease-in-out duration-300 ${showMenu ? "bottom-auto -rotate-45" : ""}`}></div>
                    <div className={`w-6 h-1 absolute bg-gold right-0 bottom-0 rounded-full transition-all ease-in-out duration-300 ${showMenu ? "opacity-0" : "opacity-100"}`}></div>
                </div>

                <div className={`fixed w-screen h-screen top-0 bg-white z-[100] transition-all ease-in-out duration-300 pt-40 ${showMenu ? "right-0" : "-right-full"}`}>
                    <div className="flex flex-col items-center gap-12">
                        {
                            navigation && navigation.map((item: INavLink) => {
                                return !item.Color ? (
                                    <Link onClick={() => setShowMenu(false)} key={item.Label} href={item.Link} target={item.OpenInNewTab ? "_blank" : "_self"} className={`font-poppins ${currentPath === item.Link ? "font-bold opacity-50" : "font-medium"} text-md text-blue ease-in-out transition-all duration-200 hover:opacity-70`}>
                                        {item.Label}
                                    </Link>
                                ) : (
                                    <Link onClick={() => setShowMenu(false)} target={item.OpenInNewTab ? "_blank" : "_self"} href={item.Link} className={`${item.Color?.toLowerCase() === "gold" ? "bg-gold text-white" : "bg-white text-blue"} font-poppins font-medium text-md rounded-full py-4 px-6 inline-flex items-center gap-3 hover:opacity-70 transition-all ease-in-out duration-300`}>
                                        {
                                            item.Icon ? <img src={`${Config.cmsUrl}${item.Icon.data.attributes.url}`} alt="Icon" className="w-6" /> : ""
                                        }
                            
                                        {item.Label}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </header>
    )
};

