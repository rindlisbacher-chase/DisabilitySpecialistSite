type CaptionedPhotoProps = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  variant?: 'page' | 'section' | 'insight'
}

export function CaptionedPhoto({
  src,
  alt,
  caption,
  width,
  height,
  variant = 'page',
}: CaptionedPhotoProps) {
  const className =
    variant === 'insight'
      ? 'insight-card'
      : variant === 'section'
        ? 'section-photo captioned-photo'
        : 'page-photo captioned-photo'

  return (
    <figure className={className}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
