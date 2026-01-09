import { getBlogPosts } from '@/data/blog'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogs = await getBlogPosts()

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://moamir.cloud";

    const blogsMap = blogs.map((blog) => {
        return {
            url: `${BASE_URL}/blog/${blog.slug}`,
            lastModified: new Date(blog.updatedAt),
            changeFrequency: 'monthly',
            priority: 0.6
        }
    }) as MetadataRoute.Sitemap


    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/blog`,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...blogsMap
    ]
}