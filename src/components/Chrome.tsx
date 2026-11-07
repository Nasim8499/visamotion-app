import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { Link, navigate, useRoute } from "../router";
import { navGroups, pages, routeList } from "../content";

export const BRAND = "VisaMOTion365";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = React.useState("");
  const results = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return routeList.slice(0, 8);
    return routeList
      .filter((r) => {
        const p = pages[r];
        return (p.title + " " + r + " " + p.blocks.slice(0, 6).map((b) => b.x).join(" "))
          .toLowerCase()
          .includes(term);
      })
      .slice(0, 14);
  }, [q]);

  React.useEffect(() => {
    if (open) setTimeout(() => document.getElementById("site-search")?.focus(), 60);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/25 p-4 pt-20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="card w-full max-w-xl overflow-hidden"
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-4">
              <Search size={18} className="text-[var(--muted)]" />
              <input
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services, tools, guides"
                className="h-14 flex-1 bg-transparent text-[17px] outline-none placeholder:text-[var(--muted)]"
              />
              <button onClick={onClose} aria-label="Close search" className="p-2 text-[var(--muted)]">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[54vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-[15px] text-[var(--muted)]">No page matches that.</p>
              )}
              {results.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    navigate(r);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left hover:bg-[var(--band)]"
                >
                  <span className="truncate text-[15px]">{pages[r].title}</span>
                  <ChevronRight size={16} className="shrink-0 text-[var(--muted)]" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-[var(--bg)] pt-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="shell h-full overflow-y-auto pb-24">
            {navGroups.map((g) => (
              <div key={g.label} className="border-b border-[var(--line)] py-4">
                <p className="eyebrow mb-2">{g.label}</p>
                <div className="grid gap-1">
                  {g.items.map((i) => (
                    <Link
                      key={i.to}
                      to={i.to}
                      onClick={onClose}
                      className="flex min-h-[44px] items-center justify-between text-[17px]"
                    >
                      <span className="truncate pr-3">{i.title}</span>
                      <ChevronRight size={16} className="text-[var(--muted)]" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                navigate("/contact-us");
                onClose();
              }}
              className="btn btn-primary mt-6 w-full"
            >
              Get started
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Nav() {
  const [menu, setMenu] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  const route = useRoute();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav className="nav-bar">
        <div className="shell flex h-12 items-center gap-6">
          <Link to="/" className="tap flex items-center gap-2 text-[13px] font-semibold">
            <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-[var(--text)] text-[11px] font-bold text-[var(--bg)]">
              V
            </span>
            <span className="hidden sm:inline">{BRAND}</span>
          </Link>

          <div className="ml-2 hidden items-center gap-6 md:flex">
            {navGroups.slice(0, 4).map((g) => (
              <div
                key={g.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(g.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button className="nav-link py-3">{g.label}</button>
                <AnimatePresence>
                  {openGroup === g.label && (
                    <motion.div
                      className="card absolute left-0 top-full w-[320px] overflow-hidden p-2"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      {g.items.map((i) => (
                        <Link
                          key={i.to}
                          to={i.to}
                          className="block truncate rounded-lg px-3 py-2 text-[13px] hover:bg-[var(--band)]"
                        >
                          {i.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link to="/faq" className="nav-link py-3">
              FAQ
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setSearch(true)}
              aria-label="Search"
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--text)] hover:bg-[var(--band)]"
            >
              <Search size={16} />
            </button>
            <Link
              to="/contact-us"
              className="hidden min-h-[32px] items-center rounded-full bg-[var(--blue)] px-3 text-[12px] font-medium text-white sm:flex"
            >
              Get started
            </Link>
            <button
              onClick={() => setMenu(true)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full md:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
      <SearchSheet open={search} onClose={() => setSearch(false)} />
      <div className="h-12" aria-hidden />
      {route === "/" ? null : null}
    </>
  );
}

export function Footer() {
  return (
    <footer className="band mt-20">
      <div className="shell py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {navGroups.slice(0, 4).map((g) => (
            <div key={g.label}>
              <p className="mb-3 text-[13px] font-semibold">{g.label}</p>
              <ul className="space-y-2">
                {g.items.slice(0, 6).map((i) => (
                  <li key={i.to}>
                    <Link to={i.to} className="text-[12px] text-[var(--muted)] hover:text-[var(--text)]">
                      {i.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-[var(--line)] pt-6">
          <p className="text-[12px] leading-relaxed text-[var(--muted)]">
            {BRAND} PTE. LTD. Singapore. Incorporation, accounting and company secretarial services. Government
            filings are submitted by licensed professionals, and every statutory deadline remains the
            responsibility of the company.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {navGroups[4].items.map((i) => (
              <Link key={i.to} to={i.to} className="text-[12px] text-[var(--muted)] hover:text-[var(--text)]">
                {i.title}
              </Link>
            ))}
            <span className="text-[12px] text-[var(--muted)]">© 2026 {BRAND}</span>
          </div>
        </div>
      </div>
      <div className="safe-bottom" />
    </footer>
  );
}
