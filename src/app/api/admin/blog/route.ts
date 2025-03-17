import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectDB from "@/utils/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Parse request body
    const body = await req.json();
    const { title, subTitle, content, tags, coverpic } = body;

    // Check if coverpic exists
    if (!coverpic) {
      return NextResponse.json({ error: "Cover image is required" }, { status: 400 });
    }

    // Convert image to Base64 (if not already)
    const base64Image = typeof coverpic === "string" && coverpic.startsWith("data:image")
      ? coverpic
      : `data:image/png;base64,${Buffer.from(coverpic || "").toString("base64")}`;

    // Create new blog in the database
    const blog = await Blog.create({
      title,
      subTitle,
      content,
      tags,
      coverpic: base64Image, // Store as base64 string
    });

    return NextResponse.json({ message: "Blog created successfully", blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by newest first
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
