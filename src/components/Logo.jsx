import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Logo({ logoSrc = "/logo.svg", brand = "Handicapp", textColor = "#0f172a" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/"
      className="relative flex items-center w-fit h-16 overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: "none" }}
    >
      <img src={logoSrc} alt="Logo Handicapp" style={{ height: 56, width: 56 }} />
      <AnimatePresence>
        {/* Solo mostrar texto en desktop (md y superior) */}
        {hovered && (
          <motion.span
            initial={{ maxWidth: 0, opacity: 0, x: -20 }}
            animate={{ maxWidth: 120, opacity: 1, x: 0 }}
            exit={{ maxWidth: 0, opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden md:inline-block"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              marginLeft: 10,
              color: textColor,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: 1.5,
              background: "none",
              borderRadius: 0,
              padding: 0,
              boxShadow: "none",
            }}
          >
            {brand}
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
}
