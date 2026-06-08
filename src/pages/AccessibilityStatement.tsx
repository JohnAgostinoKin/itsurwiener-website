import LegalLayout from "./LegalLayout";

export default function AccessibilityStatement() {
  return (
    <LegalLayout title="Accessibility Statement" effectiveDate="[EFFECTIVE DATE]">
      <p>
        <strong>Agostino Industries LLC</strong> d/b/a <strong>itsurwiener</strong> is
        committed to making <strong>itsurwiener.com</strong> and our venue accessible to as
        many people as possible, including people with disabilities.
      </p>

      <h2>1. Our Commitment</h2>
      <p>
        We aim to provide a website that is usable by everyone, and we work to align with the
        Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, as a practical target. We
        treat accessibility as an ongoing effort and continue to improve the Site over time.
      </p>

      <h2>2. Measures We Take</h2>
      <ul>
        <li>Using semantic structure and descriptive text where possible.</li>
        <li>Aiming for readable color contrast and resizable text.</li>
        <li>Supporting keyboard navigation for core site functions.</li>
        <li>Providing alternative text for meaningful images.</li>
      </ul>

      <h2>3. Known Limitations</h2>
      <p>
        Parts of the Site rely on third-party services — such as our ticketing and reservation
        provider (LineLeap), e-commerce checkout (Snipcart), embedded maps, and social media
        content — whose accessibility we do not fully control. If you encounter a barrier in
        one of these areas, please contact us and we will help you complete your request
        through another method.
      </p>

      <h2>4. Need Help or Found a Barrier?</h2>
      <p>
        If you have trouble accessing any part of the Site, want information in another format,
        or need to complete an order or reservation a different way, we want to help. Contact
        us and we will work to provide the information, product, or service you need through a
        reasonable alternative method.
      </p>

      <h2>5. Contact Us About Accessibility</h2>
      <p>
        <strong>Agostino Industries LLC d/b/a itsurwiener</strong><br />
        101 Keith Street, Clemson, SC 29631<br />
        Email: [accessibility@itsurwiener.com]<br />
        Phone: [PHONE]
      </p>
      <p>
        We welcome your feedback and will make every reasonable effort to respond promptly.
      </p>
    </LegalLayout>
  );
}
