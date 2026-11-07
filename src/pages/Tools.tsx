import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "../router";
import { pages } from "../content";

const money = (n: number) =>
  isFinite(n) ? n.toLocaleString("en-SG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00";

function Shell({
  route,
  children,
}: {
  route: string;
  children: React.ReactNode;
}) {
  const page = pages[route];
  return (
    <div className="shell pb-16 pt-8">
      <p className="eyebrow">Free tool</p>
      <h1 className="h2 mt-2 max-w-[720px]">{page ? page.title.replace(/\s+/g, " ") : "Calculator"}</h1>
      {page?.blocks.find((b) => b.t === "p") && (
        <p className="lead mt-3 max-w-[620px]">{page.blocks.find((b) => b.t === "p")!.x}</p>
      )}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  suffix,
  type = "number",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-[var(--muted)]">{label}</span>
      <div className="mt-1 flex items-center rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3">
        <input
          type={type}
          value={value}
          inputMode="decimal"
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full bg-transparent text-[17px] outline-none"
        />
        {suffix && <span className="text-[13px] text-[var(--muted)]">{suffix}</span>}
      </div>
    </label>
  );
}

function Result({ rows, total }: { rows: { k: string; v: string }[]; total?: { k: string; v: string } }) {
  return (
    <div className="card overflow-hidden">
      {rows.map((r) => (
        <div key={r.k} className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3.5">
          <span className="text-[14px] text-[var(--muted)]">{r.k}</span>
          <span className="text-[15px] font-medium">S${r.v}</span>
        </div>
      ))}
      {total && (
        <div className="flex items-center justify-between bg-[var(--band)] px-5 py-4">
          <span className="text-[15px] font-semibold">{total.k}</span>
          <span className="text-[22px] font-semibold tracking-[-0.02em]">S${total.v}</span>
        </div>
      )}
    </div>
  );
}

export function GstCalculator() {
  const [amount, setAmount] = React.useState("1000");
  const [rate, setRate] = React.useState("9");
  const [mode, setMode] = React.useState<"add" | "remove">("add");
  const a = Number(amount) || 0;
  const r = (Number(rate) || 0) / 100;
  const net = mode === "add" ? a : a / (1 + r);
  const gst = mode === "add" ? a * r : a - net;
  const gross = net + gst;

  return (
    <Shell route="/gst-calculator">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-4 p-5">
          <div className="flex rounded-xl bg-[var(--band)] p-1">
            {(["add", "remove"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`h-10 flex-1 rounded-lg text-[14px] font-medium transition ${
                  mode === m ? "bg-[var(--bg)] shadow-sm" : "text-[var(--muted)]"
                }`}
              >
                {m === "add" ? "Add GST" : "Remove GST"}
              </button>
            ))}
          </div>
          <Field label={mode === "add" ? "Amount before GST" : "Amount including GST"} value={amount} onChange={setAmount} suffix="SGD" />
          <Field label="GST rate" value={rate} onChange={setRate} suffix="%" />
        </div>
        <Result
          rows={[
            { k: "Before GST", v: money(net) },
            { k: `GST at ${rate || 0}%`, v: money(gst) },
          ]}
          total={{ k: "Total including GST", v: money(gross) }}
        />
      </div>
      <p className="mt-4 text-[12.5px] text-[var(--muted)]">
        Singapore GST rose to 9% on 1 January 2024. Registration is required once taxable turnover exceeds
        S$1 million in a 12-month period.
      </p>
    </Shell>
  );
}

export function MarginCalculator() {
  const [cost, setCost] = React.useState("60");
  const [price, setPrice] = React.useState("100");
  const c = Number(cost) || 0;
  const p = Number(price) || 0;
  const profit = p - c;
  const margin = p > 0 ? (profit / p) * 100 : 0;
  const markup = c > 0 ? (profit / c) * 100 : 0;

  return (
    <Shell route="/margin-calculator">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-4 p-5">
          <Field label="Cost per unit" value={cost} onChange={setCost} suffix="SGD" />
          <Field label="Selling price" value={price} onChange={setPrice} suffix="SGD" />
        </div>
        <Result
          rows={[
            { k: "Gross profit", v: money(profit) },
            { k: "Margin", v: `${margin.toFixed(1)}%` },
            { k: "Markup", v: `${markup.toFixed(1)}%` },
          ]}
          total={{ k: "Selling price", v: money(p) }}
        />
      </div>
      <p className="mt-4 text-[12.5px] text-[var(--muted)]">
        Margin is profit divided by price. Markup is profit divided by cost. They are never the same number.
      </p>
    </Shell>
  );
}

export function EbayCalculator() {
  const [sale, setSale] = React.useState("120");
  const [ship, setShip] = React.useState("8");
  const [feePct, setFeePct] = React.useState("13.6");
  const [fixed, setFixed] = React.useState("0.50");
  const [cost, setCost] = React.useState("50");

  const s = Number(sale) || 0;
  const sh = Number(ship) || 0;
  const pct = Number(feePct) || 0;
  const fx = Number(fixed) || 0;
  const c = Number(cost) || 0;

  const fee = (s + sh) * (pct / 100) + fx;
  const payout = s + sh - fee - sh;
  const net = payout - c;

  return (
    <Shell route="/ebay-fee-calculator">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-3.5 p-5">
          <Field label="Sale price" value={sale} onChange={setSale} suffix="SGD" />
          <Field label="Shipping charged to buyer" value={ship} onChange={setShip} suffix="SGD" />
          <Field label="Final value fee" value={feePct} onChange={setFeePct} suffix="%" />
          <Field label="Fixed order fee" value={fixed} onChange={setFixed} suffix="SGD" />
          <Field label="Your item cost" value={cost} onChange={setCost} suffix="SGD" />
        </div>
        <Result
          rows={[
            { k: "Total fees", v: money(fee) },
            { k: "Payout", v: money(payout) },
            { k: "Item cost", v: money(c) },
          ]}
          total={{ k: "Net profit", v: money(net) }}
        />
      </div>
      <p className="mt-4 text-[12.5px] text-[var(--muted)]">
        Fees vary by category and store subscription. Check your eBay seller statement for the exact final value
        fee before pricing.
      </p>
    </Shell>
  );
}

export function ToolsIndex() {
  const tools = [
    { to: "/gst-calculator", label: "GST calculator", note: "Add or remove 9% GST" },
    { to: "/margin-calculator", label: "Margin calculator", note: "Margin and markup" },
    { to: "/ebay-fee-calculator", label: "eBay fee calculator", note: "Net after fees" },
  ];
  return (
    <div className="shell pb-16 pt-8">
      <p className="eyebrow">Tools</p>
      <h1 className="h2 mt-2">Free calculators</h1>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="tile">
            <p className="text-[15px] font-semibold">{t.label}</p>
            <p className="mt-1 text-[12.5px] text-[var(--muted)]">{t.note}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[13px] text-[var(--link)]">
              Open <ChevronRight size={13} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
