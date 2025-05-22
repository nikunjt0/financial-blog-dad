import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import type { Article } from "@/lib/articles"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={article.image || "/placeholder.svg?height=360&width=640"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-2 text-sm text-muted-foreground">{format(new Date(article.date), "MMMM d, yyyy")}</div>
        <Link href={`/articles/${article.slug}`}>
          <h2 className="mb-2 text-2xl font-bold tracking-tight hover:text-primary">{article.title}</h2>
        </Link>
        <p className="text-muted-foreground">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="border-t p-6 pt-4">
        <Link href={`/articles/${article.slug}`} className="text-sm font-medium text-primary hover:underline">
          Read more
        </Link>
      </CardFooter>
    </Card>
  )
}
