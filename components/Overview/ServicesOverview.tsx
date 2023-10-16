import { useCallback, useEffect, useState } from "react"
import { Config } from "../../config";
import ReactMarkdown from "react-markdown";

export interface IService {
    attributes: {
        Title: string;
        Text: string;
        RichText: string;
        Background: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
    }
};

export interface IServices {
    data: Array<IService>;
};

export default function ServicesOverview() {
    const [ services, setServices ] = useState<IServices>();

    const getData = useCallback(async () => {
        await fetch(`${Config.apiUrl}services?populate=deep`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then(async (res) => {
              const data = await res.json();
              setServices(data);
          });
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <section className="grid justify-center lg:grid-cols-3 gap-1 lg:py-16 py-8">
            {
                services && services.data.map((service: IService, i: number) => {
                    return (
                        <div key={i} className="w-full lg:p-14 px-7 py-12 h-[450px] bg-blue bg-opacity-90 relative">
                            <h4 className="font-poppins tracking-tighter text-white font-medium lg:text-4xl text-2xl !leading-[130%] mb-4">{service.attributes.Title}</h4>
                            <ReactMarkdown className="font-openSans text-base text-white rich-text">
                                {service.attributes.Text}
                            </ReactMarkdown>
                            <img src={`${Config.cmsUrl}${service.attributes.Background.data.attributes.url}`} alt="Image" className="absolute left-0 top-0 w-full h-full object-cover -z-10" />
                        </div>
                    )
                })
            }
        </section>
    )
};