import Head from 'next/head'
import Link from 'next/link'
import { Poppins, Open_Sans } from '@next/font/google'

export const HeadlinerFont = Poppins({ subsets: ['latin'], weight: '500'});
export const ButtonFont = Poppins({ subsets: ['latin'], weight: '500'});
export const TextFont = Open_Sans({ subsets: ['latin'], weight: '400'});

export default function Home() {
  return (
    <>
      <Head>
        <title>MOVE | Coming soon</title>
        <meta name="description" content="MØVE Langemark is een jonge praktijk voor kinesitherapie, gevestigd op de Markt te Langemark. Bij MØVE Kinesitherapie kunt u terecht voor revalidatie van letsels aan het bewegingsstelsel." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen w-full bg-light-gold">
        <div className="container mx-auto px-7 py-16 flex flex-col items-center">
          <img src="/logos/logo.png" alt="logo" className="lg:w-[330px] w-[180px]" />

          <h2 className={`${HeadlinerFont.className} text-blue lg:text-4xl text-xl mt-16 text-center`}>Website coming soon</h2>
          <h1 className={`${HeadlinerFont.className} text-blue lg:text-7xl text-3xl lg:mt-6 mt-3 text-center`}>Opening februari 2023</h1>

          <Link href="" target="_blank" className={`${ButtonFont.className} inline-flex mt-14 items-center gap-3 text-white lg:text-xl text-base bg-gold py-5 px-8 rounded-full hover:opacity-60`}>
            <img src="/icons/calendar.png" alt="calendar" className='"w-6 max-w-[24px]' />
            Maak alvast een afspraak
          </Link>

          <div className="flex mt-11 gap-4 flex-wrap">
            <div className="p-7 bg-transparent-white rounded-2xl flex flex-col items-start gap-4 lg:w-auto w-full">
              <h4 className={`${HeadlinerFont.className} text-blue lg:text-2xl text-xl`}>Zaakvoerder Niels Boydens</h4>
              <Link href="https://www.google.com/maps/place/Markt+38,+8920+Langemark-Poelkapelle/data=!4m2!3m1!1s0x47dcc9427e02c11b:0x135bc9335025e17e?sa=X&ved=2ahUKEwjO6rDKsJ38AhWOXaQEHcQrDyAQ8gF6BAgfEAE" target="_blank" className={`${TextFont.className} lg:text-2xl text-xl text-blue flex items-center gap-2`}>
                <div className="w-[35px]">
                  <img src="/icons/map.png" alt="map" className="w-[21px]" />
                </div>
                Markt 38, 8920 Langemark
              </Link>
              <Link href="mailto:info@move-langemark.be" className={`${TextFont.className} lg:text-2xl text-xl  text-blue flex items-center gap-2`}>
                <div className="w-[35px]">
                  <img src="/icons/mail.png" alt="map" className="w-[27px]" />
                </div>
                info@move-langemark.be              
              </Link>
              <Link href="tel:+32493862426" className={`${TextFont.className} lg:text-2xl text-xl  text-blue flex items-center gap-2`}>
                <div className="w-[35px]">
                  <img src="/icons/phone.png" alt="map" className="w-[27px]" />
                </div>
                0493 86 24 26
              </Link>
            </div>

            <div className="p-7 bg-transparent-blue rounded-2xl flex flex-col items-start gap-4 lg:w-auto w-full">
              <h4 className={`${HeadlinerFont.className} text-blue lg:text-2xl text-xl`}>Specialitaties</h4>
              <p className={`${TextFont.className} lg:text-2xl text-xl  text-blue`}>Algemene kinesitherapie</p>
              <p className={`${TextFont.className} lg:text-2xl text-xl  text-blue`}>Postoperatieve revalidatie</p>
              <p className={`${TextFont.className} lg:text-2xl text-xl  text-blue`}>Sportkinesitherapie</p>
              <p className={`${TextFont.className} lg:text-2xl text-xl  text-blue`}>Manuele therapie</p>
              <p className={`${TextFont.className} lg:text-2xl text-xl  text-blue`}>Dry-needling</p>
            </div>
          </div>

          <div className="bg-transparent-blue py-2 px-4 flex items-center gap-2 rounded-full mt-9">
            <Link href="https://www.instagram.com/move_langemark/" target="_blank">
              <img src="/icons/instagram.png" alt="instagram" className="w-[21px]" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100088869426161" target="_blank">
              <img src="/icons/facebook.png" alt="facebook" className="w-[22px]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
