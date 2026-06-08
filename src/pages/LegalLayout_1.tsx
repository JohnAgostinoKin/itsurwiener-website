import type { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

const PAGES = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/venue-terms", label: "Venue & Event Terms" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/accessibility", label: "Accessibility" },
];

export default function LegalLayout({ title, effectiveDate, children }: LegalLayoutProps) {
  return (
    <div className="iw-legal">
      <style>{styles}</style>

      <a className="iw-legal-back" href="/">← Back to itsurwiener</a>

      <header className="iw-legal-header">
        <p className="iw-legal-eyebrow">itsurwiener · The Basement</p>
        <h1>{title}</h1>
        <div className="iw-legal-accent" />
        <p className="iw-legal-date">Effective date: {effectiveDate}</p>
      </header>

      <article className="iw-legal-body">{children}</article>

      <footer className="iw-legal-footer">
        <nav className="iw-legal-nav">
          {PAGES.map((p) => (
            <a key={p.href} href={p.href}>{p.label}</a>
          ))}
        </nav>
        <p className="iw-legal-entity">
          © {new Date().getFullYear()} Agostino Industries LLC d/b/a itsurwiener ·
          101 Keith Street, Clemson, SC 29631
        </p>
      </footer>
    </div>
  );
}

const styles = `
.iw-legal {
  max-width: 760px;
  margin: 0 auto;
  padding: 40px 20px 88px;
  color: #1f1d1a;
  line-height: 1.72;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}
.iw-legal-back {
  display: inline-block;
  margin-bottom: 28px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #b34d00;
  text-decoration: none;
}
.iw-legal-back:hover { text-decoration: underline; }
.iw-legal-eyebrow {
  margin: 0 0 8px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8a7f72;
}
.iw-legal-header h1 {
  margin: 0;
  font-size: 2.1rem;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #15110d;
}
.iw-legal-accent {
  width: 64px;
  height: 4px;
  margin: 16px 0 14px;
  background: #F56600;
  border-radius: 2px;
}
.iw-legal-date {
  margin: 0 0 8px;
  font-size: 0.9rem;
  color: #8a7f72;
}
.iw-legal-body { margin-top: 28px; }
.iw-legal-body h2 {
  margin: 2.2em 0 0.6em;
  padding-left: 0.6em;
  border-left: 3px solid #F56600;
  font-size: 1.18rem;
  font-weight: 700;
  color: #15110d;
}
.iw-legal-body h2:first-child { margin-top: 0; }
.iw-legal-body p { margin: 0 0 1em; }
.iw-legal-body ul { margin: 0 0 1em; padding-left: 1.25em; }
.iw-legal-body li { margin: 0 0 0.5em; }
.iw-legal-body strong { color: #15110d; }
.iw-legal-body a { color: #b34d00; }
.iw-legal-body hr {
  border: none;
  border-top: 1px solid #e6ded3;
  margin: 2.2em 0;
}
.iw-legal-footer {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid #e6ded3;
}
.iw-legal-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 22px;
  margin-bottom: 16px;
}
.iw-legal-nav a {
  font-size: 0.9rem;
  font-weight: 600;
  color: #b34d00;
  text-decoration: none;
}
.iw-legal-nav a:hover { text-decoration: underline; }
.iw-legal-entity {
  margin: 0;
  font-size: 0.82rem;
  color: #8a7f72;
}

@media (prefers-color-scheme: dark) {
  .iw-legal { color: #e8e2d8; }
  .iw-legal-eyebrow, .iw-legal-date, .iw-legal-entity { color: #9b9183; }
  .iw-legal-header h1,
  .iw-legal-body h2,
  .iw-legal-body strong { color: #f4ebdd; }
  .iw-legal-back,
  .iw-legal-body a,
  .iw-legal-nav a { color: #ff8a33; }
  .iw-legal-body hr,
  .iw-legal-footer { border-color: #332b22; }
}
`;
