import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import { Config } from "../config";
import { Main, Button } from "../components";
import { IDataHeader, IDataFooter, IDataMain } from "./index";
import Loading from "../components/Layout/Loading";

// Placeholder data - used when CMS has no content
const defaultHeroData = {
    title: "Maximaliseer je duurprestaties",
    subtitle: "Wetenschappelijke lactaattesten en persoonlijke begeleiding voor optimale trainingszones en progressie",
    primaryButton: { label: "Onze Formules", url: "#formules" },
    secondaryButton: { label: "Over de Test", url: "#info" }
};

const defaultPracticalInfoData = {
    title: "Praktische informatie",
    subtitle: "Wat moet je weten voor je test?",
    sections: [
        {
            icon: "clipboard",
            title: "Hoe bereid ik me voor?",
            items: [
                "Bereid je voor zoals op een wedstrijd (uitgerust, gemotiveerd, gehydrateerd)",
                "Geen zware inspanningen 2 dagen voor de test",
                "Geen alcohol dag voor de test",
                "Koolhydraatrijke voeding laatste 2 dagen",
                "Licht verteerbaar eten tot 2 uur voor test (banaan, sportreep, etc.)",
                "Vermijd vetten/eiwitten dag van de test",
                "Voldoende nachtrust!"
            ]
        },
        {
            icon: "bag",
            title: "Wat breng ik mee?",
            text: "Je bereidt je voor zoals op een wedstrijd, dus breng je eigen loopschoenen en fiets mee."
        },
        {
            icon: "medical",
            title: "Ben ik sportmedisch geschikt?",
            text: "Je hebt nodig:",
            items: [
                "Geldig sportmedisch attest (<2 jaar oud) OF wedstrijdlicentie",
                "Of vul de vragenlijst in op www.sportkeuring.be:",
            ],
            subItems: [
                "Selecteer \"Ik wil info over sportmedisch onderzoek\"",
                "Vul geboortedatum en geslacht in",
                "Kies \"cyclosportief fietsevenement\" of \"meer dan 8km lopen\"",
                "Volledig invullen"
            ],
            footer: "Groen = OK, Oranje/Rood = contacteer ons voor opties"
        }
    ],
    images: [] as string[]
};

const defaultPricingData = {
    title: "Onze formules",
    subtitle: "Kies de begeleiding die past bij jouw ambitie en niveau",
    plans: [
        {
            name: "Critical Power Test",
            description: "Inclusief 3 maanden trainingsschema",
            price: "70",
            unit: "pakket",
            featured: false,
            features: [
                { icon: "star", text: "Nauwkeuriger dan klassieke FTP-test" },
                { icon: "chart", text: "Analyse van aerobe/anaerobe systemen" },
                { icon: "calendar", text: "3 maanden trainingsschema" },
                { icon: "target", text: "Optimalisatie van intervaltrainingen" }
            ]
        },
        {
            name: "Lactaattest - Instap",
            description: "Ideaal voor een eerste meting en basisadvies",
            price: "110",
            unit: "test",
            featured: false,
            features: [
                { icon: "check", text: "Eén nauwkeurige lactaattest" },
                { icon: "check", text: "Bepaling van drempels & trainingszones" },
                { icon: "check", text: "Advies voor optimalisatie" }
            ]
        },
        {
            name: "Lactaattest - Basis Traject",
            description: "Voor gestructureerde progressie",
            price: "145",
            unit: "traject",
            featured: true,
            features: [
                { icon: "check", text: "Alles uit Instap" },
                { icon: "check", text: "Persoonlijk schema voor 3 maanden" },
                { icon: "check", text: "Gericht werken aan meetbare progressie" },
                { icon: "check", text: "E-mail support" }
            ]
        },
        {
            name: "Premium Coaching",
            description: "Voor ambitieuze sporters met een doel",
            price: "60",
            unit: "maand",
            featured: false,
            features: [
                { icon: "check", text: "1 lactaattest inbegrepen" },
                { icon: "check", text: "10% korting op extra testen" },
                { icon: "check", text: "Maandelijkse optimalisatie schema" },
                { icon: "check", text: "Toegang tot online platform" },
                { icon: "check", text: "Unlimited vragen" }
            ]
        }
    ]
};

const defaultTestimonialsData = {
    title: "Wat zeggen onze sporters?",
    testimonials: [
        {
            name: "Thomas V.",
            role: "10km loper",
            quote: "Door de lactaattest begreep ik eindelijk in welke zone ik moest trainen. Mijn 10km tijd ging van 52 naar 46 minuten in 3 maanden!"
        },
        {
            name: "Sarah L.",
            role: "Triatleet",
            quote: "De Premium Coaching heeft me geholpen om mijn eerste halve Ironman te voltooien zonder tegen de man met de hamer aan te lopen."
        },
        {
            name: "Michiel D.",
            role: "Wielrenner",
            quote: "Na jaren rondjes rijden zonder echt progressie te boeken, gaf het Basis Traject me duidelijke richtlijnen en structuur."
        }
    ]
};

const defaultCtaData = {
    title: "Start vandaag met efficiënter trainen",
    subtitle: "Boek je lactaattest of vraag meer informatie aan via onderstaand formulier",
    buttonLabel: "Contacteer ons",
    buttonUrl: "/contact"
};

interface ILactaattestPage {
    data?: {
        attributes: {
            HeroTitle?: string;
            HeroSubtitle?: string;
            HeroImage?: { data?: { attributes: { url: string } } };
            PrimaryButtonLabel?: string;
            PrimaryButtonUrl?: string;
            SecondaryButtonLabel?: string;
            SecondaryButtonUrl?: string;
            InfoTitle?: string;
            InfoSubtitle?: string;
            InfoItems?: Array<{
                Icon?: { data?: { attributes: { url: string } } };
                Title: string;
                Description?: string;
                BulletPoints?: string[];
                SubBulletPoints?: string[];
                FooterText?: string;
            }>;
            InfoImages?: { data?: Array<{ attributes: { url: string } }> };
            PricingTitle?: string;
            PricingSubtitle?: string;
            PricingPlans?: Array<{
                Name: string;
                Description?: string;
                Price: string;
                Unit?: string;
                Featured?: boolean;
                Features?: Array<{
                    Text: string;
                    IconType?: string;
                }>;
            }>;
            Testimonials?: Array<{
                Quote: string;
                Author: string;
                Role?: string;
            }>;
            CtaTitle?: string;
            CtaSubtitle?: string;
            CtaButtonLabel?: string;
            CtaButtonUrl?: string;
        };
    };
}

interface IPracticalSection {
    icon?: string;
    iconUrl?: string;
    title: string;
    text?: string;
    items?: string[];
    subItems?: string[];
    footer?: string;
}

interface IPricingFeature {
    icon: string;
    text: string;
}

interface IPricingPlan {
    name: string;
    description: string;
    price: string;
    unit: string;
    featured: boolean;
    features: IPricingFeature[];
}

interface ITestimonial {
    name: string;
    role: string;
    quote: string;
}

export default function Lactaattest() {
    const [loaded, setLoaded] = useState(false);
    const [header, setHeader] = useState<IDataHeader>();
    const [footer, setFooter] = useState<IDataFooter>();
    const [general, setGeneral] = useState<IDataMain>();
    const [pageData, setPageData] = useState<ILactaattestPage>();

    const getData = useCallback(async () => {
        try {
            await fetch(`${Config.apiUrl}header?populate=deep`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(async (res) => {
                const data = await res.json();
                setHeader(data);
            });

            await fetch(`${Config.apiUrl}main?populate=deep`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(async (res) => {
                const data = await res.json();
                setGeneral(data);
            });

            await fetch(`${Config.apiUrl}footer?populate=deep`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(async (res) => {
                const data = await res.json();
                setFooter(data);
            });

            // Fetch lactaattest page data
            try {
                const res = await fetch(`${Config.apiUrl}lactaattest-page?populate=deep`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const data = await res.json();
                // Only set page data if it has valid data (not an error)
                if (data?.data?.attributes) {
                    setPageData(data);
                } else {
                    console.log("Lactaattest page: No data or error from CMS", data);
                    setPageData(undefined);
                }
            } catch (err) {
                // If the endpoint doesn't exist yet, use defaults
                console.log("Lactaattest page: Fetch error", err);
                setPageData(undefined);
            }

            setLoaded(true);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    // Build data with CMS fallback to defaults
    const attrs = pageData?.data?.attributes;

    const heroImage = attrs?.HeroImage?.data?.attributes?.url
        ? `${Config.cmsUrl}${attrs.HeroImage.data.attributes.url}`
        : null;

    const heroData = {
        title: attrs?.HeroTitle || defaultHeroData.title,
        subtitle: attrs?.HeroSubtitle || defaultHeroData.subtitle,
        image: heroImage,
        primaryButton: {
            label: attrs?.PrimaryButtonLabel || defaultHeroData.primaryButton.label,
            url: attrs?.PrimaryButtonUrl || defaultHeroData.primaryButton.url
        },
        secondaryButton: {
            label: attrs?.SecondaryButtonLabel || defaultHeroData.secondaryButton.label,
            url: attrs?.SecondaryButtonUrl || defaultHeroData.secondaryButton.url
        }
    };

    const cmsInfoSections = attrs?.InfoItems && attrs.InfoItems.length > 0
        ? attrs.InfoItems.map(item => ({
            iconUrl: item.Icon?.data?.attributes?.url ? `${Config.cmsUrl}${item.Icon.data.attributes.url}` : undefined,
            title: item.Title,
            text: item.Description || undefined,
            items: item.BulletPoints || undefined,
            subItems: item.SubBulletPoints || undefined,
            footer: item.FooterText || undefined
        }))
        : null;

    const practicalInfoData = {
        title: attrs?.InfoTitle || defaultPracticalInfoData.title,
        subtitle: attrs?.InfoSubtitle || defaultPracticalInfoData.subtitle,
        sections: cmsInfoSections || defaultPracticalInfoData.sections,
        images: attrs?.InfoImages?.data?.map(img => `${Config.cmsUrl}${img.attributes.url}`) || defaultPracticalInfoData.images
    };

    const cmsPricingPlans = attrs?.PricingPlans && attrs.PricingPlans.length > 0
        ? attrs.PricingPlans.map(plan => ({
            name: plan.Name,
            description: plan.Description || "",
            price: plan.Price,
            unit: plan.Unit || "pakket",
            featured: plan.Featured || false,
            features: plan.Features?.map(f => ({
                icon: f.IconType?.toLowerCase() || "check",
                text: f.Text
            })) || []
        }))
        : null;

    const pricingData = {
        title: attrs?.PricingTitle || defaultPricingData.title,
        subtitle: attrs?.PricingSubtitle || defaultPricingData.subtitle,
        plans: cmsPricingPlans || defaultPricingData.plans
    };

    const cmsTestimonials = attrs?.Testimonials && attrs.Testimonials.length > 0
        ? attrs.Testimonials.map(t => ({
            name: t.Author,
            role: t.Role || "",
            quote: t.Quote
        }))
        : null;

    const testimonialsData = {
        title: defaultTestimonialsData.title,
        testimonials: cmsTestimonials || defaultTestimonialsData.testimonials
    };

    const ctaData = {
        title: attrs?.CtaTitle || defaultCtaData.title,
        subtitle: attrs?.CtaSubtitle || defaultCtaData.subtitle,
        buttonLabel: attrs?.CtaButtonLabel || defaultCtaData.buttonLabel,
        buttonUrl: attrs?.CtaButtonUrl || defaultCtaData.buttonUrl
    };

    return loaded ? (
        <>
            <Head>
                <title>MØVE | Lactaattest & Coaching</title>
                <meta name="description" content="Wetenschappelijke lactaattesten en persoonlijke begeleiding voor optimale trainingszones en progressie." />
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
                darkBackground={true}
            >
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    {/* Background image with blur */}
                    {heroData.image && (
                        <div className="absolute inset-0 bg-cover bg-center scale-110" style={{ backgroundImage: `url('${heroData.image}')` }} />
                    )}
                    <div className={`absolute inset-0 ${heroData.image ? 'backdrop-blur-sm bg-blue/60' : 'bg-blue'}`} />
                    <div className="container mx-auto px-7 lg:pt-48 pt-36 lg:pb-32 pb-20 relative z-10">
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                            <h1 className="text-white font-poppins tracking-tighter font-medium lg:text-6xl text-4xl lg:mb-6 mb-4">
                                {heroData.title}
                            </h1>
                            <p className="text-white text-opacity-90 font-openSans lg:text-xl text-lg leading-[150%] mb-8">
                                {heroData.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Button
                                    Label={heroData.primaryButton.label}
                                    Url={heroData.primaryButton.url}
                                    Color="white"
                                    OpenInNewTab={false}
                                />
                                <Button
                                    Label={heroData.secondaryButton.label}
                                    Url={heroData.secondaryButton.url}
                                    Color="outline"
                                    OpenInNewTab={false}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Practical Info Section */}
                <section id="info" className="bg-grey lg:py-20 py-12">
                    <div className="container mx-auto px-7">
                        <div className="text-center mb-12">
                            <h2 className="text-blue font-poppins tracking-tighter font-medium lg:text-5xl text-3xl mb-4">
                                {practicalInfoData.title}
                            </h2>
                            <p className="text-blue text-opacity-70 font-openSans lg:text-lg text-base">
                                {practicalInfoData.subtitle}
                            </p>
                        </div>

                        <div className="flex lg:flex-row flex-col gap-12">
                            {/* Left column - Info sections */}
                            <div className="lg:w-1/2 space-y-8">
                                {practicalInfoData.sections.map((section: IPracticalSection, idx: number) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                                            {section.iconUrl ? (
                                                <img src={section.iconUrl} alt="" className="w-5 h-5 object-contain" />
                                            ) : (
                                                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {section.icon === "clipboard" && (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                    )}
                                                    {section.icon === "bag" && (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    )}
                                                    {section.icon === "medical" && (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    )}
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-blue font-poppins font-medium text-lg mb-2">
                                                {section.title}
                                            </h3>
                                            {section.text && (
                                                <p className="text-blue text-opacity-70 font-openSans text-base mb-2">
                                                    {section.text}
                                                </p>
                                            )}
                                            {section.items && (
                                                <ul className="space-y-1">
                                                    {section.items.map((item: string, itemIdx: number) => (
                                                        <li key={itemIdx} className="text-blue text-opacity-70 font-openSans text-sm flex items-start gap-2">
                                                            <span className="text-gold mt-1">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {section.subItems && (
                                                <ul className="ml-4 mt-2 space-y-1">
                                                    {section.subItems.map((item: string, itemIdx: number) => (
                                                        <li key={itemIdx} className="text-blue text-opacity-60 font-openSans text-sm flex items-start gap-2">
                                                            <span className="text-gold mt-1">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {section.footer && (
                                                <p className="text-gold font-openSans text-sm mt-2 font-medium">
                                                    {section.footer}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right column - Images */}
                            <div className="lg:w-1/2 flex flex-col gap-4">
                                {practicalInfoData.images.length > 0 ? (
                                    practicalInfoData.images.map((img: string, idx: number) => (
                                        <div key={idx} className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                                            <img src={img} alt={`Afbeelding ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden bg-blue/10">
                                            <div className="absolute inset-0 flex items-center justify-center text-blue/30 font-poppins">
                                                Afbeelding 1
                                            </div>
                                        </div>
                                        <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden bg-blue/10">
                                            <div className="absolute inset-0 flex items-center justify-center text-blue/30 font-poppins">
                                                Afbeelding 2
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="formules" className="lg:py-20 py-12">
                    <div className="container mx-auto px-7">
                        <div className="text-center mb-16">
                            <h2 className="text-blue font-poppins tracking-tighter font-medium lg:text-5xl text-3xl mb-4">
                                {pricingData.title}
                            </h2>
                            <p className="text-blue text-opacity-70 font-openSans lg:text-lg text-base">
                                {pricingData.subtitle}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
                            {pricingData.plans.map((plan: IPricingPlan, idx: number) => (
                                <div
                                    key={idx}
                                    className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                                        plan.featured
                                            ? "bg-grey"
                                            : "bg-grey"
                                    }`}
                                >
                                    {plan.featured && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-poppins font-medium px-4 py-1.5 rounded-full shadow-sm">
                                            Populair
                                        </div>
                                    )}

                                    <h3 className="text-blue font-poppins font-medium text-xl mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-blue text-opacity-50 font-openSans text-sm mb-6 min-h-[40px]">
                                        {plan.description}
                                    </p>

                                    <div className="mb-8 pb-6 border-b border-blue border-opacity-10">
                                        <span className="text-gold font-poppins font-medium text-4xl">
                                            €{plan.price}
                                        </span>
                                        <span className="text-blue text-opacity-50 font-openSans text-sm">
                                            {" "}/ {plan.unit}
                                        </span>
                                    </div>

                                    <ul className="space-y-4 flex-grow">
                                        {plan.features.map((feature: IPricingFeature, featureIdx: number) => (
                                            <li key={featureIdx} className="flex items-start gap-3">
                                                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                                    feature.icon === "check"
                                                        ? "bg-gold bg-opacity-10"
                                                        : "bg-blue bg-opacity-5"
                                                }`}>
                                                    <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        {feature.icon === "check" && (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        )}
                                                        {feature.icon === "star" && (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                        )}
                                                        {feature.icon === "chart" && (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        )}
                                                        {feature.icon === "calendar" && (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        )}
                                                        {feature.icon === "target" && (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        )}
                                                    </svg>
                                                </div>
                                                <span className="text-blue text-opacity-70 font-openSans text-sm leading-relaxed">
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Button
                                Label="Meer informatie"
                                Url="/contact"
                                Color="gold"
                                OpenInNewTab={false}
                            />
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-grey lg:py-20 py-12">
                    <div className="container mx-auto px-7">
                        <div className="text-center mb-12">
                            <h2 className="text-blue font-poppins tracking-tighter font-medium lg:text-5xl text-3xl">
                                {testimonialsData.title}
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {testimonialsData.testimonials.map((testimonial: ITestimonial, idx: number) => (
                                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                                            <span className="text-gold font-poppins font-medium text-lg">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-blue font-poppins font-medium text-base">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-gold font-openSans text-sm">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-blue text-opacity-70 font-openSans text-base leading-relaxed">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue lg:py-20 py-12">
                    <div className="container mx-auto px-7 text-center">
                        <h2 className="text-white font-poppins tracking-tighter font-medium lg:text-4xl text-2xl mb-4">
                            {ctaData.title}
                        </h2>
                        <p className="text-white text-opacity-70 font-openSans lg:text-lg text-base mb-8 max-w-xl mx-auto">
                            {ctaData.subtitle}
                        </p>
                        <Button
                            Label={ctaData.buttonLabel}
                            Url={ctaData.buttonUrl}
                            Color="white"
                            OpenInNewTab={false}
                        />
                    </div>
                </section>
            </Main>
        </>
    ) : (
        <Loading />
    );
}
