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

export type LeadRoute =
  | "cdf_priority_review"
  | "cdf_standard_review"
  | "resource_only";

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
      { value: "payoff", label: "Pay off a maturing or delinquent loan" },
      { value: "time", label: "Buy time to refinance or sell" },
      { value: "stabilize", label: "Fund repairs or stabilize the property" },
      { value: "advice", label: "Explore business-purpose financing" },
    ],
  },
];

/**
 * Routes a completed review entirely within the CDF operating model.
 * Investment and business-use properties can receive a standard or priority
 * financing review. Consumer-purpose scenarios receive neutral resources and
 * are not presented as candidates for CDF's business-purpose loan programs.
 */
export function routeLead(answers: QuizAnswers): LeadRoute {
  const isBusinessPurposeProperty =
    answers.property_use === "investment" || answers.property_use === "business";

  if (!isBusinessPurposeProperty) return "resource_only";

  const isTimeSensitive =
    answers.timeline === "nos" ||
    answers.timeline === "nod" ||
    answers.timeline === "behind" ||
    answers.goal === "payoff" ||
    answers.goal === "time";

  return isTimeSensitive ? "cdf_priority_review" : "cdf_standard_review";
}
