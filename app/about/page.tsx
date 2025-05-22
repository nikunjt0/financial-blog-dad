import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h1>

        <div className="mb-10 flex flex-col items-center gap-8 md:flex-row">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-background shadow-xl">
            <Image
              src="/images/IMG_1018 2.jpg"
              alt="Profile picture"
              width={256}
              height={256}
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="mb-2 text-2xl font-bold">Jonathan Doe</h2>
            <p className="mb-4 text-muted-foreground">Financial Analyst & Investment Strategist</p>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6 text-lg">
          <p>
            With over 15 years of experience in the financial industry, I specialize in market analysis, investment
            strategies, and wealth management. My career began at Goldman Sachs, where I developed a strong foundation
            in financial markets and investment banking.
          </p>

          <p>
            After earning my MBA from Wharton Business School, I transitioned to asset management, where I've helped
            clients navigate complex market conditions and build resilient investment portfolios. My approach combines
            fundamental analysis with macroeconomic insights to identify opportunities across various asset classes.
          </p>

          <p>
            Through this blog, I aim to share my perspectives on market trends, investment strategies, and financial
            planning. My goal is to provide readers with actionable insights that can help them make informed financial
            decisions in an increasingly complex global economy.
          </p>

          <p>
            When I'm not analyzing markets or writing about finance, you can find me hiking in the mountains, reading
            historical biographies, or enjoying time with my family. I believe in maintaining a balanced approach to
            life, just as I advocate for balanced investment portfolios.
          </p>
        </div>
      </div>
    </div>
  )
}
