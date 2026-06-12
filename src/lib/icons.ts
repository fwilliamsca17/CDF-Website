import type { ComponentType } from "react";
import {
  ArrowLeftRight,
  Award,
  Banknote,
  Briefcase,
  Building2,
  CheckCircle,
  ClipboardList,
  DollarSign,
  Eye,
  FileEdit,
  FileText,
  Hammer,
  Handshake,
  Landmark,
  Lock,
  Phone,
  PiggyBank,
  RefreshCw,
  Scale,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export type IconComponent = ComponentType<{ className?: string }>;

/**
 * Explicit registry of every icon referenced dynamically by string name
 * (e.g. `iconMap[program.icon]`). Named imports here keep lucide-react
 * tree-shakeable — a namespace import (`import * as LucideIcons`) would pull
 * the entire ~1,000-icon library into the bundle. Add new icons here when a
 * constant introduces a new `icon:` value.
 */
export const iconMap = {
  ArrowLeftRight,
  Award,
  Banknote,
  Briefcase,
  Building2,
  CheckCircle,
  ClipboardList,
  DollarSign,
  Eye,
  FileEdit,
  FileText,
  Hammer,
  Handshake,
  Landmark,
  Lock,
  Phone,
  PiggyBank,
  RefreshCw,
  Scale,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  TrendingUp,
  Users,
  Zap,
} as unknown as Record<string, IconComponent>;
