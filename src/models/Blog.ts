import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type:String, required: true},
    subTitle: {type:String, required: true},
    content: {type:String, required: true},
    tags: {type:[String], required: true},
    coverpic: {type:String, required: true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now}
})

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;