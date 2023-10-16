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

export default function PrivacyPolicy() {
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
        <title>MØVE | Privacy Policy</title>
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
                <h1 className={`font-poppins tracking-tighter} lg:text-4xl text-2xl mb-6`}>Privacy Policy</h1>
                <p className={`text-opensans text-justify`}>
                    Privacy policy voor Niels Boydens, eigenaar van MOVE
                    <br />
                    <br />

                    <strong className="font-bold">1) Waarborgen Privacy</strong>
                    <br />

                    Het waarborgen van de privacy van bezoekers van MOVE is een belangrijke taak voor ons. Daarom beschrijven we in onze privacy policy welke informatie we verzamelen en hoe we deze informatie gebruiken.
                    <br />
                    <br />

                    <strong className="font-bold">2) Toestemming</strong>
                    <br />

                    Door de informatie en de diensten op MOVE te gebruiken, gaat u akkoord met onze privacy policy en de voorwaarden die wij hierin hebben opgenomen.
                    <br />
                    <br />

                    <strong className="font-bold">3) Vragen</strong>
                    <br />
                    
                    Als u meer informatie wilt ontvangen, of vragen hebt over de privacy policy van  Niels Boydens en specifiek MOVE, kun u ons benaderen via e-mail. Ons e-mailadres is jens@jery.be.
                    <br />
                    <br />

                    <strong className="font-bold">4) Monitoren gedrag bezoeker</strong>
                    <br />

                    MOVE maakt gebruik van verschillende technieken om bij te houden wie de website link bezoekt, hoe deze bezoeker zich op de website gedraagt en welke pagina’s worden bezocht. Dat is een gebruikelijke manier van werken voor websites omdat het informatie oplevert op die bijdraagt aan de kwaliteit van de gebruikerservaring. De informatie die we, via cookies, registreren, bestaat uit onder meer IP-adressen, het type browser en de bezochte pagina’s.
                    <br />

                    Tevens monitoren we waar bezoekers de website voor het eerst bezoeken en vanaf welke pagina ze vertrekken. Deze informatie houden we anoniem bij en is niet gekoppeld aan andere persoonlijke informatie.
                    <br />
                    <br />

                    <strong className="font-bold">5) Gebruik van cookies</strong>
                    <br />
                    
                    MOVE plaatst cookies bij bezoekers. Dat doen we om informatie te verzamelen over de pagina’s die gebruikers op onze website bezoeken, om bij te houden hoe vaak bezoekers terug komen en om te zien welke pagina’s het goed doen op de website. Ook houden we bij welke informatie de browser deelt.
                    <br />
                    <br />

                    <strong className="font-bold">6) Cookies uitschakelen</strong>
                    <br />
                    
                    U kunt er voor kiezen om cookies uit te schakelen. Dat doet u door gebruik te maken de mogelijkheden van uw browser. U vindt meer informatie over deze mogelijkheden op de website van de aanbieder van uw browser.
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
