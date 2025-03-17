"use client"
import React, { useState, FormEvent, KeyboardEvent } from "react";
import EditorWrapper from "@/components/admin/EditorWrapper";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverpic, setImg] = useState<File | null>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!coverpic) {
      toast.error('Cover image is required');
      return;
    }

    // Convert image file to base64
    const reader = new FileReader();
    reader.readAsDataURL(coverpic);
    
    reader.onload = async () => {
      try {
        const response = await axios.post('/api/admin/blog', {
          title,
          subTitle: subtitle,
          content,
          tags,
          coverpic: reader.result
        });

        if (response.status === 201) {
          toast.success('Blog created successfully');
          router.push('/admin/dashboard/blogs');
          // Reset form
          setTitle('');
          setSubtitle('');
          setContent('');
          setTags([]);
          setImg(null);

        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error creating blog:", error);
          if (error.response?.status === 401) {
            toast.error('Unauthorized access');
            router.push('/admin/login');
          } else {
            toast.error(error.response?.data?.error || "Failed to create blog");
          }
        } else {
          console.error("An unknown error occurred:", error);
          toast.error("Failed to create blog");
        }
      }
    };

    reader.onerror = (error) => {
        console.error("Error reading image file:", error);
      toast.error('Error reading image file');
    };
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">Create Blog</h1>
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
            <label className="font-semibold mb-2">Cover Pic</label>
            <input
              type="file"
                placeholder="Upload cover pic"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => {
                  if (e.target.files) {
                    setImg(e.target.files[0]);
                  }
                }}

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
                      className="ml-2 text-white hover:text-red-500 hover:cursor-pointer"
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
          <EditorWrapper onContentChange={handleContentChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-950 hover:cursor-pointer transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default Page;
