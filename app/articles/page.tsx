"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { ArrowUpDown } from "lucide-react"
import { useArticles } from "@/hooks/use-articles"

export default function ArticlesPage() {
  const { articles } = useArticles()
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  const sortedArticles = [...articles].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Articles</h1>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </Button>
        </div>
        <div className="grid gap-8">
          {sortedArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
