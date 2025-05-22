"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface Comment {
  id: string
  name: string
  content: string
  date: string
}

interface CommentsProps {
  articleSlug: string
}

export function Comments({ articleSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  // Load comments from localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments-${articleSlug}`)
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    }
  }, [articleSlug])

  // Save comments to localStorage
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments-${articleSlug}`, JSON.stringify(comments))
    }
  }, [comments, articleSlug])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !content.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      name,
      content,
      date: new Date().toISOString(),
    }

    setComments([newComment, ...comments])
    setName("")
    setContent("")

    toast.success("Your comment has been added successfully")
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            required
          />
        </div>

        <Button type="submit">Submit Comment</Button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">{comment.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.date).toLocaleDateString()} at {new Date(comment.date).toLocaleTimeString()}
                </p>
              </CardHeader>
              <CardContent>
                <p>{comment.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
