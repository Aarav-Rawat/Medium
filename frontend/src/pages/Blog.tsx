import { FullBlog } from "@/components/FullBlog";
import { Spinner } from "@/components/Spinner";
import { useBlog } from "@/hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return <div className="h-screen flex justify-center items-center">
      <Spinner/>
    </div>
  }
  return (
    <>
    {
      blog ?
      <FullBlog blog={blog} />
      :
      <div><Spinner/></div>
    }
    </>
  )
}

