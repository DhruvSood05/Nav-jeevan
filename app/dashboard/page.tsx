// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const supabase = createServerComponentClient({ cookies });
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) redirect("/login");

//   return (
//     <section className="p-6">
//       <h1 className="text-2xl font-semibold">Welcome, {session.user.email}</h1>
//       {/* your dashboard UI */}
//     </section>
//   );
// }

"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back to Nav Jeevan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">User ID: {user.id}</p>
            <p className="text-sm text-gray-600">
              Last login:{" "}
              {new Date(user.last_sign_in_at || "").toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={() => router.push("/request-help")}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Request Emergency Help
            </Button>
            <Button
              onClick={() => router.push("/volunteer")}
              variant="outline"
              className="w-full"
            >
              Volunteer Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={() => router.push("/map")}
              variant="outline"
              className="w-full"
            >
              View Live Map
            </Button>
            <Button
              onClick={() => router.push("/donate")}
              variant="outline"
              className="w-full"
            >
              Make Donation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
