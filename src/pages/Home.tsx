import { motion } from "framer-motion";
import { ChevronRight, Star, ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import { BRAND, Reveal } from "../components/Chrome";
import { pages, serviceTiles, toolTiles, cleanTitle } from "../content";
import faqs from "../faq.json";

const home = pages["/"];

const headline =
  "Hassle-free incorporation and expert accounting for better businesses";
const sub =
  "Start your business with fast online company incorporation. Plus a bank account and registered address from day one. Then keep it compliant with accountants who know your numbers.";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]">{value}</p>
      <p className="mt-1 text-[12px] leading-tight text-[var(--muted)]">{label}</p>
    </div>
  );
}

export default function Home() {
  const pillars = home.blocks.filter((b) => b.t === "h3" && b.x.length < 46).slice(0, 2);

  return (
    <>
      <section className="shell pb-6 pt-10 text-center sm:pt-16">
        <Reveal>
          <p className="eyebrow">Singapore · Incorporation & accounting</p>
          <h1 className="h1 mx-auto mt-3 max-w-[900px]">{headline}</h1>
          <p className="lead mx-auto mt-5 max-w-[640px]">{sub}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact-us" className="btn btn-primary">
              Get started
            </Link>
            <Link to="/demo" className="btn btn-ghost">
              Schedule a call <ChevronRight size={16} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[var(--muted)]">
            <span className="inline-flex items-center gap-1">
              <Star size={13} className="fill-current text-[#f5a623]" /> 4.2 · 1,012 reviews
            </span>
            <span>50,000+ founders</span>
            <span>150+ countries served</span>
          </div>
        </Reveal>
      </section>

      <section className="shell mt-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {serviceTiles.map((t, i) => (
            <motion.div
              key={t.to}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={t.to} className="tile h-full">
                <p className="text-[17px] font-semibold tracking-[-0.01em]">{t.label}</p>
                <p className="mt-1 text-[13px] leading-snug text-[var(--muted)]">{t.note}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] text-[var(--link)]">
                  Learn more <ChevronRight size={13} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="band mt-16 py-16">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="h2 mt-2 max-w-[720px]">
              Flexible services for every stage of your business
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pillars.map((p, i) => {
              const para = home.blocks.find(
                (b, idx) => b.t === "p" && idx > home.blocks.indexOf(p) && b.x.length > 60
              );
              return (
                <Reveal key={p.x} delay={i * 0.06}>
                  <div className="card h-full p-6">
                    <h3 className="h3">{p.x}</h3>
                    <p className="body-text mt-2">{para?.x ?? ""}</p>
                    <Link
                      to={i === 0 ? "/incorporation" : "/accounting-services-singapore"}
                      className="btn btn-ghost mt-4 px-0"
                    >
                      Explore <ChevronRight size={15} />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
          <Reveal>
            <p className="eyebrow">Why {BRAND}</p>
            <h2 className="h2 mt-2">From founding to filing and beyond</h2>
            <p className="body-text mt-3 max-w-[520px]">
              Accountants who take a proactive approach, and software built in-house so your bookkeeping,
              invoicing and cash flow live in one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/accounting-for-tech-companies" className="btn btn-outline">
                For tech companies
              </Link>
              <Link to="/ecommerce-accounting-services" className="btn btn-outline">
                For ecommerce
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card grid grid-cols-2 gap-6 p-6">
              <Stat value="50,000+" label="Founders served" />
              <Stat value="150+" label="Countries" />
              <Stat value="1-3 days" label="Incorporation" />
              <Stat value="97%" label="Recommend us" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band py-16">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Free tools</p>
            <h2 className="h2 mt-2">Work out the numbers first</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {toolTiles.map((t, i) => (
              <motion.div
                key={t.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <Link to={t.to} className="tile h-full">
                  <p className="text-[15px] font-semibold">{t.label}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-[var(--muted)]">{t.note}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <Reveal>
          <div className="card overflow-hidden p-7 text-center">
            <p className="text-[15px] text-[var(--muted)]">Customer story</p>
            <blockquote className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
              “I use {BRAND} to help me succeed”
            </blockquote>
            <p className="mt-3 text-[13px] text-[var(--muted)]">Felix Lee, ADPList</p>
            <Link to="/customer-stories" className="btn btn-ghost mt-4">
              All customer stories <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="shell pb-16">
        <Reveal>
          <h2 className="h2">Questions, answered</h2>
          <p className="body-text mt-2">The five things founders ask most often.</p>
        </Reveal>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--line)]">
          {faqs.slice(0, 5).map((f) => (
            <details key={f.q} className="group border-b border-[var(--line)] last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-medium">
                {f.q}
                <ChevronRight size={16} className="shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
        <Link to="/faq" className="btn btn-ghost mt-4 px-0">
          All {faqs.length} questions <ChevronRight size={15} />
        </Link>
      </section>

      <section className="band py-16">
        <div className="shell text-center">
          <h2 className="h2">Start your business today</h2>
          <p className="lead mx-auto mt-3 max-w-[520px]">
            Tell us what you are building. We reply with next steps, documents and pricing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact-us" className="btn btn-primary">
              Get started
            </Link>
            <Link to="/incorporation" className="btn btn-ghost">
              See incorporation <ChevronRight size={16} />
            </Link>
          </div>
          <p className="mt-6 text-[12px] text-[var(--muted)]">
            Also reading: {cleanTitle(pages["/guides/company-registration-in-singapore"].title)}
          </p>
        </div>
      </section>
    </>
  );
}
