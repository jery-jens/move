import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BlogHero, Main } from "../../components";
import Loading from "../../components/Layout/Loading";
import StandardCta from "../../components/Sections/StandardCta";
import { Config } from "../../config";

export interface IDataHeader {
  data?: {
    attributes: {
      Logo: {
        data: {
          attributes: {
            name: string;
            url: string;
          }
        }
      },
      Navigation: Array<IDataLink>;
    }
  }
};

export interface IDataFooter {
  data?: {
    attributes: {
      Links: [
        {
          Label: string;
          Link: string;
          OpenInNewTab: string;
        }
      ]
    }
  }
};

export interface IDataLink {
  Label: string;
  Link: string;
  OpenInNewTab: boolean;
  Icon?: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
  Color?: string;
};

export interface IDataMain {
  data: {
    attributes: {
      AppointmentURL: string;
      Address: string;
      Phone: string;
      Email: string;
      Openinghours: string;
    }
  }
};
  
export interface IPage {
  blog: {
    attributes: {
      Title: string;
      AuthorName?: string;
      Tag: string;
      Date: string;
      IntroductionTitle: string;
      IntroductionText: string;
      AuthorImage?: {
        data: {
          attributes: {
            url: string;
          }
        }
      };
      Thumbnail: {
        data: {
            attributes: {
                url: string;
            }
        }
      };
      Content?: Array<IContentItem>
    }
  }
};

export interface IContentItem {
  id: number;
  __component: string;
  Title?: string;
  Text?: string;
  Images?: {
    data: Array<IImages>
  }; 
  Image?: IImage;
  Quote?: string;
  AuthorName?: string;
  AuthorAvatar?: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
};


export interface IImages {
  attributes: {
    url: string;
  };
};

export interface IImage {
  data: {
    attributes: {
      url: string;
    };
  };
};

export default function Blog(page: IPage) {
    const [ loaded, setLoaded ] = useState(false);
    const [ header, setHeader ] = useState<IDataHeader>();
    const [ footer, setFooter ] = useState<IDataFooter>();
    const [ general, setGeneral ] = useState<IDataMain>();

    const getData = useCallback(async() => {
        try {
            await fetch(`${Config.apiUrl}header?populate=deep`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
            })
            .then(async (res) => {
                const data = await res.json();
                setHeader(data);
            });
      
            await fetch(`${Config.apiUrl}main?populate=deep`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
            })
            .then(async (res) => {
                const data = await res.json();
                setGeneral(data);
            });
      
            await fetch(`${Config.apiUrl}footer?populate=deep`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
            })
            .then(async (res) => {
                const data = await res.json();
                setFooter(data);
            });
      
            setLoaded(true);
          } catch(e) {
            setLoaded(false);
          };
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return page ? loaded ? (
        <>
            <Head>
                <title>MØVE | {page.blog.attributes.Title ?? ""}</title>
                <meta name="description" content="MØVE Langemark is een jonge praktijk voor kinesitherapie, gevestigd op de Markt te Langemark. Bij MØVE Kinesitherapie kunt u terecht voor revalidatie van letsels aan het bewegingsstelsel." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Main 
                header={{
                    logo: header?.data?.attributes.Logo.data.attributes.url,
                    navigation: header?.data?.attributes.Navigation
                }}
                footer={{
                    Phone: general?.data.attributes.Phone,
                    Email: general?.data.attributes.Email,
                    Address: general?.data.attributes.Address,
                    Openinghours: general?.data.attributes.Openinghours,
                    Links: footer?.data?.attributes.Links,
                }}
            >
              <BlogHero 
                Title={page.blog.attributes.Title}
                Tag={page.blog.attributes.Tag ?? ""}
                AuthorAvatar={page.blog.attributes.AuthorImage?.data ? page.blog.attributes.AuthorImage.data.attributes.url : ""}
                AuthorName={page.blog.attributes.AuthorName ?? ""}
                Thumbnail={page.blog.attributes.Thumbnail.data.attributes.url}
                Date={page.blog.attributes.Date}
              />

              <div className="mx-auto container px-7 lg:py-28 py-14">
                <h2 className="font-poppins text-blue font-semibold tracking-tighter lg:text-4xl text-2xl mb-5">{page.blog.attributes.IntroductionTitle ?? ""}</h2>
                <ReactMarkdown className="font-openSans text-blue opacity-70 lg:text-xl rich-text">
                  {page.blog.attributes.IntroductionText ?? ""}
                </ReactMarkdown>
              </div>

              <div className="flex flex-col lg:gap-28 gap-14 pb-14">
                {
                  page.blog.attributes.Content && page.blog.attributes.Content?.map((item: IContentItem) => {
                    return item.__component == "blog.text-with-image" ? (
                      <div key={item.id} className="mx-auto container px-7">
                        <div className="grid grid-cols-12 lg:gap-24">
                          {
                            item.Text && (
                              <div className={`${item.Image ? "lg:col-span-7 col-span-full" : "col-span-12"}`}>
                                <h4 className="font-poppins tracking-tighter lg:text-3xl text-2xl text-blue font-semibold mb-4">
                                  {item.Title ?? ""}
                                </h4>
                                <ReactMarkdown className="font-openSans text-blue opacity-70 lg:text-base rich-text">
                                  {item.Text ?? ""}
                                </ReactMarkdown>
                              </div>
                            )
                          }
                          {
                            item.Image?.data && (
                              <div className={`${item.Text ? "lg:col-span-5 col-span-full" : "col-span-12"} lg:mt-0 mt-12`}>
                                <div className="h-full min-h-[500px] relative w-full">
                                  <Image src={`${Config.cmsUrl}${item.Image.data.attributes.url ?? ""}`} alt="Image" fill className="object-cover" />
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    ) : item.__component == "blog.images" ? (
                      <div key={item.id}>
                        <Swiper
                          spaceBetween={30}
                          loop
                          grabCursor
                          centeredSlides
                          slidesPerView="auto"
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: true,
                          }}
                          modules={[Autoplay]}
                        >
                          {
                            item.Images && item.Images.data.map((image: IImages, i: number) => {
                              return (
                                <SwiperSlide key={i} className="!w-[300px] !h-[400px] !relative">
                                  <Image src={`${Config.cmsUrl}${image.attributes.url}`} alt="SwiperImage" className="object-cover" fill />
                                </SwiperSlide>
                              )
                            })
                          }
                        </Swiper>
                      </div>
                    ) : (
                      <div key={item.id} className="mx-auto container px-7">
                        <div className="bg-grey lg:p-14 p-7">
                          <img src="/icons/quote.png" alt="Quote" className="w-12 mb-6" />
                          <h2 className="font-poppins text-blue font-medium lg:text-5xl text-3xl tracking-tighter mb-8">{item.Quote ?? ""}</h2>

                          <div className="flex items-center gap-3">
                              {
                                  item.AuthorAvatar && (
                                      <img src={`${Config.cmsUrl}${item.AuthorAvatar.data.attributes.url}`} className="w-14 h-14 rounded-full object-cover" alt="author" />
                                  )
                              }
                              <div className="flex flex-col">
                                  <p className="font-poppins text-blue tracking-tighter font-medium">Auteur</p>
                                  <p className="font-poppins text-blue tracking-tighter font-light">{item.AuthorName ?? ""}</p>
                              </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              {
                general && (
                  <StandardCta 
                    Title="Ontdek zelf hoe we jou kunnen helpen!"
                    Background="/images/dry-needling.png"
                    Main={general}
                  />
                )
              }
          </Main>
        </>
    ) : (
      <></>
    ) : (
      <Loading />
    )
};

export const getStaticPaths = async () => {
  const res = await fetch(`${Config.apiUrl}blogs`);
  const { data } = await res.json();
  const paths = data.map((item: any) => {
      return {
          params: { id: item.id.toString() }
      }
  });

  return {
      paths,
      fallback: false
  };
}

export const getStaticProps = async (context:any) => {
  const res = await fetch(`${Config.apiUrl}blogs/${context.params.id}?populate=deep`);
  const { data } = await res.json();
  return {
      props: { blog: data }
  };
};