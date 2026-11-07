import raw from "./content.json";

export type Block = { t: string; x: string };
export type Page = { title: string; blocks: Block[] };

export const pages = raw as Record<string, Page>;

export const cleanTitle = (s: string) => s.replace(/\s+/g, " ").trim();

export const summaryOf = (p: Page, n = 2) =>
  p.blocks.filter((b) => b.t === "p").slice(1, 1 + n).map((b) => b.x).join(" ");

export const routeList = Object.keys(pages).sort();

export type NavGroup = { label: string; items: { to: string; title: string }[] };

const pick = (routes: string[]) =>
  routes
    .filter((r) => pages[r])
    .map((r) => ({ to: r, title: cleanTitle(pages[r].title) }));

export const navGroups: NavGroup[] = [
  {
    label: "Services",
    items: pick([
      "/incorporation",
      "/incorporation/for-foreigners",
      "/accounting-services-singapore",
      "/bookkeeping",
      "/company-secretary-singapore",
      "/nominee-director",
      "/reporting",
      "/invoicing-software",
      "/bank-integration",
      "/accounting-for-tech-companies",
      "/ecommerce-accounting-services",
      "/sole-proprietorship-conversion-to-pte-ltd",
    ]),
  },
  {
    label: "Tools",
    items: pick([
      "/gst-calculator",
      "/margin-calculator",
      "/ebay-fee-calculator",
      "/business-name-generator",
      "/company-name-search-singapore",
      "/ssic-code-search-tool",
      "/career-test",
    ]),
  },
  {
    label: "Company",
    items: pick([
      "/about-us",
      "/leadership",
      "/our-investors",
      "/our-partners",
      "/customer-stories",
      "/press-releases",
      "/careers",
      "/product-releases",
      "/become-a-partner",
      "/demo",
    ]),
  },
  {
    label: "Resources",
    items: pick([
      "/faq",
      "/blog",
      "/guides",
      "/events/webinars",
      "/events/podcasts",
      "/contact-us",
    ]),
  },
  {
    label: "Legal",
    items: pick([
      "/privacy",
      "/terms",
      "/terms-of-business",
      "/security-policy",
      "/ai-governance-data-policy",
      "/referrals-terms",
    ]),
  },
];

export const serviceTiles = [
  { to: "/incorporation", label: "Incorporation", note: "Register a Singapore company in 1-3 days" },
  { to: "/accounting-services-singapore", label: "Accounting", note: "Experts plus software, one monthly fee" },
  { to: "/company-secretary-singapore", label: "Company secretary", note: "Statutory filings handled end to end" },
  { to: "/bookkeeping", label: "Bookkeeping", note: "Records, reconciliation and IRAS filing" },
  { to: "/nominee-director", label: "Nominee director", note: "A resident director for foreign founders" },
  { to: "/reporting", label: "Reporting", note: "Numbers you can actually act on" },
];

export const toolTiles = [
  { to: "/gst-calculator", label: "GST calculator", note: "Add or remove 9% GST" },
  { to: "/margin-calculator", label: "Margin calculator", note: "Margin and markup from cost" },
  { to: "/ebay-fee-calculator", label: "eBay fee calculator", note: "What a sale really earns" },
  { to: "/business-name-generator", label: "Business name generator", note: "Names that pass ACRA checks" },
  { to: "/ssic-code-search-tool", label: "SSIC code search", note: "Find your activity code" },
  { to: "/career-test", label: "Founder test", note: "What kind of founder are you" },
];
