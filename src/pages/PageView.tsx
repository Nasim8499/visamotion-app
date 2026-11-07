import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Link, navigate } from "../router";
import { BRAND, Reveal } from "../components/Chrome";
import { pages, cleanTitle } from "../content";

type Node =
  | { kind: "h"; level: number; text: string; id: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string };

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);

export default function PageView({ route }: { route: string }) {
  const page = pages[route];
  const sections = React.useMemo(() => {
    if (!page) return { nodes: [] as Node[], toc: [] as { id: string; text: string }[] };
    const nodes: Node[] = [];
    const toc: { id: string; text: string }[] = [];
    for (const b of page.blocks) {
      if (b.t === "h1") continue;
      if (b.t === "h2" || b.t === "h3" || b.t === "h4") {
        const id = slug(b.x);
        if (b.t === "h2") toc.push({ id, text: b.x });
        nodes.push({ kind: "h", level: Number(b.t[1]), text: b.x, id });
        continue;
      }
      if (b.t === "li") {
        const last = nodes[nodes.length - 1];
        if (last && last.kind === "list") last.items.push(b.x);
        else nodes.push({ kind: "list", items: [b.x] });
        continue;
      }
      if (b.t === "blockquote") {
        nodes.push({ kind: "quote", text: b.x });
        continue;
      }
      nodes.push({ kind: "p", text: b.x });
    }
    return { nodes, toc };
  }, [page]);

  if (!page) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="h2">Page not found</h1>
        <p className="body-text mt-2">That link does not exist in this app.</p>
        <button onClick={() => navigate("/")} className="btn btn-primary mt-6">
          Back home
        </button>
      </div>
    );
  }

  const intro = page.blocks.find((b) => b.t === "p");

  return (
    <article className="shell pb-16 pt-8">
      <nav className="mb-4 flex items-center gap-1 text-[12px] text-[var(--muted)]">
        <Link to="/" className="hover:text-[var(--text)]">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="truncate">{cleanTitle(page.title)}</span>
      </nav>

      <header className="max-w-[820px]">
        <h1 className="h2">{cleanTitle(page.title)}</h1>
        {intro && intro.x !== cleanTitle(page.title) && (
          <p className="lead mt-4 max-w-[680px]">{intro.x}</p>
        )}
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="prose max-w-[720px]">
          {sections.nodes.map((n, i) => {
            if (n.kind === "h") {
              if (n.level === 2)
                return (
                  <h2 key={i} id={n.id} className="scroll-mt-20">
                    {n.text}
                  </h2>
                );
              if (n.level === 3) return <h3 key={i}>{n.text}</h3>;
              return <h4 key={i}>{n.text}</h4>;
            }
            if (n.kind === "p") {
              if (n.text.length < 42 && i < 6) {
                return (
                  <p key={i} className="eyebrow !text-[12px]">
                    {n.text}
                  </p>
                );
              }
              return <p key={i}>{n.text}</p>;
            }
            if (n.kind === "list") {
              return (
                <ul key={i} className="mb-5 space-y-2">
                  {n.items.map((it, j) => (
                    <li key={j} className="flex gap-2 text-[17px] leading-relaxed text-[var(--muted)]">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)]" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <blockquote
                key={i}
                className="my-6 border-l-2 border-[var(--blue)] pl-5 text-[19px] font-medium leading-snug text-[var(--text)]"
              >
                {n.text}
              </blockquote>
            );
          })}
        </div>

        {sections.toc.length > 2 && (
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                On this page
              </p>
              <ul className="mt-3 space-y-2 border-l border-[var(--line)] pl-3">
                {sections.toc.slice(0, 10).map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="line-clamp-2 text-[13px] leading-snug text-[var(--muted)] hover:text-[var(--text)]"
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>

      <Reveal>
        <div className="card mt-12 flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[19px] font-semibold tracking-[-0.01em]">Ready to get this handled?</p>
            <p className="mt-1 text-[14px] text-[var(--muted)]">
              {BRAND} replies within one business day with documents and pricing.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/contact-us" className="btn btn-primary">
              Get started
            </Link>
            <Link to="/faq" className="btn btn-ghost">
              FAQ <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
