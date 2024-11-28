import { BlogCard } from "@/components/BlogCard"
import { Navbar } from "@/components/Navbar"

export const Blogs = () =>{
    return <div>
        <Navbar/>
        <div className="flex flex-col gap-2">

        <BlogCard
          id={1}
         authorName={"aarav"}
         title={"dick"}
         content={"heememe ello bhai kaise ho app sab"}
         publishedDate={
        "30feb ko 6bje"
         }
        />
        <BlogCard
          id={2}
         authorName={"aarav"}
         title={"dick"}
         content={"heememe ello bhai kaise ho app sab"}
         publishedDate={
        "30feb ko 6bje"
         }
        />
        <BlogCard
          id={2}
         authorName={"aarav"}
         title={"dick"}
         content={"hello bhai kaise ho app sab"}
         publishedDate={
        "30feb ko 6bje"
         }
        />
        </div>
    </div>
}