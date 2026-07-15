export type QuizField =
  | "property_type"
  | "property_use"
  | "timeline"
  | "equity"
  | "goal";

export interface QuizOption {
  value: string;
  label: string;
}

export interface QuizQuestion {
  field: QuizField;
  question: string;
  options: QuizOption[];
}

export type QuizAnswers = Partial<Record<QuizField, string>>;

export type LeadRoute = "cdf" | "wca" | "both";

// Question order defines step order; the contact form follows as the final step.
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    field: "property_type",
    question: "What type of property is this?",
    options: [
      { value: "single_family", label: "Single-family home" },
      { value: "units_2_4", label: "2-4 unit property" },
      { value: "multifamily_5plus", label: "Multifamily (5+ units)" },
      { value: "commercial", label: "Commercial property" },
      { value: "land_other", label: "Land or other" },
    ],
  },
  {
    field: "property_use",
    question: "How is the property used?",
    options: [
      { value: "investment", label: "It's an investment or rental property" },
      { value: "primary", label: "It's my primary residence" },
      { value: "second_home", label: "It's a second home or vacation property" },
      { value: "business", label: "It houses my business" },
    ],
  },
  {
    field: "timeline",
    question: "Where are you in the process?",
    options: [
      { value: "nod", label: "I've received a Notice of Default" },
      { value: "nos", label: "I've received a Notice of Trustee's Sale" },
      { value: "behind", label: "I'm behind on payments — no formal notice yet" },
      { value: "ahead", label: "I'm current and planning ahead" },
      { value: "exploring", label: "Just exploring my options" },
    ],
  },
  {
    field: "equity",
    question:
      "Roughly how much do you owe compared to what the property is worth?",
    options: [
      { value: "strong", label: "I owe less than half of what it's worth" },
      { value: "moderate", label: "I owe about 50-70% of its value" },
      { value: "thin", label: "I owe 70-90% of its value" },
      { value: "unsure", label: "I owe more than it's worth, or I'm not sure" },
    ],
  },
  {
    field: "goal",
    question: "What outcome matters most to you?",
    options: [
      { value: "keep", label: "Keep the property" },
      { value: "sell", label: "Sell and protect my equity" },
      { value: "time", label: "Buy time to decide" },
      { value: "advice", label: "I'm not sure — I want expert advice" },
    ],
  },
];

/**
 * Routes a completed review to a lending path ("cdf"), a sale-advisory path
 * ("wca"), or an open advisor conversation ("both"). The route values are a
 * stable internal taxonomy for lead triage and analytics — all visitor-facing
 * copy is CDF-branded regardless of route (WCA involvement is an internal
 * handoff decision, not a public one).
 *
 * Primary residences never route straight to lending copy: CDF makes
 * business-purpose loans, so an owner-occupant's options must be sorted out
 * by an advisor, not a landing page.
 */
export function routeLead(answers: QuizAnswers): LeadRoute {
  if (answers.goal === "sell") return "wca";
  if (answers.goal === "keep") {
    if (answers.property_use === "primary") return "both";
    return answers.equity === "unsure" ? "both" : "cdf";
  }
  return "both";
}
