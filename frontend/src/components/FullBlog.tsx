import { Blog } from "@/hooks"
import { Avatar } from "./BlogCard"
import { Navbar } from "./Navbar"


export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div>
        <Navbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title }
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posteda on 2nd December 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg ml-12">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                            {blog.author.name} 
                            </div>
                            <div className="pt-2 text-slate-500">
                                Info about author is anonymous
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}