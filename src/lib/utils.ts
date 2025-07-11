import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getInitials(name: string) {
  return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
}

export const delay = async (intervalMS: number) => {
  return await new Promise((resolve) => setTimeout(resolve, intervalMS))
}
