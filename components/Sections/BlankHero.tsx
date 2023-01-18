export interface IBlankHero {
    Title: string;
    Text: string;
};

export default function BlankHero({Title, Text}:IBlankHero) {
    return (
        <section className="lg:pt-72 pt-44 lg:pb-20 pb-8">
            <div className="mx-auto container px-7 flex flex-col items-center">
                <h1 className="font-poppins lg:text-7xl text-3xl text-blue font-medium text-center max-w-2xl mb-6 tracking-tighter">{Title}</h1>
                <p className="font-openSans lg:text-2xl text-lg text-blue text-center max-w-2xl">{Text}</p>
            </div>
        </section>
    )
};
