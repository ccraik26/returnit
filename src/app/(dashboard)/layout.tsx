import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/receipts" className="text-lg font-bold tracking-tight text-zinc-900">
            ReturnIt
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/receipts" className="text-zinc-600 hover:text-zinc-900">
              Receipts
            </Link>
            <Link href="/returns" className="text-zinc-600 hover:text-zinc-900">
              Returns
            </Link>
            <Link href="/settings" className="text-zinc-600 hover:text-zinc-900">
              Settings
            </Link>
            <form action={signOut}>
              <button type="submit" className="text-zinc-500 hover:text-zinc-900">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}