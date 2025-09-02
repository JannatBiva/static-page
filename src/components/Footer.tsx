export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200 bg-white">
      <div className="container py-10 text-sm text-brand-gray flex flex-col md:flex-row items-center justify-between gap-6">
        <p>© {new Date().getFullYear()} Simplié. All rights reserved.</p>
        <nav aria-label="Footer navigation" className="flex gap-6">
          <a
            href="#privacy"
            className="hover:text-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm"
          >
            Privacy
          </a>
          <a
            href="#terms"
            className="hover:text-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm"
          >
            Terms
          </a>
          <a
            href="#contact"
            className="hover:text-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
