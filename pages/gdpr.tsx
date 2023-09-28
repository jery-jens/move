import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import { Config } from "../config";
import { Main } from "../components";
import Loading from "../components/Layout/Loading";

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

export default function Gdpr() {
  const [ loaded, setLoaded ] = useState(false);
  const [ header, setHeader ] = useState<IDataHeader>();
  const [ footer, setFooter ] = useState<IDataFooter>();
  const [ general, setGeneral ] = useState<IDataMain>();

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
        <title>MØVE | GDPR</title>
        <meta name="robots" content="noindex" />
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
        <section className="min-h-screen w-full pt-44 pb-12">
            <div className="container mx-auto px-7 text-blue">
                <h1 className={`font-poppins tracking-tighter} lg:text-4xl text-2xl mb-6`}>GDPR</h1>
                <p className={`text-opensans text-justify`}>
                Op 25 mei 2018 ging de General Data Protection Regulation (GDPR) officieel in. In het Nederlands spreekt men van Algemene Verordening Gegevensbescherming (AVG). Deze Europese regelgeving gaat over de bescherming van verzamelde persoonsgegevens. De AVG regelt het opslaan, bewaren, verwerken en de uitwisseling van gegevens. De praktijk MØVE Langemark verzamelt, verwerkt en deelt alle gegevens conform de AVG. De kinesitherapeut houdt zich aan de wettelijke verplichtingen die hem als zorgverlener zijn opgelegd.
                </p>
            </div>
        </section>
      </Main>
    </>
  ) : (
    <>
      <Loading />
    </>
  )
}
