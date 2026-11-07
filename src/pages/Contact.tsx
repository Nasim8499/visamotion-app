import * as React from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "../router";
import { BRAND } from "../components/Chrome";
import { pages } from "../content";

const SERVICES = [
  "Company incorporation",
  "Accounting",
  "Bookkeeping",
  "Company secretary",
  "Nominee director",
  "Ecommerce accounting",
  "Something else",
];

type Lead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  at: string;
};

const save = (lead: Lead) => {
  try {
    const key = "visamotion.leads";
    const all = JSON.parse(localStorage.getItem(key) || "[]") as Lead[];
    all.push(lead);
    localStorage.setItem(key, JSON.stringify(all));
  } catch {
    /* storage can be blocked; the confirmation still shows */
  }
};

export default function Contact() {
  const page = pages["/contact-us"];
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: SERVICES[0],
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [sent, setSent] = React.useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (values.name.trim().length < 2) errs.name = "Tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errs.email = "Enter a valid email";
    if (values.message.trim().length < 10) errs.message = "A sentence or two helps us reply properly";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    save({ ...values, at: new Date().toISOString() });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="shell py-16">
        <motion.div
          className="card mx-auto max-w-lg p-8 text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        >
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e8f5ec] text-[#1c7a35]">
            <Check size={26} />
          </span>
          <h1 className="h3 mt-4">Brief received</h1>
          <p className="body-text mt-2">
            Thanks {values.name.split(" ")[0]}. Your request for {values.service.toLowerCase()} is logged. A
            specialist replies within one business day.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link to="/" className="btn btn-primary w-full">
              Back to home
            </Link>
            <button onClick={() => setSent(false)} className="btn btn-ghost">
              Send another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="shell pb-16 pt-8">
      <p className="eyebrow">Contact</p>
      <h1 className="h2 mt-2 max-w-[700px]">
        {page ? page.title.replace(/\s+/g, " ") : "Good business starts with a conversation."}
      </h1>
      <p className="lead mt-3 max-w-[560px]">
        Tell us what you are setting up or switching. We reply within one business day with next steps, documents
        and pricing.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} noValidate className="card space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[13px] font-medium text-[var(--muted)]">Name</span>
              <input
                value={values.name}
                onChange={set("name")}
                placeholder="Aisha Rahman"
                className={`mt-1 h-12 w-full rounded-xl border px-3 text-[16px] outline-none ${
                  errors.name ? "border-[#d70015]" : "border-[var(--line)]"
                }`}
              />
              {errors.name && <span className="mt-1 block text-[12px] text-[#d70015]">{errors.name}</span>}
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-[var(--muted)]">Email</span>
              <input
                value={values.email}
                onChange={set("email")}
                type="email"
                placeholder="you@company.com"
                className={`mt-1 h-12 w-full rounded-xl border px-3 text-[16px] outline-none ${
                  errors.email ? "border-[#d70015]" : "border-[var(--line)]"
                }`}
              />
              {errors.email && <span className="mt-1 block text-[12px] text-[#d70015]">{errors.email}</span>}
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-[var(--muted)]">Phone (optional)</span>
              <input
                value={values.phone}
                onChange={set("phone")}
                placeholder="+65 8123 4567"
                className="mt-1 h-12 w-full rounded-xl border border-[var(--line)] px-3 text-[16px] outline-none"
              />
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-[var(--muted)]">Company (optional)</span>
              <input
                value={values.company}
                onChange={set("company")}
                placeholder="New Pte Ltd"
                className="mt-1 h-12 w-full rounded-xl border border-[var(--line)] px-3 text-[16px] outline-none"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-[13px] font-medium text-[var(--muted)]">What do you need</span>
            <select
              value={values.service}
              onChange={set("service")}
              className="mt-1 h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 text-[16px] outline-none"
            >
              {SERVICES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-[var(--muted)]">Details</span>
            <textarea
              value={values.message}
              onChange={set("message")}
              rows={5}
              placeholder="Setting up a Singapore Pte Ltd, two directors, first accounting year starts in March."
              className={`mt-1 w-full rounded-xl border p-3 text-[16px] outline-none ${
                errors.message ? "border-[#d70015]" : "border-[var(--line)]"
              }`}
            />
            {errors.message && <span className="mt-1 block text-[12px] text-[#d70015]">{errors.message}</span>}
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Send request
          </button>
          <p className="text-[12px] text-[var(--muted)]">
            We use your details only to answer this request. See the privacy policy for the full picture.
          </p>
        </form>

        <div className="space-y-4">
          <div className="card p-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--blue)]">
              Prefer to talk
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">
              {BRAND} is a Singapore-registered firm. Calls run Monday to Friday, 9am to 6pm SGT.
            </p>
            <div className="mt-4 space-y-2 text-[14px]">
              <p>hello@visamotion365.com</p>
              <p>+65 6000 0000</p>
            </div>
            <Link to="/faq" className="btn btn-ghost mt-3 px-0">
              Read the FAQ <ChevronRight size={15} />
            </Link>
          </div>
          <div className="card p-6">
            <p className="text-[15px] font-semibold">What happens next</p>
            <ol className="mt-3 space-y-2.5">
              {[
                "We confirm your setup and flag anything missing.",
                "You get a document checklist and a fixed quote.",
                "ACRA filing starts the same week once signed.",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 text-[14px] text-[var(--muted)]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--band)] text-[12px] font-semibold text-[var(--text)]">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
