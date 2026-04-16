import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        className={cn(
          "font-heading text-heading-xl md:text-display-lg font-bold",
          align === "center" ? "heading-underline-center" : "heading-underline",
          light ? "text-white" : "text-cdf"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-lg max-w-2xl",
            align === "center" ? "mx-auto" : "",
            light ? "text-white/70" : "text-body"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
