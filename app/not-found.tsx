import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-12 md:px-6">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <h2 className="mb-8 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
