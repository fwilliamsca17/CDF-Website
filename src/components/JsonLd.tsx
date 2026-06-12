import {
  SITE_CONFIG,
  TEAM_MEMBERS,
  LOAN_PROGRAMS,
  PROCESS_STEPS,
  FAQ_ITEMS,
} from "@/lib/constants";

const BASE = "https://capitaldf.com";
const ORG_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;

function JsonLdScript({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "LendingInstitution"],
    "@id": ORG_ID,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    alternateName: ["CDF", "Capital Direct Funding"],
    url: `https://${SITE_CONFIG.domain}`,
    logo: `https://${SITE_CONFIG.domain}/images/cdf-logo-white.png`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0689,
      longitude: -117.9389,
    },
    areaServed: {
      "@type": "State",
      name: "California",
      sameAs: "https://en.wikipedia.org/wiki/California",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: "sales",
      areaServed: "US-CA",
      availableLanguage: "English",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: "Frank Williams",
      jobTitle: "Founder & Investor Relations",
    },
    numberOfEmployees: { "@type": "QuantitativeValue", value: 12 },
    foundingDate: "2009",
    knowsAbout: [
      "Private lending",
      "Hard money loans",
      "Bridge loans",
      "Fix and flip financing",
      "Construction loans",
      "Trust deed investments",
      "Probate loans",
      "Real estate financing",
      "ADU construction loans",
      "California real estate lending",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "California Department of Real Estate Broker License",
        recognizedBy: {
          "@type": "Organization",
          name: "California Department of Real Estate",
        },
        identifier: `DRE# ${SITE_CONFIG.dreLicense}`,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "NMLS Registration",
        identifier: `NMLS# ${SITE_CONFIG.nmls}`,
      },
    ],
    sameAs: [
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.yelp,
    ],
    slogan: SITE_CONFIG.tagline,
    currenciesAccepted: "USD",
    paymentAccepted: "Wire Transfer, Check",
    priceRange: "$50,000 - $5,000,000",
    potentialAction: [
      {
        "@type": "ApplyAction",
        name: "Apply for a private money loan",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/borrowers`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
      {
        "@type": "CommunicateAction",
        name: "Contact Capital Direct Funding",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/contact`,
        },
      },
    ],
  };

  return <JsonLdScript schema={schema} />;
}

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/#localbusiness`,
    name: SITE_CONFIG.name,
    image: `https://${SITE_CONFIG.domain}/images/cdf-logo-white.png`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    url: `https://${SITE_CONFIG.domain}`,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0689,
      longitude: -117.9389,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$50,000 - $5,000,000",
  };

  return <JsonLdScript schema={schema} />;
}

function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };

  return <JsonLdScript schema={schema} />;
}

function TeamSchema() {
  const people = TEAM_MEMBERS.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    worksFor: { "@id": ORG_ID },
    ...(member.email ? { email: member.email } : {}),
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Capital Direct Funding Team",
    itemListElement: people.map((person, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: person,
    })),
  };

  return <JsonLdScript schema={schema} />;
}

function LoanProductsSchema() {
  const products = LOAN_PROGRAMS.map((program) => ({
    "@type": ["FinancialProduct", "LoanOrCredit"],
    name: program.title,
    description: program.description,
    url: `${BASE}/borrowers#${program.slug}`,
    loanType: program.title,
    currency: "USD",
    category: "Private money loan",
    areaServed: { "@type": "State", name: "California" },
    provider: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: `LTV: ${program.parameters.ltv} | Rates: ${program.parameters.rates} | Terms: ${program.parameters.terms} | Range: ${program.parameters.loanRange}`,
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Capital Direct Funding Loan Programs",
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: product,
    })),
  };

  return <JsonLdScript schema={schema} />;
}

function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to get a private money loan from Capital Direct Funding",
    description:
      "Capital Direct Funding's four-step private lending process, from application to funding in as few as 7 days.",
    totalTime: "P7D",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
      url: `${BASE}/loan-process#step-${s.step}`,
    })),
  };

  return <JsonLdScript schema={schema} />;
}

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}/faq#faqpage`,
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return <JsonLdScript schema={schema} />;
}

function InvestorHowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to invest in trust deeds with Capital Direct Funding",
    description:
      "The six-step process for accredited investors to invest directly in whole-note, first trust deed positions secured by California real estate.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Introduction Call",
        text: "Speak directly with Francisco or Frank about your investment goals, risk tolerance, and preferred deal types.",
        url: `${BASE}/investors#how-it-works`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Review Deal Details",
        text: "When a loan matches your criteria, we present the full package: property address, photos, independent appraisal, borrower profile, loan-to-value ratio, interest rate, term, and exit strategy.",
        url: `${BASE}/investors#how-it-works`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Select and Fund Through Escrow",
        text: "You choose which deals to invest in. Capital is disbursed through a licensed escrow company with title insurance on every transaction.",
        url: `${BASE}/investors#how-it-works`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Deed Recorded in Your Name",
        text: "A first trust deed is recorded at the county recorder's office in your name (or your entity, trust, or custodian), securing the senior lien position on the property.",
        url: `${BASE}/investors#how-it-works`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Earn Monthly Interest",
        text: "Receive monthly interest payments for the life of the loan. CDF handles all servicing — payment collection, escrow management, and reporting.",
        url: `${BASE}/investors#how-it-works`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Principal Returned at Payoff",
        text: "When the borrower refinances or sells the property, your full principal is returned through escrow. Reinvest in the next opportunity.",
        url: `${BASE}/investors#how-it-works`,
      },
    ],
  };

  return <JsonLdScript schema={schema} />;
}

function InvestmentProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InvestmentOrDeposit",
    name: "Whole-Note First Trust Deed Investment",
    description:
      "Direct investment in whole-note, first trust deed positions secured by California real estate. Accredited investors select individual loans and earn monthly interest at 8.95%–10.95% yields.",
    url: `${BASE}/investors`,
    provider: { "@id": ORG_ID },
    category: "Trust Deed Investment",
    amount: {
      "@type": "MonetaryAmount",
      currency: "USD",
      minValue: 100000,
      maxValue: 5000000,
    },
    annualPercentageRate: {
      "@type": "QuantitativeValue",
      minValue: 8.95,
      maxValue: 10.95,
      unitCode: "P1",
    },
    areaServed: {
      "@type": "State",
      name: "California",
      sameAs: "https://en.wikipedia.org/wiki/California",
    },
    feesAndCommissionsSpecification: "No management fees, no performance fees, no lock-up periods.",
  };

  return <JsonLdScript schema={schema} />;
}

function VideoObjectSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Capital Direct Funding — Private Lending for California Real Estate",
    description:
      "Overview of Capital Direct Funding's private lending services for California real estate borrowers and trust deed investors.",
    thumbnailUrl: `${BASE}/images/og-image.jpg`,
    uploadDate: "2024-01-01",
    contentUrl: "https://www.youtube.com/watch?v=4xHQQiQBnJk",
    embedUrl: "https://www.youtube.com/embed/4xHQQiQBnJk",
    publisher: { "@id": ORG_ID },
  };

  return <JsonLdScript schema={schema} />;
}

function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdScript schema={schema} />;
}

/**
 * Per-page entity: emits a WebPage (linked to the WebSite + Organization) and
 * a matching BreadcrumbList in one @graph. Drop into any page's layout.
 */
function PageSeo({
  title,
  description,
  path,
  crumbs,
  speakable,
}: {
  title: string;
  description: string;
  path: string;
  crumbs: { name: string; path: string }[];
  speakable?: string[];
}) {
  const url = `${BASE}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        inLanguage: "en-US",
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(speakable
          ? {
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: speakable,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${BASE}${c.path}`,
        })),
      },
    ],
  };

  return <JsonLdScript schema={schema} />;
}

export {
  OrganizationSchema,
  LocalBusinessSchema,
  WebSiteSchema,
  TeamSchema,
  LoanProductsSchema,
  HowToSchema,
  FAQSchema,
  InvestorHowToSchema,
  InvestmentProductSchema,
  VideoObjectSchema,
  BreadcrumbSchema,
  PageSeo,
};
