import { Config } from "../../config";

export interface IIcons {
    Icons: Array<IIcon>;
};

export interface IIcon {
    Title: string;
    Text: string;
    Icon: {
        data: {
            attributes: {
                url: string;
            }
        }
    };
};

export default function Icons({Icons}:IIcons) {
    return (
        <section className="bg-grey pb-32 pt-80 -mt-64 mb-16 relative -z-20">
            <div className="mx-auto container px-7 flex gap-14">
                {
                    Icons && Icons.map((icon:IIcon) => {
                        return (
                            <div className="w-full flex flex-col items-center">
                                <div className="bg-blue w-16 h-16 rounded flex justify-center items-center mb-4">
                                    <img src={`${Config.cmsUrl}${icon.Icon.data.attributes.url}`} alt="Icon" className="w-7" />
                                </div>

                                <h3 className="text-blue font-poppins font-medium tracking-tighter text-center text-xl mb-2">{icon.Title}</h3>
                                <p className="text-blue font-openSans font-normal text-center text-base">{icon.Text}</p>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
};