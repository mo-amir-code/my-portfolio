

type BlogMetadataType = {
    title: string
    slug: string
    publishedAt: Date
    summary: string
}


type BlogType = BlogMetadataType & {
    content: string
}


export type {
    BlogMetadataType,
    BlogType
}