"use client"

import BrandPanel from "@/components/custom/auth/brandPanel"
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const isAuth = pathname.includes("/sign-in") || pathname.includes("/sign-up")

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className={`${isAuth ? "lg:flex-1" : "flex-1"} flex flex-col`}>{children}</div>

      {/* Brand Panel - Hidden on mobile, shown on desktop for auth pages */}
      {isAuth && (
        <div className="hidden lg:block lg:flex-1 min-h-screen">
          <BrandPanel />
        </div>
      )}
    </div>
  )
}

export default AuthLayout
