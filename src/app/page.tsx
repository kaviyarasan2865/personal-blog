"use client"
import { useState, useEffect } from "react"
import { Search, Menu, X, ChevronRight, Github, Twitter, Linkedin, ArrowRight, Mail } from "lucide-react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"

interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  coverpic: string;
  tags: string[];
  createdAt: string;
}

const BlogLandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [blogPosts, setBlogPosts] = useState<Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/admin/blog');
        const data = await response.json();
        setBlogPosts(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to fetch blogs');
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white text-gray-800 transition-all duration-500">
      {/* Navbar */}
      <header
        className={`fixed w-full transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg py-2" : "bg-transparent py-4"
        } z-10`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-amber-600 transition-all duration-300 hover:scale-105 hover:text-amber-500"
          >
            <span className="relative">
              Kaviyarasan&apos;s Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search blogs..."
                className="pl-8 pr-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all w-40 focus:w-56 duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-500" />
            </div>
            <nav className="flex space-x-6">
              {["Blogs", "Dev Portfolio"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`} className="relative group py-2">
                  <span className="text-gray-700 group-hover:text-amber-600 transition-colors duration-300">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            
            <button
              className="p-2 text-amber-600 bg-amber-100 rounded-full hover:bg-amber-200 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm p-4 shadow-lg animate-[slideDown_0.3s_ease-out_forwards]">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="w-full pl-8 pr-4 py-2 rounded-full bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-500" />
              </div>
            </div>
            <nav className="flex flex-col space-y-4">
              {["Blogs", "Dev Portfolio"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="py-2 px-3 hover:bg-amber-50 rounded-lg transition-colors duration-300 hover:text-amber-600"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-amber-100/70 to-amber-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <div className="inline-block px-3 py-1 mb-4 bg-amber-100 text-amber-700 rounded-full text-sm font-medium animate-[pulse_2s_ease-in-out_infinite]">
              ✨ Welcome to my digital garden
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800 leading-tight">
              Welcome to My{" "}
              <span className="text-amber-500 relative inline-block">
                Personal Blog
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="#F59E0B" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Exploring web development, design patterns, and tech insights. Join me on this journey of continuous
              learning and discovery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blogs"
                className="inline-flex items-center px-6 py-3 bg-amber-500 text-white font-medium rounded-full transition-all duration-300 hover:bg-amber-600 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                Read My Blog
                <ChevronRight className="ml-2 h-5 w-5 animate-[bounceX_1.5s_ease-in-out_infinite]" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-white text-amber-600 font-medium rounded-full border border-amber-200 transition-all duration-300 hover:bg-amber-50 hover:shadow-md hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                About Me
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-[fadeInRight_0.8s_ease-out_forwards]">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-300 rounded-lg rotate-3 transform-gpu"></div>
              <Image
                src="/images/placeholder.jpg"
                alt="Blog illustration"
                width={600}
                height={400}
                className="relative rounded-lg shadow-xl max-w-full h-auto hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg animate-[float_3s_ease-in-out_infinite]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Recently Updated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Latest Blog Posts</h2>
              <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-amber-300 rounded-full"></div>
            </div>
            {blogPosts.length > 3 && (
              <Link
                href="/blogs"
                className="group text-amber-600 hover:text-amber-700 transition-colors inline-flex items-center font-medium"
              >
                See all blogs
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <div
                key={post._id}
                className="bg-amber-50/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group animate-[fadeIn_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.coverpic || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.tags[0]}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{post.createdAt}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3 text-gray-800 group-hover:text-amber-600 transition-colors">
                    <Link href={`/blog/${post._id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.subTitle}</p>
                  <Link
                    href={`/blog/${post._id}`}
                    className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors font-medium group/link"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-amber-50 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-20 bg-white"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-full h-20 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
        ></div>

        <div className="container mx-auto px-4 text-center max-w-2xl relative z-10 animate-[fadeIn_0.8s_ease-out_forwards]">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6 animate-[pulse_2s_ease-in-out_infinite]">
              <Mail className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to my newsletter to get the latest blog posts and updates delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-full flex-1 max-w-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
              />
              <button className="px-6 py-3 bg-amber-500 text-white font-medium rounded-full transition-all duration-300 hover:bg-amber-600 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8 border-t border-amber-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-gray-800">About Me</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                I&apos;m a passionate web developer sharing my journey, insights, and knowledge about modern web development.
                Through this blog, I aim to help others learn and grow in their development careers.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors duration-300"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Quick Links</h3>
              <ul className="space-y-3 text-gray-600">
                {["Home", "Blogs", "Portfolio", "About", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase()}`}
                      className="group inline-flex items-center hover:text-amber-600 transition-colors duration-300"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "JavaScript", "TypeScript", "CSS", "Design", "Development", "Career"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/category/${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm hover:bg-amber-100 transition-colors duration-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 pt-8 border-t border-gray-100">
            <p>&copy; {new Date().getFullYear()} Kaviyarasan&apos;s Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add Tailwind keyframes */}
      <style jsx global>{`
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes bounceX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default BlogLandingPage

