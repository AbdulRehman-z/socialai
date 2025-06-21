import HomeView from "@/components/custom/views/home/homeView";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <HomeView />
  );
}

export default HomePage
