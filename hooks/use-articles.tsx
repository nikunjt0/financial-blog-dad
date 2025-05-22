"use client"

import { useState, useEffect } from "react"
import type { Article } from "@/lib/articles"

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles")
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return { articles, loading }
}
