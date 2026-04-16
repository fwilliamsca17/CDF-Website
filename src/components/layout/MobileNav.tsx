"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-cdf border-t border-white/10"
        >
          <nav className="section-padding py-6 flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 text-white/80 hover:text-gold transition-colors text-lg font-medium"
                >
                  {item.label}
                </Link>
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
