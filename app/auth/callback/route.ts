// // app/auth/callback/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export async function GET(req: NextRequest) {
//   const requestUrl = new URL(req.url);
//   const code = requestUrl.searchParams.get("code");

//   if (code) {
//     const supabase = createRouteHandlerClient({ cookies });
//     // Exchange the code for a session & set auth cookies
//     await supabase.auth.exchangeCodeForSession(code);
//   }

//   // where to land after Google login completes
//   const next = requestUrl.searchParams.get("next") || "/dashboard";
//   return NextResponse.redirect(new URL(next, requestUrl.origin));
// }

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // if (code) {
  //   const supabase = createRouteHandlerClient({ cookies });
  //   await supabase.auth.exchangeCodeForSession(code);
  // }

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(
          `${requestUrl.origin}/login?error=${encodeURIComponent(
            error.message
          )}`
        );
      }

      console.log(
        "Session created successfully for:",
        data.session?.user?.email
      );
    } catch (error) {
      console.error("Callback processing error:", error);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=callback_failed`
      );
    }
  }

  // Redirect to dashboard or home page after successful login
  return NextResponse.redirect(`${requestUrl.origin}/`);
}
