import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const IMAGE_BASE_URL = 'http://localhost:8090/api/image'

export const resolveImageUrl = (path: string) => {
    if(!path) return ''
    const filename = path.split('/').pop() // 파일명만 추출
    return `${IMAGE_BASE_URL}/${filename}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
