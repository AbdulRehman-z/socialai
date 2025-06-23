import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ForgotPasswordView from "@/components/views/auth/forgotPasswordView"
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { forgotPasswordSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const ForgotPasswordPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!!session) {
    redirect("/")
  }

  return (
    <ForgotPasswordView />
  )
}

export default ForgotPasswordPage
