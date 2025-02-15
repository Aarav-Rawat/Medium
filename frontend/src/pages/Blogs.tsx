import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from "@/components/BlogCard"
import { BlogSkeleton } from "@/components/BlogSkeleton"
import { Navbar } from "@/components/Navbar"
import { useBlogs } from "@/hooks"

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs()

  if (loading) {
    return <div>
      <Navbar />
      <div>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Latest Posts</h1>
          <button 
            onClick={() => navigate('/blog/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Write New Post
          </button>
        </div>

        <div className="space-y-6">
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <div className="flex items-center space-x-4 mb-4">
                {blog.author.avatar && (
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{blog.author.name}</p>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 line-clamp-2">{blog.content}</p>
              
              <div className="mt-4 flex justify-end">
                <span className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;