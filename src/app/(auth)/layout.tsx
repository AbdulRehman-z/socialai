import BrandPanel from "@/components/custom/auth/brandPanel"
import type { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="min-h-screen flex">
    <div className="flex-2">
      {children}
    </div>
    <div className="flex-1 min-h-screen w-full">
      <BrandPanel />
    </div>
  </div>
}

export default AuthLayout
