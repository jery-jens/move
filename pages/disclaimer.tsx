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

export default function Disclaimer() {
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
                    <h1 className={`font-poppins tracking-tighter lg:text-4xl text-2xl mb-6`}>Terms & Conditions</h1>
                    <p className={`font-openSans text-justify`}>
                        Op deze pagina vindt u de algemene voorwaarden van MOVE , zoals deze beschikbaar is gesteld door Niels Boydens . In deze algemene voorwaarden geven wij aan onder welk voorbehoud wij de informatie op onze website aan u aanbieden.
                        <br />
                        <br />

                        <strong className="font-bold">Intellectueel eigendom</strong>
                        <br />

                        Het gebruik van de informatie op deze website is gratis zolang u deze informatie niet kopieert, verspreidt of op een andere manier gebruikt of misbruikt. U mag de informatie op deze website alleen hergebruiken volgens de regelingen van het dwingend recht.
                        <br />
                        Zonder uitdrukkelijke schriftelijke toestemming van Niels Boydens is het niet toegestaan tekst, fotomateriaal of andere materialen op deze website her te gebruiken. Het intellectueel eigendom berust bij Niels Boydens.
                        <br />
                        <br />

                        <strong className="font-bold">Indien van toepassing:</strong>
                        <br />

                        Voor de prijzen die op onze website staan, geldt dat wij streven naar een zo zorgvuldig mogelijke weergave van de realiteit en de bedoelde prijzen. Fouten die daarbij ontstaan en herkenbaar zijn als programmeer dan wel typefouten, vormen nooit een aanleiding om een contract dan wel overeenkomst met Niels Boydens te mogen claimen of te veronderstellen.

                        Niels Boydens streeft naar een zo actueel mogelijke website. Mocht ondanks deze inspanningen de informatie van of de inhoud op MOVE onvolledig en of onjuist zijn, dan kunnen wij daarvoor geen aansprakelijkheid aanvaarden.

                        De informatie en/of producten op deze website worden aangeboden zonder enige vorm van garantie en of aanspraak op juistheid. Wij behouden ons het recht voor om deze materialen te wijzigen, te verwijderen of opnieuw te plaatsen zonder enige voorafgaande mededeling. Niels Boydens aanvaardt geen aansprakelijkheid voor enige informatie die op websites staat waarnaar wij via hyperlinks verwijzen.
                        <br />
                        <br />

                        <strong className="font-bold">Wijzigingen</strong>
                        <br />
                        
                        Mochten deze algemene voorwaarden wijzigen, dan vindt u de meest recente versie van de disclaimer van MOVE op deze pagina.
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