"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MobileNav from "./MobileNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Which dropdown is open, keyed by nav item label (two dropdowns coexist).
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function openDropdown(label: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenMenu(label);
  }

  function closeDropdown() {
    dropdownTimeout.current = setTimeout(() => setOpenMenu(null), 150);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-900/90 backdrop-blur-md shadow-lg py-3 border-b border-white/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-container section-padding">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/cdf-logo-white.png"
              alt="Capital Direct Funding"
              width={180}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openDropdown(item.label)}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={item.href}
                    className="nav-link inline-flex items-center gap-1"
                    onFocus={() => openDropdown(item.label)}
                    onBlur={closeDropdown}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      openMenu === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div
                      className={`bg-ink-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl p-2 ${
                        item.children.length > 5 ? "w-[36rem]" : "w-72"
                      }`}
                    >
                      <div
                        className={
                          item.children.length > 5
                            ? "grid grid-cols-2 gap-x-1"
                            : ""
                        }
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-4 py-3 hover:bg-white/5 transition-colors group"
                            onFocus={() => openDropdown(item.label)}
                            onBlur={closeDropdown}
                          >
                            <span className="block text-sm font-medium text-white group-hover:text-champagne-300 transition-colors">
                              {child.label}
                            </span>
                            <span className="block text-xs text-white/40 mt-0.5">
                              {child.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-white/5 mt-1 pt-1">
                        <Link
                          href={item.href}
                          className="block rounded-lg px-4 py-2.5 hover:bg-white/5 transition-colors text-xs text-champagne-400 font-medium"
                          onFocus={() => openDropdown(item.label)}
                          onBlur={closeDropdown}
                        >
                          {item.viewAllLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              )
            )}
            <Button href="/contact" variant="gold" size="sm">
              Get Funded
            </Button>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
