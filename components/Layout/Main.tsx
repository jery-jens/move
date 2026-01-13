import Footer, { IFooter } from "../Footer";
import Header, { IHeader } from "../Header";

export interface IMain {
    header: IHeader;
    footer: IFooter;
    children: any;
    darkBackground?: boolean;
};

import { init } from 'cookie-though'

export default function Main({header, footer, children, darkBackground}: IMain) {
    init({
        "policies": [
          {
            "id": "essential",
            "label": "Essentiële koekjes",
            "description": "Om de website goed te laten functioneren, moeten we enkele technische cookies opslaan.",
            "category": "essential",
          },
          {
            "id": "functional",
            "label": "Functionele cookies",
            "category": "functional",
            "description": "We moeten enkele basisvoorkeuren opslaan, bijvoorbeeld. taal.",
          },
          {
            "id": "statistics",
            "label": "Statistieken",
            "category": "statistics",
            "description": "Om de website goed te laten functioneren, moeten we enkele technische cookies opslaan.",
          },
          {
            "id": "social",
            "label": "Sociale media-cookies",
            "category": "social",
            "description": "Om de website goed te laten functioneren, moeten we enkele sociale cookies opslaan.",
          },
        ],
        "essentialLabel": "Altijd aan",
        "permissionLabels": {
          "accept": "Aanvaarden",
          "acceptAll": "Alles aanvaarden",
          "decline": "Afwijzen"
        },
        "cookiePreferenceKey": "cookie-preferences",
        "header": {
            "title": "Koekjesdeeg?",
            "subTitle": "Je bent deze banners waarschijnlijk beu...",
            "description": "Iedereen wil zich van zijn beste kant laten zien, en wij ook. Daarom gebruiken wij cookies om u een betere ervaring te garanderen."
        },
        "cookiePolicy": {
          "url":"/privacy-policy",
          "label":"Lees de volledige cookieverklaring",
        },
        "customizeLabel": "Aanpassen"
      })
    return (
        <main className="min-h-screen">
            <Header logo={header.logo} navigation={header.navigation} darkBackground={darkBackground} />

            {children}

            <Footer 
                Address={footer.Address}
                Phone={footer.Phone}
                Email={footer.Email}
                Openinghours={footer.Openinghours}
                Links={footer.Links}
            />
        </main>
    )
};
