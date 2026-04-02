
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {year} Centralizer. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-brand-500 transition-colors">Home</Link>
            <Link href="/#services" className="text-sm text-gray-500 hover:text-brand-500 transition-colors">Services</Link>
            <Link href="/#contact" className="text-sm text-gray-500 hover:text-brand-500 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
