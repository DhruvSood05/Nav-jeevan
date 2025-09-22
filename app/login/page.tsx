"use client";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const error = searchParams.get("error");

  useEffect(() => {
    if (user) {
      console.log("User detected, redirecting to home:", user.email);
      router.push("/");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent", // Regular login
          },
        },
      });

      if (error) {
        console.error("Login error:", error);
      } else {
        console.log("OAuth initiated:", data);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOutAndLogin = async () => {
    try {
      setLoading(true);
      // First sign out completely
      await supabase.auth.signOut();

      // Then initiate new login with account selection
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "select_account", // Force account selection
          },
        },
      });

      if (error) {
        console.error("Login error:", error);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Redirecting to home page...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to Nav Jeevan
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access emergency relief coordination platform
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              Authentication error: {decodeURIComponent(error)}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 bg-red-600 hover:bg-red-700"
          >
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>

          <Button
            onClick={handleSignOutAndLogin}
            disabled={loading}
            variant="outline"
            className="w-full flex justify-center py-3 px-4 border-red-200 text-red-700 hover:bg-red-50"
          >
            {loading ? "Signing in..." : "Sign in with Different Account"}
          </Button>

          <div className="text-center text-xs text-gray-500">
            By signing in, you agree to our terms of service
          </div>
        </div>
      </div>
    </div>
  );
}
