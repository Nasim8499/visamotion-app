import { useEffect, useState } from "react";

const read = () => (window.location.hash.replace(/^#/, "") || "/").split("?")[0];

export const navigate = (to: string) => {
  if (window.location.hash === `#${to}`) {
    window.scrollTo({ top: 0 });
    return;
  }
  window.location.hash = to;
};

export const useRoute = () => {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onHash = () => {
      setRoute(read());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
};

export function Link({
  to,
  className,
  children,
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
