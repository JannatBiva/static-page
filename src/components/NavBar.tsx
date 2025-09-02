"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#features", label: "Features" },
  { href: "#about-us", label: "About Us" }, 
  { href: "#showcase", label: "Showcase" },
  { href: "#blog", label: "Blog" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

const ABOUT_ITEMS = [
  { href: "#about-us", label: "About Us" },
  { href: "#about-vision", label: "Vision" },
  { href: "#about-mission", label: "Mission" },
  { href: "#about-values", label: "Values" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);           
  const [aboutOpen, setAboutOpen] = useState(false); 
  const [aboutOpenMobile, setAboutOpenMobile] = useState(false); 
  const [activeHash, setActiveHash] = useState("#home");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setActiveHash(window.location.hash || "#home");
    window.addEventListener("hashchange", update);
    update();
    return () => window.removeEventListener("hashchange", update);
  }, []);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    if (!open) setAboutOpenMobile(false);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm pt-2 pb-2">
      <div className="h-[70px]">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-3">

          <Link
            href="/"
            className="text-[24px] md:text-[26px] font-bold tracking-tight text-brand-dark select-none"
          >
            Simpl<span className="text-brand-teal">é</span>
          </Link>

        
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) =>
              link.label === "About Us" ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={aboutOpen}
                    aria-controls="about-menu-desktop"
                    onClick={() => setAboutOpen((v) => !v)}
                    className={`transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm ${
                      activeHash === link.href
                        ? "text-brand-blue"
                        : "text-gray-800 hover:text-brand-blue"
                    }`}
                  >
                    About ▾
                  </button>

                  {aboutOpen && (
                    <div
                      id="about-menu-desktop"
                      role="menu"
                      className="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-lg border border-gray-200 z-20 p-1"
                    >
                      {ABOUT_ITEMS.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                          onClick={() => setAboutOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm ${
                    activeHash === link.href
                      ? "text-brand-blue"
                      : "text-gray-800 hover:text-brand-blue"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <button
            className="md:hidden inline-flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

   
      {open && (
        <div className="md:hidden border-t border-zinc-200 bg-white">
          <nav className="mx-auto max-w-[1100px] px-4 py-3" aria-label="Mobile navigation">
            <ul className="grid gap-2 text-[14px] font-medium">
              {LINKS.map((link) =>
                link.label === "About Us" ? (
                  <li key={link.href} className="relative">
                 
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={aboutOpenMobile}
                      aria-controls="about-menu-mobile"
                      onClick={() => setAboutOpenMobile((v) => !v)}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      About ▾
                    </button>

                    {aboutOpenMobile && (
                      <div
                        id="about-menu-mobile"
                        role="menu"
                        className="absolute left-3 right-3 mt-2 rounded-md bg-white shadow-lg border border-gray-200 z-20 p-1"
                      >
                        {ABOUT_ITEMS.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                            onClick={() => {
                              setAboutOpenMobile(false);
                              setOpen(false);
                            }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block px-3 py-2 rounded hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
