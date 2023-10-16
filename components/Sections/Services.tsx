import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ReactMarkdown from "react-markdown";

import { Config } from "../../config";
import Button from "../Buttons/Button";

export interface IServices {
    Title: string;
    Text: string;
};

export interface IAllServices {
    data: Array<IService>
};

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

export default function Services({ Title, Text }: IServices) {
    const [ services, setServices ] = useState<IAllServices>();

    const getData = useCallback(async () => {
        try {
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
        } catch(e) {
          console.log(e);
        };
    }, []);

    useEffect(() => {
        getData()
    }, [getData]);

    return (
        <section className="py-16 overflow-hidden w-screen">
            <div className="mx-auto container px-7 flex flex-col items-center gap-5">
                <h2 className="font-poppins text-blue font-medium lg:text-5xl text-3xl tracking-tighter text-center">{Title}</h2>
                <p className="max-w-2xl font-openSans text-blue lg:text-xl text-base leading-[150%] font-normal text-center mb-2">{Text}</p>
                <Button 
                    Url="/specialisaties"
                    Label="Bekijk meer"
                    Color="gold"
                    OpenInNewTab={false}
                />
            </div>

            <div className="mt-20">
                {
                    services && (
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={30}
                            grabCursor
                            pagination={{
                                dynamicBullets: true,
                            }}
                            loop
                            centeredSlides
                            modules={[Pagination]}
                            className="mx-auto container px-7 !overflow-visible"
                        >
                            {
                                services && services.data.map((service: IService, i: number) => {
                                    return (
                                        <SwiperSlide
                                            className="lg:!w-[400px] !w-[300px]"
                                            key={i}
                                        >
                                            <div className="w-full lg:p-14 p-10 h-[600px] bg-blue bg-opacity-90 relative">
                                                <h4 className="font-poppins tracking-tighter text-white font-medium lg:text-4xl text-2xl !leading-[130%] mb-4">{service.attributes.Title}</h4>

                                                <ReactMarkdown className="font-openSans text-base text-white rich-text">
                                                    {service.attributes.Text}
                                                </ReactMarkdown>

                                                <img src={`${Config.cmsUrl}${service.attributes.Background.data.attributes.url}`} alt="Image" className="absolute left-0 top-0 w-full h-full object-cover -z-10" />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    )
                }
            </div>
        </section>
    )
};