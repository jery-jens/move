import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Main } from "../../components";
import Sections, { IContentItem } from "../../components/Layout/Sections";
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
        Text: string;
        Label: string;
        Image: {
          data: {
              attributes: {
                  url: string;
              }
          }
        }
        Content: Array<IContentItem>;
      }
    }
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

    return page ? (
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
                {
                    general && page?.blog.attributes?.Content && (
                        <Sections
                            Main={general} 
                            Content={page?.blog.attributes?.Content}
                        />
                    )
                }
            </Main>
        </>
    ) : <></>
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
  }
}

export const getStaticProps = async (context:any) => {
  const res = await fetch(`${Config.apiUrl}blogs/${context.params.id}?populate=deep`);
  const { data } = await res.json();
  return {
      props: { blog: data }
  }
}