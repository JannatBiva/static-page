"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { id: string; label: string };

const LINKS: Item[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "features", label: "Features" },
  { id: "about-us", label: "About Us" },
  { id: "showcase", label: "Showcase" },
  { id: "blog", label: "Blog" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

const ABOUT_ITEMS: Item[] = [
  { id: "about-us", label: "About Us" },
  { id: "about-vision", label: "Vision" },
  { id: "about-mission", label: "Mission" },
  { id: "about-values", label: "Values" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutOpenMobile, setAboutOpenMobile] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const update = () => setActiveHash(window.location.hash || "#home");
    window.addEventListener("hashchange", update);
    update();
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const toHomeHash = (id: string) => ({ pathname: "/", hash: id });

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm pt-2 pb-2">
      <div className="h-[70px]">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-3">
          <Link href="/" className="text-[24px] md:text-[26px] font-bold tracking-tight text-brand-dark">
            Simpl<span className="text-brand-teal">é</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) =>
              link.label === "About Us" ? (
                <div key={link.id} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={aboutOpen}
                    onClick={() => setAboutOpen((v) => !v)}
                    className={`transition-colors ${
                      activeHash === `#${link.id}` ? "text-brand-blue" : "text-gray-800 hover:text-brand-blue"
                    }`}
                  >
                    About ▾
                  </button>

                  {aboutOpen && (
                    <div className="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-lg border border-gray-200 z-20 p-1">
                      {ABOUT_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          href={toHomeHash(item.id)}
                          className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setAboutOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.id}
                  href={toHomeHash(link.id)}
                  className={`transition-colors ${
                    activeHash === `#${link.id}` ? "text-brand-blue" : "text-gray-800 hover:text-brand-blue"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <button
            className="md:hidden inline-flex items-center gap-2 text-sm"
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
                  <li key={link.id} className="relative">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={aboutOpenMobile}
                      onClick={() => setAboutOpenMobile((v) => !v)}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                    >
                      About ▾
                    </button>

                    {aboutOpenMobile && (
                      <div className="mt-2 rounded-md bg-white shadow-lg border border-gray-200 z-20 p-1">
                        {ABOUT_ITEMS.map((item) => (
                          <Link
                            key={item.id}
                            href={toHomeHash(item.id)}
                            className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setAboutOpenMobile(false);
                              setOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.id}>
                    <Link
                      href={toHomeHash(link.id)}
                      className="block px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
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
