interface LegalFooterLinksProps {
  className?: string;
}

const LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/venue-terms", label: "Venue & Event Terms" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/accessibility", label: "Accessibility" },
];

/**
 * Drop into your site footer:  <LegalFooterLinks />
 * Styling is self-contained and inherits your site's fonts.
 * Swap the <a> tags for your router's <Link> if you want client-side navigation.
 */
export default function LegalFooterLinks({ className }: LegalFooterLinksProps) {
  return (
    <nav className={`iw-footer-legal${className ? ` ${className}` : ""}`} aria-label="Legal">
      <style>{styles}</style>
      {LINKS.map((l) => (
        <a key={l.href} href={l.href}>{l.label}</a>
      ))}
      <span className="iw-footer-legal-copy">
        © {new Date().getFullYear()} Agostino Industries LLC d/b/a itsurwiener
      </span>
    </nav>
  );
}

const styles = `
.iw-footer-legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  font-size: 0.82rem;
  line-height: 1.6;
}
.iw-footer-legal a {
  color: inherit;
  opacity: 0.8;
  text-decoration: none;
}
.iw-footer-legal a:hover {
  opacity: 1;
  color: #F56600;
  text-decoration: underline;
}
.iw-footer-legal-copy {
  opacity: 0.6;
  flex-basis: 100%;
}
`;
