"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthLoginType } from "./types";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { httpAxios } from "@/config/axios";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginType>();
  const { setLoggedInStatus } = useAuthStore();

  const handleOnSubmit = useCallback(
    async (data: AuthLoginType) => {
      setIsLoading(true);

      try {
        const response = await httpAxios.post("/auth", data);
        toast.success(response.data.message);
        setLoggedInStatus(true);
      } catch (error) {
        toast.error("error while authentication");
        console.log(`[ERROR] ${error}`);
      } finally {
        setIsLoading(false);
      }
    },
    [toast, setIsLoading, setLoggedInStatus]
  );

  return (
    <div className="max-w-xl flex items-center justify-center mx-auto screen w-full py-12">
      <section className="w-full">
        <form
          onSubmit={handleSubmit((data: AuthLoginType) => handleOnSubmit(data))}
          className="space-y-4"
        >
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <div>
              <Input
                id="email"
                autoFocus
                type="email"
                placeholder="enter email here..."
                {...register("email", { required: "email is required" })}
                className={`${errors.email ? "border-red-600" : ""}`}
                required
                disabled={isLoading}
              />
              {errors.email && (
                <span className="text-red-600 text-xs pl-1">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="password">Password</Label>
            <div>
              <Input
                id="password"
                autoFocus
                type="password"
                placeholder="enter password here..."
                {...register("password", { required: "password is required" })}
                className={`${errors.password ? "border-red-600" : ""}`}
                required
                disabled={isLoading}
              />
              {errors.password && (
                <span className="text-red-600 text-xs pl-1">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <Button disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span>Login</span>
            )}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Login;
