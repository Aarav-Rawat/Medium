import { BlogCard } from "@/components/BlogCard"
import { Navbar } from "@/components/Navbar"
import { useBlogs } from "@/hooks"


export const Blogs = () => {
  const { loading, blogs } = useBlogs()
  if (loading) {
    return <div>
      fetching data....
    </div>
  }
  return <div>
    <Navbar />

    <div className="flex flex-col gap-2">
      {
        blogs.map((blog,index) => (
          < BlogCard
           key={index}
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={
             "29-11-2024"
            }
          />
        ))

      }

    </div>
  </div>
}