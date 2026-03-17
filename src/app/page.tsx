import Link from "next/link";

const prototypes = [
  {
    name: "Animated Submit Button",
    href: "/components/button",
    description: "Button with loading spinner and success checkmark states",
  },
  {
    name: "Icon Button",
    href: "/components/iconButton",
    description: "Copy button with icon swap animation",
  },
  {
    name: "Ink Drop Button",
    href: "/components/inkdrop-button",
    description: "Button with ripple effect from click position",
  },
  {
    name: "Feedback Popover",
    href: "/components/popover",
    description: "Expandable feedback form with layout animation",
  },
  {
    name: "Toggle (Motion)",
    href: "/components/toggle-with-motion",
    description: "Toggle switch with spring animation",
  },
  {
    name: "Toggle (CSS + Motion)",
    href: "/components/toggle-with-motion-inputtag",
    description: "Toggle built with CSS and a Framer Motion variant",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-2xl flex-col gap-6 px-6 py-24 sm:px-16">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Playground
        </h1>
        <p className="text-sm text-zinc-500">
          Component prototypes and experiments.
        </p>
        <nav className="flex flex-col gap-3">
          {prototypes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-1 rounded-xl border border-zinc-200 px-5 py-4 transition-colors duration-150 ease-out hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {item.name}
              </span>
              <span className="text-xs text-zinc-500">
                {item.description}
              </span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
