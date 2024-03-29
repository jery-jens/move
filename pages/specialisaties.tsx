import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { BlankHero, Main, ServicesOverview } from "../components";
import Loading from "../components/Layout/Loading";

import Sections, { IContentItem } from "../components/Layout/Sections";
import { Config } from "../config";

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

export interface ISpecialisations {
    data: {
        attributes: {
            Title: string;
            Text: string;
            Content: Array<IContentItem>;
        }
    }
};

export default function Specialisaties() {
    const [ loaded, setLoaded ] = useState(false);
    const [ header, setHeader ] = useState<IDataHeader>();
    const [ footer, setFooter ] = useState<IDataFooter>();
    const [ general, setGeneral ] = useState<IDataMain>();
    const [ page, setPage ] = useState<ISpecialisations>();
  
    const getData = useCallback(async () => {
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
  
        await fetch(`${Config.apiUrl}service-overview?populate=deep`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
        })
        .then(async (res) => {
            const data = await res.json();
            setPage(data);
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
        console.log(e);
      };
    }, []);
  
    useEffect(() => {
      getData();
    }, [getData]);

    return loaded ? (
        <>
            <Head>
                <title>MØVE | Specialisaties</title>
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
                <BlankHero 
                    Title={page?.data.attributes.Title ?? ""}
                    Text={page?.data.attributes.Text ?? ""}
                />
                <ServicesOverview />
                {
                    general && page?.data.attributes?.Content && (
                        <Sections
                            Main={general} 
                            Content={page?.data.attributes?.Content}
                        />
                    )
                }
            </Main>
        </>
    ) : (
        <>
            <Loading />
        </>
    )
};