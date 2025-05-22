import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Financial Insights</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/articles" className="text-sm font-medium transition-colors hover:text-primary">
            Articles
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About Me
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
