import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Financial Insights. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/articles" className="hover:underline">
            Articles
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
