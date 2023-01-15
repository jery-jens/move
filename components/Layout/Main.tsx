import Footer, { IFooter } from "../Footer";
import Header, { IHeader } from "../Header";

export interface IMain {
    header: IHeader;
    footer: IFooter;
    children: any;
};

export default function Main({header, footer, children}: IMain) {
    return (
        <main className="min-h-screen">
            <Header logo={header.logo} navigation={header.navigation} />

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
