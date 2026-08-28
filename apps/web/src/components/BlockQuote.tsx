type BlockQuoteProps = {
  quote: string
  attribution: string
}

export function BlockQuote({ quote, attribution }: BlockQuoteProps) {
  return (
    <blockquote className="site-quote">
      <p>{quote}</p>
      <footer>— {attribution}</footer>
    </blockquote>
  )
}
