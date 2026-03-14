import manifest from '@/lib/image-manifest.json'
import Image from 'next/image'

interface SeoImageProps {
  imageKey: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
}

export default function SeoImage({ imageKey, className, priority = false, width = 1200, height = 800 }: SeoImageProps) {
  const data = (manifest as Record<string, {alt: string; title: string}>)[imageKey]
  if (!data) return null
  return (
    <Image
      src={`/images/${imageKey}.webp`}
      alt={data.alt}
      title={data.title}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={85}
    />
  )
}
