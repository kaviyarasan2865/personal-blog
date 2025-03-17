'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  coverpic: string;
  createdAt: string;
}

interface Error {
  error: string;
}

const Page = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/admin/blog');
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to fetch blogs');
      }
    };
    fetchBlogs();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/dashboard/edit-blog/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (isDeleting) return;
    
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Blog deleted successfully');
        setBlogs(blogs.filter(blog => blog._id !== id));
      } else {
        const data: Error = await response.json();
        throw new Error(data.error || 'Failed to delete blog');
      }
    } catch (error: unknown) {
      console.error('Error deleting blog:', error);
      if (error instanceof Error && error.message.includes('unauthorized')) {
        toast.error('Unauthorized access');
        router.push('/admin/login');
      } else if (error instanceof Error) {
        toast.error(error.message || 'Failed to delete blog');
      } else if (typeof error === 'object' && error !== null && 'error' in error) {
        const errorMsg = (error as Error).error;
        if (errorMsg.includes('unauthorized')) {
          toast.error('Unauthorized access');
          router.push('/admin/login');
        } else {
          toast.error(errorMsg || 'Failed to delete blog');
        }
      } else {
        toast.error('Failed to delete blog');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='font-bold text-2xl'>Blog Posts</h1>
        <Link 
          href='/admin/dashboard/create-blog' 
          className='bg-gray-950 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200'
        >
          Create Blog
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs.map((blog) => (
          <div key={blog._id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200'>
            <div className='relative h-48 w-full'>
              <Image
                src={blog.coverpic}
                alt={blog.title}
                fill
                className='object-cover'
              />
            </div>
            <div className='p-4'>
              <h2 className='font-bold text-xl mb-2 line-clamp-1'>{blog.title}</h2>
              <p className='text-gray-600 mb-3 text-sm line-clamp-2'>{blog.subTitle}</p>
              <div className='flex justify-between items-center'>
                <span className='text-gray-500 text-sm'>
                  {formatDate(blog.createdAt)}
                </span>
                <div className='flex gap-3'>
                  <button 
                    onClick={() => handleEdit(blog._id)}
                    className='text-blue-600 hover:text-blue-800 transition duration-200'
                    title='Edit blog'
                    disabled={isDeleting}
                  >
                    <FiEdit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(blog._id)}
                    className='text-red-600 hover:text-red-800 transition duration-200'
                    title='Delete blog'
                    disabled={isDeleting}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page