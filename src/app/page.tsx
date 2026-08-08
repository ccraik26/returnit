
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-zinc-900">ReturnIt</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              beta
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Returns, handled.
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Upload receipts once. Get reminders before the window closes.
              Then our team picks up the item and processes the return for you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Start free
              </Link>
              <Link
                href="#how"
                className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                How it works
              </Link>
            </div>
          </div>
        </section>

        <section id="how" className="border-t border-zinc-200 bg-white py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Three steps. Zero trips to the store.
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white">
                  1
                </div>
                <h3 className="mt-4 font-medium text-zinc-900">Store the receipt</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Snap a photo or enter the details. We track the return window for you.
                </p>
              </div>
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white">
                  2
                </div>
                <h3 className="mt-4 font-medium text-zinc-900">Get reminded</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Notifications before the window closes so nothing slips through.
                </p>
              </div>
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white">
                  3
                </div>
                <h3 className="mt-4 font-medium text-zinc-900">We handle the rest</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Schedule a pickup. Our runner takes the item and processes the return.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-zinc-500 sm:px-6">
          © {new Date().getFullYear()} ReturnIt. Built for busy people who hate returns.
        </div>
      </footer>
    </div>
  );
}
