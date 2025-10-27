import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const resolveImageUrl = (path: string) => {
  if (!path) return ''
  const filename = path.split('/').pop()
  const basePath = import.meta.env.DEV ? '' : '/react-site'
  return `${basePath}/assets/thumbnails/${filename}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
