import { Metadata } from "next";
import LoginForm from "./LoginForm";
import { CDF_PHONE } from "@/lib/portal/constants";

export const metadata: Metadata = {
  title: "Sign in — CDF Investor Group",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <main className="min-h-screen bg-ink-950 text-ivory flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-ink-900 border border-champagne-700/30 rounded-lg p-8">
        <h1 className="text-heading-lg font-heading mb-2">Sign in</h1>
        <p className="text-base text-ivory/80 mb-6">
          We&rsquo;ll email you a one-time sign-in link. If you don&rsquo;t
          receive it within a few minutes, call us at{" "}
          <a
            href={`tel:${CDF_PHONE.replace(/[^\d+]/g, "")}`}
            className="text-champagne-300 underline"
          >
            {CDF_PHONE}
          </a>
          .
        </p>
        {sp.error && (
          <p
            role="alert"
            className="mb-4 p-3 rounded bg-red-500/15 border border-red-400/40 text-red-100"
          >
            {sp.error}
          </p>
        )}
        <LoginForm next={sp.next} />
      </div>
    </main>
  );
}
