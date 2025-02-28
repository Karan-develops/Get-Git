"use client";

import type * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Star, Gitlab, Swords, Flame } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ModeToggle } from "./ToggleTheme";
import { usePathname } from "next/navigation";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: <Swords className="h-5 w-5" />,
    label: "Battle",
    href: "/battle",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: <Flame className="h-5 w-5" />,
    label: "Roast",
    href: "/roast",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: <Star className="h-5 w-5" />,
    label: "Profile",
    href: "/profile",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
];

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      className="w-full p-4 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border-b-2 border-border/40 shadow-lg relative overflow-hidden top-0 z-50"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-radial from-transparent ${
          isDarkTheme
            ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
            : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
        } to-transparent rounded-3xl z-0 pointer-events-none`}
        variants={navGlowVariants}
      />
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <Link href="/" className="text-2xl font-bold text-foreground">
          <span className="flex gap-2 ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
            Get Git <Gitlab className="text-orange-500 mt-1" />
          </span>
        </Link>
        <ul className="flex items-center gap-2">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                    borderRadius: "16px",
                  }}
                />
                <motion.div
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom",
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                  >
                    <span
                      className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
                <motion.div
                  className="absolute inset-0 z-10"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    rotateX: 90,
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl h-full w-full"
                  >
                    <span
                      className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.li>
          ))}
          <ModeToggle />
        </ul>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/60 hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {mounted && <ModeToggle />}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
