import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-zinc-900">ReturnIt</span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              beta
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 sm:block"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-white to-white" />
          <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Returns,{" "}
                <span className="text-emerald-600">handled.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 sm:text-xl">
                Upload receipts once. Get reminders before the window closes.
                Then our team picks up the item and processes the return for you.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/signup"
                  className="rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-500 transition-all"
                >
                  Start free
                </Link>
                <Link
                  href="#pricing"
                  className="rounded-full border border-zinc-200 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-zinc-100 bg-zinc-50/60 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Three steps. Zero trips to the store.
              </h2>
              <p className="mt-3 text-zinc-600">
                We take the headache out of returns so you can get on with your day.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  1
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900">Store the receipt</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Snap a photo or enter the details. We track the return window for you.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  2
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900">Get reminded</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Notifications before the window closes so nothing slips through.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  3
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900">We handle the rest</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Schedule a pickup. Our runner takes the item and processes the return.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-zinc-100 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Simple, fair pricing
              </h2>
              <p className="mt-3 text-zinc-600">
                Free to track receipts. Pay only when you need a pickup.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Free */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="text-sm font-semibold text-emerald-600">Free</div>
                <div className="mt-2 text-3xl font-bold text-zinc-900">$0</div>
                <p className="mt-1 text-sm text-zinc-500">Forever</p>
                <ul className="mt-6 space-y-2 text-sm text-zinc-600">
                  <li>• Receipt vault</li>
                  <li>• Return window tracking</li>
                  <li>• Automatic reminders</li>
                </ul>
              </div>

              {/* Small */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-500">Small return</div>
                <div className="mt-2 text-3xl font-bold text-zinc-900">$13</div>
                <p className="mt-1 text-sm text-zinc-500">1 item</p>
                <ul className="mt-6 space-y-2 text-sm text-zinc-600">
                  <li>• Single item or small bag</li>
                  <li>• Pickup & return processed</li>
                </ul>
              </div>

              {/* Standard - highlighted */}
              <div className="relative rounded-2xl border-2 border-emerald-500 bg-white p-6 shadow-md">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Most popular
                </div>
                <div className="text-sm font-semibold text-emerald-600">Standard</div>
                <div className="mt-2 text-3xl font-bold text-zinc-900">$17</div>
                <p className="mt-1 text-sm text-zinc-500">Typical return</p>
                <ul className="mt-6 space-y-2 text-sm text-zinc-600">
                  <li>• Most common returns</li>
                  <li>• Full pickup service</li>
                </ul>
              </div>

              {/* Multi */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-500">Multi / multi-store</div>
                <div className="mt-2 text-3xl font-bold text-zinc-900">$22</div>
                <p className="mt-1 text-sm text-zinc-500">3+ items or multiple stores</p>
                <ul className="mt-6 space-y-2 text-sm text-zinc-600">
                  <li>• Multiple items</li>
                  <li>• Different stores OK</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-zinc-500">
              Or buy a <span className="font-medium text-zinc-700">3-pack for $36</span> ($12 each)
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-zinc-100 bg-emerald-50/50 py-16">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Ready to stop making return trips?
            </h2>
            <p className="mt-3 text-zinc-600">
              Create a free account in under a minute. Add your first receipt and we’ll start tracking the window for you.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-500 transition-colors"
            >
              Start free →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white py-10">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-zinc-500 sm:px-6">
          © {new Date().getFullYear()} ReturnIt. Built for busy people who hate returns.
        </div>
      </footer>
    </div>
  );
}