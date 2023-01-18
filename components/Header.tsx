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

    useEffect(() => {
        const path = window.location.pathname;
        setCurrentPath(path);
    });

    return (
        <header className="absolute top-0 left-0 py-10 w-full z-50">
            <div className="container mx-auto px-7 flex items-center justify-between w-full">
                <Link href="/">
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
            </div>
        </header>
    )
};

