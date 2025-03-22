'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface BlogData {
  _id: string;
  title: string;
  subTitle: string;
  content: string;
  tags: string[];
  coverpic: string;
}

const BlogDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogData | null>(null);

  const blogId = resolvedParams.id; 
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/admin/blog/${blogId}`);
        
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        
        const data = await response.json();
        setBlogData(data.blog);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to fetch blog');
        router.push('/admin/dashboard/blogs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <button 
          onClick={() => router.push('/admin/dashboard/blogs')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{blogData.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{blogData.subTitle}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {blogData.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
        {blogData.coverpic ? (
          <Image 
            src={blogData.coverpic} 
            alt={blogData.title} 
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
      </div>

      <div className="mt-12 flex justify-between">
        <button 
          onClick={() => router.push('/admin/dashboard/blogs')}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          Back to Blogs
        </button>
        <button 
          onClick={() => router.push(`/admin/dashboard/blogs/edit/${blogData._id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Edit Blog
        </button>
      </div>
    </div>
  );
};

export default BlogDetailPage;
