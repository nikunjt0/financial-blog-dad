import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllArticles } from "@/lib/articles"
import { ArticleCard } from "@/components/article-card"

export default async function Home() {
  const articles = await getAllArticles()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <section className="mx-auto max-w-5xl">
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Financial Insights</h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Expert analysis and perspectives on markets, investments, and financial strategies.
          </p>
        </div>
        <div className="grid gap-8">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/articles" className="inline-flex items-center gap-2 text-primary hover:underline">
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
