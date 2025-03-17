'use client'
import React, { useState, FormEvent, KeyboardEvent, useEffect } from "react";
import EditorWrapper from "@/components/admin/EditorWrapper";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BlogData {
  _id: string;
  title: string;
  subTitle: string;
  content: string;
  tags: string[];
  coverpic: string;
}

const EditBlogPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverpic, setImg] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${params.id}`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const data = await response.json();
        const blog: BlogData = data.blog;
        
        setTitle(blog.title);
        setSubtitle(blog.subTitle);
        setContent(blog.content);
        setTags(blog.tags);
        setImg(blog.coverpic);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to fetch blog');
        router.push('/admin/dashboard/blogs');
      }
    };

    fetchBlog();
  }, [params.id, router]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      setTags([...tags, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
      
      // Preview the new image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImg(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const imageToUse = newImage ? await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(newImage);
      }) : coverpic;

      const response = await axios.put(`/api/admin/blog/${params.id}`, {
        title,
        subTitle: subtitle,
        content,
        tags,
        coverpic: imageToUse
      });

      if (response.status === 200) {
        toast.success('Blog updated successfully');
        router.push('/admin/dashboard/blogs');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating blog:", error);
        toast.error(error.response?.data?.error || "Failed to update blog");
      } else {
        console.error("An unknown error occurred:", error);
        toast.error("An unknown error occurred");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Blog Sub-title</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter blog sub-title"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Cover Image</label>
            {coverpic && (
              <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={coverpic}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/png, image/jpg, image/jpeg"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Tags</label>
            <div className="border p-2 rounded focus-within:ring-2 focus-within:ring-gray-500">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-500 text-white px-2 py-1 rounded flex items-center space-x-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-2 text-white hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type and press Enter"
                className="outline-none w-full"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Blog Content</label>
          <EditorWrapper onContentChange={handleContentChange} initialContent={content} />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-950 transition"
          >
            Update Blog
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard/blogs')}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
