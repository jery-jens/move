import Button from "../Buttons/Button";

export interface IBlogs {
    Title: string;
};

export default function Blogs({ Title }:IBlogs) {
    return (
        <section className="py-16 border-t-blue border-solid border-t border-opacity-10">
            <div className="mx-auto container px-7">
                <div className="flex items-center justify-between">
                    <h2 className="font-poppins text-blue font-medium text-5xl tracking-tighter">{Title}</h2>
                    <Button Label="Bekijk meer" Color="gold" Url="/blogs" OpenInNewTab={false}  />
                </div>

                <div></div>
            </div>
        </section>
    )
};