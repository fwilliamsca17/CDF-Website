import { SITE_CONFIG, TEAM_MEMBERS, LOAN_PROGRAMS } from "@/lib/constants";

function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "LendingInstitution"],
    "@id": "https://capitaldf.com/#organization",
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
    sameAs: [SITE_CONFIG.social.linkedin],
    slogan: SITE_CONFIG.tagline,
    currenciesAccepted: "USD",
    paymentAccepted: "Wire Transfer, Check",
    priceRange: "$50,000 - $5,000,000",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://capitaldf.com/#localbusiness",
    name: SITE_CONFIG.name,
    image: `https://${SITE_CONFIG.domain}/images/cdf-logo-white.png`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    url: `https://${SITE_CONFIG.domain}`,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function TeamSchema() {
  const people = TEAM_MEMBERS.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function LoanProductsSchema() {
  const products = LOAN_PROGRAMS.map((program) => ({
    "@type": "FinancialProduct",
    name: program.title,
    description: program.description,
    provider: {
      "@type": "FinancialService",
      name: SITE_CONFIG.name,
    },
    category: "Private Lending",
    areaServed: "California",
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FAQSchema() {
  const faqs = [
    {
      question: "How fast can Capital Direct Funding close a loan?",
      answer:
        "We can close loans in as few as 7 business days from completed application. Our streamlined underwriting process and direct lending model eliminate committee approvals and bureaucratic delays.",
    },
    {
      question: "What types of loans does Capital Direct Funding offer?",
      answer:
        "We offer Fix & Flip loans, Bridge loans, Ground-Up Construction financing, Cash-Out Refinance, Probate & Estate loans, Foreclosure & Bankruptcy Recovery loans, Self-Employed Solutions, and ADU Construction loans across California.",
    },
    {
      question: "What is the minimum credit score required?",
      answer:
        "We are an asset-based lender, meaning we focus primarily on the property and deal structure rather than credit scores. We specialize in scenarios where borrowers may not meet conventional credit requirements, including post-bankruptcy and foreclosure situations.",
    },
    {
      question: "What areas does Capital Direct Funding serve?",
      answer:
        "We fund loans throughout the state of California, with particular expertise in Los Angeles County, Orange County, San Bernardino County, Riverside County, and San Diego County.",
    },
    {
      question: "How do trust deed investments work?",
      answer:
        "Accredited investors can invest in whole-note, first trust deed positions secured by California real estate. Each investment is individually selected and personally underwritten with conservative loan-to-value ratios. Investors earn monthly interest payments with yields between 8.95% and 10.95%.",
    },
    {
      question: "Can self-employed borrowers get a loan without tax returns?",
      answer:
        "Yes. We offer bank statement programs and simplified documentation for self-employed borrowers and business owners who don't fit conventional income documentation requirements. No tax returns required.",
    },
    {
      question: "Does Capital Direct Funding offer ADU construction loans?",
      answer:
        "Yes. We offer ADU construction loans with 75-85% loan-to-cost, rates from 9.5-11%, 12-18 month terms, and milestone-based draws. We specialize in detached ADUs, garage conversions, attached ADUs, and junior ADUs across Los Angeles and Orange County.",
    },
    {
      question: "What is the loan range?",
      answer:
        "Our loan amounts range from $50,000 to $5,000,000 depending on the program. ADU construction loans range from $60,000 to $300,000 per unit.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export {
  OrganizationSchema,
  LocalBusinessSchema,
  TeamSchema,
  LoanProductsSchema,
  FAQSchema,
  BreadcrumbSchema,
};
