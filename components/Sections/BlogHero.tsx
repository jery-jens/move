import { Config } from "../../config";
import moment from "moment";
import "moment/locale/nl";

export interface IBlogHero {
    Title: string;
    Tag?: string;
    AuthorAvatar?: string;
    AuthorName: string;
    Date: string;
    Thumbnail: string;
};

export default function BlogHero({Title, Tag, AuthorAvatar, AuthorName, Date, Thumbnail}:IBlogHero) {
    moment.locale("nl");

    return (
        <div className="mx-auto container px-7 lg:mt-44 mt-32">
            <section className="bg-blog-gradient h-[500px] overflow-hidden relative w-full lg:px-11 px-6 py-6 flex flex-col justify-end">
                <h4 className="font-poppins text-white lg:text-3xl text-xl opacity-60 tracking-tighter uppercase">#{Tag}</h4>
                <h1 className="font-poppins text-white lg:text-6xl text-3xl tracking-tighter font-medium lg:mt-4">{Title}</h1>

                <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-6 mt-8">
                    <div className="flex items-center gap-3">
                        {
                            AuthorAvatar && (
                                <img src={`${Config.cmsUrl}${AuthorAvatar}`} className="w-14 h-14 rounded-full object-cover" alt="author" />
                            )
                        }
                        <div className="flex flex-col">
                            <p className="font-poppins text-white tracking-tighter font-medium">Auteur</p>
                            <p className="font-poppins text-white tracking-tighter font-light">{AuthorName}</p>
                        </div>
                    </div>

                    <div className="flex items-center font-poppins text-white font-light gap-3">
                        <img src="/icons/calendar.png" className="w-6" alt="Calendar" />
                        {moment(Date).format("D MMMM YYYY")}
                    </div>
                </div>

                <img src={`${Config.cmsUrl}${Thumbnail}`} alt="Thumbnail" className="w-full h-full left-0 top-0 absolute object-cover -z-10" />
            </section>
        </div>
    )
};