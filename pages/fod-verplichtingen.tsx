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

export default function FodVerplichtingen() {
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
        <title>MØVE | FOD Verplichtingen</title>
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
                <h1 className={`font-poppins tracking-tighter} lg:text-4xl text-2xl mb-6`}>FOD Economie -verplichte vermeldingen</h1>
                <p className={`text-opensans text-justify`}>
                Vanuit de FOD Economie zijn wij verplicht om een aantal zaken op onze website en in onze wachtruimte op te nemen om reglementair in orde te zijn. Hieronder vindt u al deze info.
                <br/>
                <br/>
                Gegevens Ondernemingen Niels Boydens - Zaakvoerder MØVE Langemark BE 0725.577.321 Maatschappelijke zetel: Poelkapellestraat 62, 8920 Langemark
                <br/>
                <br/>
                Diploma’s, beroepsorganisatie en verzekeringen Uw therapeut beschikt over een geldig visum en zijn erkend door het RIZIV. Uw therapeut beschikt ook over een beroepsaansprakelijkheidsverzekering. Niels Boydens: BA Beroep bij Amma Verzekeringen, Kunstlaan 39/1, 1040 Brussel
                <br/>
                <br/>
                De dichtstbijzijnde toezichthoudende instantie vindt u op volgend adres : Provinciale Geneeskundige Commissie West-Vlaanderen, FAC Kamgebouw - Koning Albert-I-laan 1/5 - Bus 1, 8000 Brugge, België. Echter is er op heden geen deontologisch controleorgaan voor Kinesitherapeuten.
                <br/>
                <br/>
                Niels Boydens is lid van Axxon, de representatieve beroepsvereniging voor Kinesitherapeuten.
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
