"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Which accordion is expanded, keyed by nav item label.
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-ink-900/95 backdrop-blur-md border-t border-white/10 max-h-[80vh] overflow-y-auto"
        >
          <nav className="section-padding py-6 flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setExpanded(
                          expanded === item.label ? null : item.label
                        )
                      }
                      className="w-full flex items-center justify-between py-3 text-white/80 hover:text-champagne-300 transition-colors text-lg font-medium"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 border-l border-champagne-500/20 ml-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className="block py-2.5"
                              >
                                <span className="block text-white/70 hover:text-champagne-300 transition-colors text-base font-medium">
                                  {child.label}
                                </span>
                                <span className="block text-white/30 text-sm mt-0.5">
                                  {child.description}
                                </span>
                              </Link>
                            ))}
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="block py-2.5 text-champagne-400 text-sm font-medium"
                            >
                              View All →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 text-white/80 hover:text-champagne-300 transition-colors text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10">
              <Button href="/contact" variant="gold" size="md" className="w-full justify-center">
                Get Funded
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
