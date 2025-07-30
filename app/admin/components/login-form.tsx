"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const adminEmailList = [
      "graceyan244@gmail.com",
      "graceblessed34@gmail.com",
    ];
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Restrict access
      if (user.email !== null && !adminEmailList.includes(user.email)) {
        alert("Access Denied: You are not an admin.");
        await auth.signOut();
        return;
      }

      // ✅ Redirect to dashboard
      router.push("/admin");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
}
