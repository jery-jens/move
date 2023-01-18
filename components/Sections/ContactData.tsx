import ReactMarkdown from "react-markdown";
import { IDataMain } from "../../pages/contact";
import ArrowButton from "../Buttons/ArrowButton";

export interface IContact {
    Title: string;
    Extra: string;
    Main: IDataMain;
};

export default function ContactData({Title, Extra, Main}:IContact) {
    return (
        <section className="bg-grey lg:pt-64 pt-36 pb-12 lg:max-h-[800px]">
            <div className="mx-auto container px-7">
                <div className="grid grid-cols-12">
                    <div className="lg:col-span-7 col-span-full">
                        <h2 className="font-poppins text-blue lg:text-5xl text-3xl font-medium mb-8 tracking-tighter">
                            {Title}
                        </h2>

                        <div className="flex flex-col gap-3 mb-6">
                            <div className="flex items-center gap-3 lg:text-xl text-base font-openSans text-blue">
                                <div className="w-8 h-8 flex items-center">
                                    <img src="/icons/map.png" alt="Map" className="w-5" />
                                </div>

                                {Main.data.attributes.Address ?? ""}
                            </div>
                            <div className="flex items-center gap-3 lg:text-xl text-base font-openSans text-blue">
                                <div className="w-8 h-8 flex items-center">
                                    <img src="/icons/mail.png" alt="Mail" className="w-7" />
                                </div>

                                {Main.data.attributes.Phone ?? ""}
                            </div>
                            <div className="flex items-center gap-3 lg:text-xl text-base font-openSans text-blue">
                                <div className="w-8 h-8 flex items-center">
                                    <img src="/icons/phone.png" alt="Phone" className="w-6" />
                                </div>

                                {Main.data.attributes.Email ?? ""}
                            </div>
                        </div>

                        <ArrowButton 
                            Label="Maak een afspraak"
                            Url={Main.data.attributes.AppointmentURL}
                            OpenInNewTab={true}
                        />

                        <ReactMarkdown className="font-openSans text-sm text-blue opacity-60 max-w-lg mt-8">
                            {Extra}
                        </ReactMarkdown>
                    </div>

                    <div className="lg:col-span-5 col-span-full mt-20">
                        <form className="bg-white p-12 rounded-[30px] shadow-default flex flex-col">
                            <h4 className="font-poppins text-blue font-medium tracking-tighter lg:text-3xl text-xl mb-12">Of stuur ons een bericht</h4>
                            <input className="border-b border-solid border-blue pb-3 lg:text-xl font-openSans px-3 outline-none mb-10" type="email" placeholder="Uw e-mail*" id="email" required />
                            <input className="border-b border-solid border-blue pb-3 lg:text-xl font-openSans px-3 outline-none mb-10" type="phone" placeholder="Uw gsm-nummer" id="phone" required />
                            <textarea className="border-b border-solid border-blue pb-3 lg:text-xl font-openSans px-3 outline-none mb-10" placeholder="Uw bericht*" rows={10} id="message"></textarea>
                            <button className="font-poppins font-medium text-md rounded-full py-4 px-6 inline-flex items-center justify-center gap-3 hover:opacity-70 transition-all ease-in-out duration-300 bg-blue text-white text-center" type="submit">Verstuur bericht</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};