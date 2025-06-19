"use client"

import BrandPanel from "@/components/custom/auth/brandPanel"
import type { ReactNode } from "react"
import { usePathname } from 'next/navigation';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = usePathname();
  // if the url path includes a /sign-in or /sign-up
  const isAuth = router.includes('/sign-in') || router.includes('/sign-up');

  return <div className="min-h-screen flex">
    <div className="flex-2">
      {children}
    </div>
    {isAuth && <div className="flex-1 min-h-screen w-full">
      <BrandPanel />
    </div>}
  </div>
}

export default AuthLayout
