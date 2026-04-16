import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "gold" | "outline" | "cdf" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<ButtonVariant, string> = {
  gold: "btn-gold",
  outline: "btn-outline",
  cdf: "btn-cdf",
  ghost: "text-cdf font-semibold hover:text-cdf-600 transition-colors",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "gold",
  size = "md",
  showArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    variantClasses[variant],
    sizeClasses[size],
    "inline-flex items-center gap-2",
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
        {showArrow && <ArrowRight className="w-4 h-4" />}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && "opacity-50 cursor-not-allowed")}
    >
      {children}
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}
