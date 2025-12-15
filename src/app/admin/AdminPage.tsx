"use client";
import { httpAxios } from "@/config/axios";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { isUserLoggedIn, setLoggedInStatus } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await httpAxios.get("/auth");
        setLoggedInStatus(true);
      } catch (error) {
        console.log(
          `[ERROR] occurred while verifying authentication: ${error}`
        );
      } finally {
        setIsChecked(true);
      }
    };

    checkAuthentication();
  }, [setIsChecked, setLoggedInStatus]);

  useEffect(() => {
    if (!isChecked) return;

    if (isUserLoggedIn) {
      router.push("/admin/blog");
    } else {
      router.replace("/admin/auth");
    }
  }, [isUserLoggedIn, isChecked, router]);

  return <div>{children}</div>;
}
