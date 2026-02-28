import { useState, useEffect } from "react";
import { siteContent } from "../data/content";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#hero"
          className={`font-semibold text-base tracking-tight transition-colors ${
            scrolled ? "text-gray-900" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {siteContent.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  scrolled
                    ? "text-gray-600 hover:text-slate-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden focus:outline-none transition-colors ${
            scrolled ? "text-gray-600" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5">
          <ul className="flex flex-col gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-slate-900 font-medium text-sm tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
