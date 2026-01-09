import { BlogStatusType } from "@/app/admin/blog/write/types"


type BlogMetadataType = {
    title: string
    slug: string
    coverImage: string
    publishedAt: Date
    summary: string
}


type BlogType = BlogMetadataType & {
    content: string
    status: BlogStatusType
}


export type {
    BlogMetadataType,
    BlogType
}