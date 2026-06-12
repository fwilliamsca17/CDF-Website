"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await supabaseBrowser().auth.signOut();
        router.push("/");
        router.refresh();
      }}
      className="text-sm text-ivory/80 hover:text-champagne-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne-400 rounded-sm px-2 py-1"
    >
      Sign out
    </button>
  );
}
