import { BlogType } from "@/types/app/blog"


const BlogCard = (blog:BlogType) => {
  
  return (
    <div className="p-4 border flex items-center justify-between" >
        <h2 className="font-semibold" >{blog.title}</h2>
        <span className="text-sm text-card-foreground" >{(new Date(blog.publishedAt.toString())).toDateString()}</span>
    </div>
  )
}

export default BlogCard
