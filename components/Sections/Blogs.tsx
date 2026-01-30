import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Config } from "../../config";
import Button from "../Buttons/Button";

export interface IBlogs {
    Title: string;
};

export interface IAllBlogs {
    data: Array<IBlog>;
};

export interface IBlog {
    attributes: {
        Title: string;
        IntroductionText: string;
        Tag: string;
        Thumbnail: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
    }
    id: number;
};

export default function Blogs({ Title }:IBlogs) {
    const [ blogs, setBlogs ] = useState<IAllBlogs>();

    const getData = useCallback(async() => {
        try {
            await fetch(`${Config.apiUrl}blogs?sort[0]=publishedAt&pagination[page]=1&pagination[pageSize]=3&populate=deep`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async (res) => {
                const data: IAllBlogs = await res.json();
                setBlogs(data);
            });
        } catch (e) {
            console.log(e);
        };
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <section className="py-16 border-t-blue border-solid border-t border-opacity-10">
            <div className="mx-auto container px-7">
                <div className="flex lg:flex-row flex-col items-center justify-between">
                    <h2 className="font-poppins text-blue font-medium lg:text-5xl text-3xl tracking-tighter lg:mb-0 mb-6">{Title}</h2>
                    <Button Label="Bekijk meer" Color="gold" Url="/blog" OpenInNewTab={false}  />
                </div>

                <div className="grid grid-cols-3 gap-8 mt-16">
                    {
                        blogs && blogs.data.map((blog: IBlog) => {
                            return (
                                <Link href={`/blogs/${blog.id}`} key={blog.id} className="lg:col-span-1 col-span-3 border-solid border border-blue border-opacity-10">
                                    <div className="relative w-full h-56">
                                        <Image src={`${Config.cmsUrl}${blog.attributes.Thumbnail.data.attributes.url}`} alt="Thumbnail" fill className="object-cover" />
                                    </div>

                                    <div className="lg:px-8 px-4 py-6">
                                        {blog.attributes.Tag && (
                                            <span className="font-poppins text-blue opacity-60 uppercase font-medium text-xl">
                                                #{blog.attributes.Tag}
                                            </span>
                                        )}

                                        <h4 className={`font-poppins text-blue font-medium text-2xl tracking-tighter ${blog.attributes.Tag ? 'mt-2' : ''} mb-4`}>
                                            {blog.attributes.Title}
                                        </h4>

                                        <p className="font-openSans text-blue text-base mb-10">
                                            {blog.attributes.IntroductionText}
                                        </p>

                                        <div className="flex justify-end font-poppins font-semibold text-blue text-base underline">
                                            Lees meer
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
};