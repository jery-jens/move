import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react"
import { Config } from "../../config";

export interface IBlogs {
    data: Array<IBlog>;
    meta: {
        pagination: {
            page: number;
            pageCount: number;
        }
    }
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

export interface IPagination {
    pages: Array<IPaginated>;
};

export interface IPaginated {
    page: number;
    active: boolean;
}

export default function BlogOverview() {
    const [ blogs, setBlogs ] = useState<IBlogs>();
    const [ pages, setPages ] = useState<IPagination>();

    const getData = useCallback(async() => {
        try {
            await fetch(`${Config.apiUrl}blogs?sort[0]=publishedAt&pagination[page]=1&pagination[pageSize]=12&populate=deep`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async (res) => {
                const data: IBlogs = await res.json();
                setBlogs(data);
                
                const paginatedPages = [];

                for (let i = 0; i < data.meta.pagination.pageCount; i++) {
                  paginatedPages.push({
                    page: i+1,
                    active: i == 0 ? true : false,
                  });
                };

                setPages({pages: paginatedPages});
            });
        } catch (e) {
            console.log(e);
        };
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const changePage = async (index: number) => {        
        if (blogs) {
            await fetch(`${Config.apiUrl}blogs?sort[0]=publishedAt&pagination[page]=${index+1}&pagination[pageSize]=12&populate=deep`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async (res) => {
                const data: IBlogs = await res.json();
                setBlogs(data);
                
                const paginatedPages = [];

                for (let i = 0; i < data.meta.pagination.pageCount; i++) {
                  paginatedPages.push({
                    page: i+1,
                    active: index == i ? true : false,
                  });
                };

                setPages({pages: paginatedPages});
                console.log(paginatedPages);
            });
        };
    };

    return (
        <section className="mb-16">
            <div className="mx-auto container px-7">
                <div className="grid grid-cols-3 gap-8 mb-16">
                    {
                        blogs && blogs.data.map((blog: IBlog) => {
                            return (
                                <Link href={`/blogs/${blog.id}`} key={blog.id} className="lg:col-span-1 col-span-3 border-solid border border-blue border-opacity-10">
                                    <div className="relative w-full h-56">
                                        <Image src={`${Config.cmsUrl}${blog.attributes.Thumbnail.data.attributes.url}`} alt="Thumbnail" fill className="object-cover" />
                                    </div>

                                    <div className="lg:px-8 px-4 py-6">
                                        <span className="font-poppins text-blue opacity-60 uppercase font-medium text-xl">
                                            #{blog.attributes.Tag}
                                        </span>

                                        <h4 className="font-poppins text-blue font-medium text-2xl tracking-tighter mt-2 mb-4">
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

                <div className="flex justify-center items-center gap-2">
                    {
                        pages && pages?.pages.map((page: IPaginated, i:number) => {
                            return (
                                <span onClick={() => changePage(i)} className={`${page.active ? "bg-gold text-white font-bold" : "text-blue"} lg:text-xl text-base w-8 h-8 flex justify-center items-center rounded-full font-poppins cursor-pointer`}>
                                    {page.page}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
};