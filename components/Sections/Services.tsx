import { useCallback, useEffect, useState } from "react";
import { Config } from "../../config";

export interface IServices {
    Title: string;
    Text: string;
};

export default function Services({ Title, Text }: IServices) {
    const [ services, setServices ] = useState();

    const getData = useCallback(async () => {
        try {
          await fetch(`${Config.apiUrl}services?populate=deep`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then(async (res) => {
              const data = await res.json();
              setServices(data);
          });
        } catch(e) {
          console.log(e);
        };
    }, []);

    useEffect(() => {
        getData()
    }, [getData]);

    return (
        <section className="py-16">
            <div className="mx-auto container px-7 flex flex-col items-center gap-5">
                <h2 className="font-poppins text-blue font-medium text-5xl tracking-tighter text-center">{Title}</h2>
                <p className="max-w-2xl font-openSans text-blue text-xl leading-[150%] font-normal text-center">{Text}</p>

                <div className="">
                    
                </div>
            </div>
        </section>
    )
};