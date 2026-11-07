import { ArrowUpRight, BarChart3, BookOpen, Building2, Calculator, ChevronRight, FileCheck2, Star, UserCheck } from "lucide-react";
import { Link } from "../router";
import { BRAND } from "../components/Chrome";
import { pages, serviceTiles, toolTiles, cleanTitle } from "../content";
import faqs from "../faq.json";

const home = pages["/"];

const headline = "Hassle-free incorporation and expert accounting for better businesses";
const sub =
  "Start your business with fast online company incorporation. Plus a bank account and registered address from day one. Then keep it compliant with accountants who know your numbers.";

const ICONS = [Building2, Calculator, FileCheck2, BookOpen, UserCheck, BarChart3];
const TINTS = [
  "from-[#cfe4ff] to-[#eaf3ff] text-[#0063d1]",
  "from-[#e0d8ff] to-[#f0ecff] text-[#5b3df0]",
  "from-[#d3f2ff] to-[#ecfaff] text-[#0079a8]",
  "from-[#ffe3ef] to-[#fff0f6] text-[#c0186a]",
  "from-[#d9f7e4] to-[#eefdf3] text-[#0f7a3d]",
  "from-[#ffeacc] to-[#fff6e8] text-[#a35b00]",
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 px-3 py-4 text-center backdrop-blur-xl">
      <p className="text-[24px] font-bold tracking-[-0.03em] sm:text-[30px]">{value}</p>
      <p className="mt-1 text-[11.5px] leading-tight text-[var(--muted)]">{label}</p>
    </div>
  );
}

export default function Home() {
  const pillars = home.blocks.filter((b) => b.t === "h3" && b.x.length < 46).slice(0, 2);

  return (
    <>
      <section className="px-2.5">
        <div className="panel overflow-hidden !p-0">
          <div className="relative px-5 pb-7 pt-8 text-center sm:px-10 sm:pb-10 sm:pt-12">
            <div
              className="pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-70"
              style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(0,122,255,0.22), transparent 70%)" }}
            />
            <p className="eyebrow">Singapore · Incorporation & accounting</p>
            <h1 className="h1 mx-auto mt-4 max-w-[860px]">{headline}</h1>
            <p className="lead mx-auto mt-4 max-w-[600px]">{sub}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact-us" className="btn btn-primary">
                Get started
              </Link>
              <Link to="/demo" className="btn btn-outline">
                Schedule a call <ChevronRight size={15} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-[var(--muted)]">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 shadow-[inset_0_1px_0_#fff]">
                <Star size={12} className="fill-[#f5a623] text-[#f5a623]" /> 4.2 · 1,012 reviews
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-[inset_0_1px_0_#fff]">50,000+ founders</span>
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-[inset_0_1px_0_#fff]">150+ countries</span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {serviceTiles.map((t, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Link key={t.to} to={t.to} className="tile">
                <span
                  className={`mb-3 grid h-10 w-10 place-items-center rounded-[13px] bg-gradient-to-b ${TINTS[i % TINTS.length]} shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]`}
                >
                  <Icon size={19} strokeWidth={2} />
                </span>
                <p className="text-[15.5px] font-semibold leading-tight tracking-[-0.01em]">{t.label}</p>
                <p className="mt-1 text-[12px] leading-snug text-[var(--muted)]">{t.note}</p>
                <span className="mt-2.5 inline-flex items-center gap-0.5 text-[12px] font-semibold text-[var(--link)]">
                  Learn more <ChevronRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 px-2.5">
        <div className="band px-1 py-8 sm:px-6 sm:py-10">
          <div className="shell">
            <p className="eyebrow">What we do</p>
            <h2 className="h2 mt-3 max-w-[700px]">Flexible services for every stage of your business</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {pillars.map((p, i) => {
                const para = home.blocks.find(
                  (b, idx) => b.t === "p" && idx > home.blocks.indexOf(p) && b.x.length > 60
                );
                return (
                  <div key={p.x} className="card p-5">
                    <h3 className="h3">{p.x}</h3>
                    <p className="body-text mt-2 !text-[14.5px]">{para?.x ?? ""}</p>
                    <Link to={i === 0 ? "/incorporation" : "/accounting-services-singapore"} className="btn btn-ghost mt-3 px-0 !min-h-[28px]">
                      Explore <ChevronRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-12">
        <div className="grid gap-5 md:grid-cols-[1.05fr_1fr] md:items-center">
          <div>
            <p className="eyebrow">Why {BRAND}</p>
            <h2 className="h2 mt-3">From founding to filing and beyond</h2>
            <p className="body-text mt-3 max-w-[500px]">
              Accountants who take a proactive approach, and software built in-house so your bookkeeping, invoicing
              and cash flow live in one place.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/accounting-for-tech-companies" className="btn btn-outline !min-h-[40px] !text-[13.5px]">
                For tech companies
              </Link>
              <Link to="/ecommerce-accounting-services" className="btn btn-outline !min-h-[40px] !text-[13.5px]">
                For ecommerce
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Stat value="50,000+" label="Founders served" />
            <Stat value="150+" label="Countries" />
            <Stat value="1-3 days" label="Incorporation" />
            <Stat value="97%" label="Recommend us" />
          </div>
        </div>
      </section>

      <section className="mt-12 px-2.5">
        <div className="band px-1 py-8 sm:px-6 sm:py-10">
          <div className="shell">
            <p className="eyebrow">Free tools</p>
            <h2 className="h2 mt-3">Work out the numbers first</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {toolTiles.map((t) => (
                <Link key={t.to} to={t.to} className="tile">
                  <p className="text-[14.5px] font-semibold leading-tight">{t.label}</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-[var(--muted)]">{t.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-12">
        <div className="card overflow-hidden p-6 text-center sm:p-9">
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--blue-deep)]">Customer story</p>
          <blockquote className="mx-auto mt-3 max-w-[640px] text-[23px] font-bold leading-tight tracking-[-0.025em] sm:text-[32px]">
            “I use {BRAND} to help me succeed”
          </blockquote>
          <p className="mt-2.5 text-[12.5px] text-[var(--muted)]">Felix Lee, ADPList</p>
          <Link to="/customer-stories" className="btn btn-ghost mt-3">
            All customer stories <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      <section className="shell mt-12">
        <h2 className="h2">Questions, answered</h2>
        <p className="body-text mt-2">The five things founders ask most often.</p>
        <div className="mt-5 overflow-hidden rounded-[20px] border border-white/70 bg-white/55 backdrop-blur-xl">
          {faqs.slice(0, 5).map((f) => (
            <details key={f.q} className="group border-b border-[var(--line)] last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-[15px] font-semibold">
                {f.q}
                <ChevronRight size={16} className="shrink-0 text-[var(--muted)] transition-transform group-open:rotate-90" />
              </summary>
              <p className="px-4 pb-4 text-[14px] leading-relaxed text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
        <Link to="/faq" className="btn btn-ghost mt-3 px-0">
          All {faqs.length} questions <ChevronRight size={14} />
        </Link>
      </section>

      <section className="mt-12 px-2.5">
        <div className="panel text-center">
          <h2 className="h2">Start your business today</h2>
          <p className="lead mx-auto mt-3 max-w-[480px]">
            Tell us what you are building. We reply with next steps, documents and pricing.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/contact-us" className="btn btn-primary">
              Get started
            </Link>
            <Link to="/incorporation" className="btn btn-outline">
              See incorporation <ChevronRight size={15} />
            </Link>
          </div>
          <p className="mt-5 text-[11.5px] text-[var(--muted)]">
            Also reading: {cleanTitle(pages["/guides/company-registration-in-singapore"].title)}
          </p>
        </div>
      </section>
    </>
  );
}
