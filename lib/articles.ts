import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const articlesDirectory = path.join(process.cwd(), "articles")

export interface Article {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  content: string
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    // Create articles directory if it doesn't exist
    if (!fs.existsSync(articlesDirectory)) {
      fs.mkdirSync(articlesDirectory, { recursive: true })

      // Create sample articles
      createSampleArticles()
    }

    const fileNames = fs.readdirSync(articlesDirectory)
    const allArticlesData = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const article = await getArticleBySlug(slug)
        return article
      }),
    )

    // Sort articles by date
    return allArticlesData
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error getting articles:", error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)

    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error getting article ${slug}:`, error)
    return null
  }
}

function createSampleArticles() {
  const sampleArticles = [
    {
      slug: "market-outlook-2025",
      frontmatter: `---
title: "Market Outlook 2025: Navigating Uncertainty"
date: "2025-05-15"
excerpt: "An in-depth analysis of market trends and investment opportunities for the coming year."
image: "/placeholder.svg?height=720&width=1280"
---`,
      content: `
# Market Outlook 2025: Navigating Uncertainty

The global financial landscape continues to evolve at a rapid pace, presenting both challenges and opportunities for investors. As we look ahead to 2025, several key themes are emerging that will likely shape market dynamics.

## Economic Growth Projections

Economists are forecasting moderate global growth in 2025, with developed markets expected to grow at 2.1% and emerging markets at 4.3%. This represents a slight deceleration from the previous year but remains above the long-term average.

The United States economy shows resilience despite concerns about inflation and interest rates. The Federal Reserve's policy decisions will continue to be a focal point for investors worldwide.

## Sector Analysis

### Technology

The technology sector remains a driving force in the market, with artificial intelligence, cloud computing, and cybersecurity companies leading the way. Valuations have moderated from their peaks, potentially offering more reasonable entry points for long-term investors.

### Financial Services

Banks and financial institutions are benefiting from the higher interest rate environment, though concerns about loan quality persist in some segments. Fintech disruption continues to reshape the competitive landscape.

### Healthcare

Healthcare innovation, particularly in biotechnology and digital health, presents compelling investment opportunities. Demographic trends support long-term growth in this sector.

## Investment Strategies for 2025

In this environment of moderate growth and persistent volatility, a balanced approach to portfolio construction is essential. Consider these strategies:

1. **Quality over speculation**: Focus on companies with strong balance sheets, sustainable competitive advantages, and proven management teams.

2. **Diversification across asset classes**: Maintain exposure to equities, fixed income, and alternative investments to manage risk.

3. **Geographic diversification**: Look beyond domestic markets to capture growth opportunities globally.

4. **Regular rebalancing**: Systematically review and adjust your portfolio to maintain your target asset allocation.

The coming year will undoubtedly bring surprises, both positive and negative. By maintaining a disciplined investment approach and focusing on long-term objectives, investors can navigate the uncertainty and position themselves for success.
`,
    },
    {
      slug: "retirement-planning-essentials",
      frontmatter: `---
title: "Retirement Planning Essentials: Building Your Financial Future"
date: "2025-04-22"
excerpt: "Key strategies and considerations for effective retirement planning at any age."
image: "/placeholder.svg?height=720&width=1280"
---`,
      content: `
# Retirement Planning Essentials: Building Your Financial Future

Retirement planning is a journey that ideally begins early in your career and evolves as you progress through different life stages. Regardless of your age or current financial situation, it's never too late to take steps toward securing your financial future.

## Start with Clear Goals

Effective retirement planning begins with defining what retirement means to you:

- At what age do you hope to retire?
- What lifestyle do you envision?
- Where do you plan to live?
- What activities or pursuits will you engage in?

These questions help establish the financial requirements for your retirement and provide motivation for your saving and investment strategy.

## Understanding Retirement Accounts

### 401(k) and Employer-Sponsored Plans

Employer-sponsored retirement plans often represent the cornerstone of retirement savings. Key considerations include:

- Contributing at least enough to capture any employer match (essentially free money)
- Understanding vesting schedules
- Reviewing investment options regularly
- Considering Roth vs. traditional contributions based on your tax situation

### Individual Retirement Accounts (IRAs)

IRAs offer tax advantages and flexibility:

- Traditional IRAs may offer tax-deductible contributions
- Roth IRAs provide tax-free withdrawals in retirement
- Contribution limits and eligibility requirements vary based on income and employment status

## Investment Strategy for Retirement

Your investment approach should evolve as you progress toward retirement:

### Early Career (20s-30s)
- Higher allocation to equities
- Focus on growth
- Time to weather market volatility

### Mid-Career (40s-50s)
- Gradually increasing allocation to fixed income
- More defined retirement timeline
- Potentially higher contribution rates as income increases

### Pre-Retirement (5-10 years before retirement)
- More conservative asset allocation
- Focus on capital preservation
- Detailed retirement income planning

## Beyond Investments: Comprehensive Planning

Retirement security extends beyond investment accounts:

- **Healthcare planning**: Understanding Medicare, considering long-term care insurance
- **Social Security optimization**: Strategies for maximizing benefits
- **Tax efficiency**: Minimizing tax burden in retirement
- **Estate planning**: Ensuring your assets are distributed according to your wishes

## Regular Review and Adjustment

Retirement planning is not a set-it-and-forget-it endeavor. Regular reviews (at least annually) help ensure you remain on track and allow for adjustments as circumstances change.

By taking a proactive and disciplined approach to retirement planning, you can work toward financial security and the freedom to enjoy your retirement years on your own terms.
`,
    },
    {
      slug: "sustainable-investing-guide",
      frontmatter: `---
title: "The Complete Guide to Sustainable Investing"
date: "2025-03-10"
excerpt: "How to align your investment portfolio with your values while seeking competitive returns."
image: "/placeholder.svg?height=720&width=1280"
---`,
      content: `
# The Complete Guide to Sustainable Investing

Sustainable investing—also known as ESG (Environmental, Social, and Governance) investing—has evolved from a niche approach to a mainstream investment strategy. This transformation reflects growing awareness of how non-financial factors can materially impact investment performance and align portfolios with investors' values.

## Understanding ESG Criteria

### Environmental Factors
- Climate change policies and carbon footprint
- Resource conservation and biodiversity
- Waste management and pollution prevention
- Water usage and conservation

### Social Factors
- Employee relations and diversity
- Human rights and supply chain practices
- Product safety and data security
- Community engagement

### Governance Factors
- Board composition and independence
- Executive compensation
- Shareholder rights
- Business ethics and transparency

## Approaches to Sustainable Investing

### Negative Screening
Excluding companies or industries that conflict with specific values or principles (e.g., tobacco, weapons, fossil fuels).

### Positive Screening
Actively seeking companies with strong ESG performance relative to industry peers.

### ESG Integration
Incorporating ESG factors alongside traditional financial analysis in the investment decision-making process.

### Thematic Investing
Focusing on specific themes such as clean energy, water conservation, or gender diversity.

### Impact Investing
Targeting investments that generate measurable social or environmental benefits alongside financial returns.

## Performance Considerations

A common misconception is that sustainable investing necessarily involves sacrificing returns. However, research increasingly suggests that:

- Companies with strong ESG practices may experience lower cost of capital
- ESG factors can help identify quality companies with sustainable business models
- ESG integration may help manage downside risk

While past performance doesn't guarantee future results, many ESG-focused funds have demonstrated competitive returns compared to conventional counterparts.

## Building a Sustainable Portfolio

### Step 1: Define Your Priorities
Clarify which ESG issues matter most to you, recognizing that trade-offs may exist.

### Step 2: Research Investment Options
Evaluate funds, ETFs, and individual companies based on their ESG credentials and alignment with your priorities.

### Step 3: Consider Asset Allocation
Apply sustainable investing principles across asset classes, including equities, fixed income, and alternatives.

### Step 4: Monitor and Adjust
Regularly review both financial performance and ESG impact, making adjustments as needed.

## The Future of Sustainable Investing

As data quality improves, reporting standards evolve, and investor demand increases, sustainable investing will likely continue to grow and mature. Forward-thinking investors have an opportunity to align their portfolios with their values while potentially benefiting from the transition to a more sustainable global economy.

By incorporating ESG considerations into your investment approach, you can work toward financial goals while contributing to positive environmental and social outcomes.
`,
    },
    {
      slug: "cryptocurrency-investment-strategies",
      frontmatter: `---
title: "Cryptocurrency Investment Strategies for Traditional Investors"
date: "2025-02-18"
excerpt: "A balanced approach to incorporating digital assets into a conventional investment portfolio."
image: "/placeholder.svg?height=720&width=1280"
---`,
      content: `
# Cryptocurrency Investment Strategies for Traditional Investors

Digital assets have emerged as a distinct asset class that has captured the attention of both retail and institutional investors. For traditional investors accustomed to conventional asset classes, navigating the cryptocurrency landscape requires a thoughtful approach that balances opportunity with prudent risk management.

## Understanding the Cryptocurrency Landscape

### Bitcoin and Beyond

While Bitcoin remains the dominant cryptocurrency by market capitalization, the ecosystem has expanded to include thousands of digital assets with varying use cases:

- **Store of value**: Bitcoin, often described as "digital gold"
- **Smart contract platforms**: Ethereum, Solana, Cardano
- **Decentralized finance (DeFi)**: Protocols enabling lending, borrowing, and trading without intermediaries
- **Non-fungible tokens (NFTs)**: Unique digital assets representing ownership of specific items
- **Stablecoins**: Cryptocurrencies designed to maintain a stable value, often pegged to fiat currencies

### Market Characteristics

Cryptocurrency markets differ from traditional financial markets in several important ways:

- 24/7 trading with no circuit breakers
- Higher volatility
- Evolving regulatory landscape
- Technological complexity
- Unique security considerations

## Portfolio Allocation Considerations

### The Role of Cryptocurrencies

For most traditional investors, cryptocurrencies should represent a satellite allocation rather than a core holding:

- **Diversification benefit**: Cryptocurrencies have historically shown low correlation with traditional asset classes
- **Asymmetric return potential**: Possibility of significant upside with defined downside (limited to invested capital)
- **Hedge against monetary debasement**: Fixed or predictable supply schedules for certain cryptocurrencies

### Sizing the Allocation

The appropriate allocation depends on individual circumstances, but common approaches include:

- **Fixed percentage**: Typically 1-5% of total portfolio for moderate investors
- **Risk parity**: Allocating based on volatility contribution
- **Barbell strategy**: Combining very conservative investments with small allocations to high-risk, high-reward assets

## Implementation Strategies

### Direct Ownership

Purchasing cryptocurrencies through exchanges and storing them in wallets:

- **Advantages**: Full control, no management fees
- **Challenges**: Security responsibility, technical complexity

### Investment Vehicles

Accessing cryptocurrencies through traditional financial products:

- **Exchange-traded products**: ETFs, ETNs, trusts
- **Mutual funds and hedge funds**: Professionally managed exposure
- **Private equity/venture capital**: Investing in blockchain companies and projects

### Dollar-Cost Averaging

Systematic investment at regular intervals can help manage volatility and psychological challenges of timing the market.

## Risk Management Essentials

### Security Practices

- Using hardware wallets for significant holdings
- Enabling two-factor authentication
- Maintaining offline backups of private keys
- Using reputable, regulated exchanges

### Portfolio Monitoring

- Regular rebalancing to maintain target allocation
- Tax-loss harvesting opportunities in volatile markets
- Staying informed about technological and regulatory developments

## Conclusion

Cryptocurrencies represent a new frontier in investing that offers both significant opportunities and substantial risks. By approaching this asset class with a disciplined investment framework, traditional investors can potentially enhance portfolio diversification and returns while managing downside risk.

As with any investment decision, cryptocurrency allocations should be considered in the context of your overall financial plan, risk tolerance, and investment objectives.
`,
    },
    {
      slug: "real-estate-investment-fundamentals",
      frontmatter: `---
title: "Real Estate Investment Fundamentals: Beyond Residential Properties"
date: "2025-01-05"
excerpt: "Exploring diverse real estate investment options and strategies for portfolio diversification."
image: "/placeholder.svg?height=720&width=1280"
---`,
      content: `
# Real Estate Investment Fundamentals: Beyond Residential Properties

Real estate has long been considered a cornerstone of wealth creation and portfolio diversification. While residential properties often serve as an entry point for many investors, the real estate investment landscape offers a much broader array of opportunities across various sectors and investment structures.

## The Case for Real Estate in a Diversified Portfolio

Real estate offers several potential benefits as an asset class:

- **Income generation**: Through rental income and lease payments
- **Capital appreciation**: As property values increase over time
- **Inflation hedge**: Hard assets tend to maintain value during inflationary periods
- **Portfolio diversification**: Historically different performance patterns than stocks and bonds
- **Tax advantages**: Depreciation, mortgage interest deductions, and 1031 exchanges

## Commercial Real Estate Sectors

### Office Properties

Office buildings range from suburban low-rises to downtown skyscrapers:

- **Class A**: Premium buildings in prime locations
- **Class B**: Older but well-maintained properties
- **Class C**: Older buildings requiring significant updates

The COVID-19 pandemic has accelerated workplace trends, creating both challenges and opportunities in this sector.

### Retail Properties

Retail real estate encompasses various formats:

- **Shopping malls and centers**
- **Strip malls and neighborhood centers**
- **Standalone buildings**

E-commerce competition has transformed this sector, with successful properties increasingly focused on experience and service-oriented tenants.

### Industrial Properties

Industrial real estate has benefited from e-commerce growth:

- **Warehouses and distribution centers**
- **Manufacturing facilities**
- **Data centers**
- **Cold storage facilities**

### Multifamily Residential

Apartment buildings offer scale advantages over single-family rentals:

- **Garden-style complexes**
- **Mid-rise buildings**
- **High-rise towers**
- **Student housing**
- **Senior living facilities**

### Hospitality

Hotels and resorts represent a more operationally intensive real estate investment:

- **Limited-service hotels**
- **Full-service hotels**
- **Extended stay properties**
- **Resorts**

### Specialty Sectors

Niche property types often require specialized knowledge:

- **Self-storage facilities**
- **Healthcare properties**
- **Agricultural land**
- **Infrastructure**

## Investment Vehicles and Structures

### Direct Ownership

Purchasing properties individually or through partnerships:

- **Advantages**: Control, potential for higher returns, tax benefits
- **Challenges**: Capital requirements, management responsibilities, liquidity constraints

### Real Estate Investment Trusts (REITs)

Publicly traded companies that own, operate, or finance income-producing real estate:

- **Equity REITs**: Own and operate properties
- **Mortgage REITs**: Provide financing for real estate
- **Hybrid REITs**: Combine both approaches

REITs offer liquidity, diversification, and professional management without direct property ownership.

### Real Estate Funds

Pooled investment vehicles focused on real estate:

- **Private equity real estate funds**
- **Real estate mutual funds**
- **Real estate ETFs**

### Crowdfunding and Online Platforms

Technology has created new access points for real estate investment:

- **Equity crowdfunding**
- **Debt crowdfunding**
- **Fractional ownership platforms**

## Investment Strategies

### Core

Low-risk, stabilized properties with predictable cash flows:

- **Lower leverage** (typically 40-60%)
- **Established locations**
- **High-quality tenants**
- **Long-term leases**

### Core-Plus

Moderately higher risk with some value-add components:

- **Moderate leverage** (typically 50-65%)
- **Strong but not prime locations**
- **Some lease turnover or property improvements needed**

### Value-Add

Properties requiring significant improvements or repositioning:

- **Higher leverage** (typically 65-75%)
- **Underperforming assets**
- **Renovation or repositioning opportunities**
- **Lease-up strategies**

### Opportunistic

Highest risk/return profile:

- **Highest leverage** (can exceed 75%)
- **Development projects**
- **Distressed properties**
- **Market timing strategies**

## Conclusion

Real estate offers diverse investment opportunities beyond the familiar territory of residential properties. By understanding the various sectors, investment vehicles, and strategies available, investors can thoughtfully incorporate real estate into their portfolios in ways that align with their financial objectives, risk tolerance, and investment timeline.

As with any investment decision, thorough due diligence, professional guidance when appropriate, and a long-term perspective are essential to successful real estate investing.
`,
    },
  ]

  // Create the articles directory if it doesn't exist
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true })
  }

  // Write sample articles to files
  sampleArticles.forEach((article) => {
    const filePath = path.join(articlesDirectory, `${article.slug}.md`)
    const fileContent = `${article.frontmatter}\n\n${article.content}`
    fs.writeFileSync(filePath, fileContent)
  })
}
