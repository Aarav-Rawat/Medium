import React from 'react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
}

const Blog: React.FC = () => {
  // Example blog posts - replace with your actual data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and how to build your first component...',
      date: '2024-03-20',
      imageUrl: '/blog-1.jpg'
    },
    // Add more posts here
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Our Blog
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Read More →
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog;

