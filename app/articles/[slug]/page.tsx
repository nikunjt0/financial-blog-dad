import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { getArticleBySlug, getAllArticles } from "@/lib/articles"
import { Comments } from "@/components/comments"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <article className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{article.title}</h1>
          <p className="text-muted-foreground">{format(new Date(article.date), "MMMM d, yyyy")}</p>
        </div>

        <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
          <Image
            src={article.image || "/placeholder.svg?height=720&width=1280"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div
          className="prose prose-gray max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <hr className="my-12" />

        <Comments articleSlug={params.slug} />
      </article>
    </div>
  )
}
