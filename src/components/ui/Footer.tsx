import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/ui/NewsletterForm";

type FooterLink = {
  label: string;
  href: string;
};

const columns: FooterLink[][] = [
  [
    { label: "Featured Courses", href: "/courses" },
    { label: "Featured Categories", href: "/courses" },
    { label: "Business", href: "/courses?category=Business" },
    { label: "IT", href: "/courses?category=IT%20%26%20Software" },
    { label: "Design", href: "/courses?category=Design" },
  ],
  [
    { label: "Development", href: "/courses?category=Development" },
    { label: "Marketing", href: "/courses?category=Marketing" },
    { label: "Photography", href: "/courses?category=Photography" },
    { label: "Finance", href: "/courses?category=Finance" },
    { label: "Sport", href: "/courses?category=Sport" },
  ],
  [
    { label: "Become a Creator", href: "/creators" },
    { label: "Affiliate Program", href: "/affiliate" },
    { label: "Contact", href: "/contact" },
    { label: "Help", href: "/help" },
    { label: "About", href: "/about" },
  ],
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookies Settings", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-base-100">
      <div className="mx-auto max-w-7xl px-4 pt-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: brand + newsletter */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logos/footer_logo.png"
                alt="ByteSpace"
                width={170}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm">
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>

            <div className="mt-10">
              <NewsletterForm />
            </div>

            <p className="mt-6 max-w-md text-xs leading-relaxed">
              By subscribing, you agree to our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>{" "}
              and consent to receive updates from our company.
            </p>
          </div>

          {/* Right: link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3"
          >
            {columns.map((column, i) => (
              <ul key={i} className="space-y-5">
                {column.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col gap-4 border-t border-base-300 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ByteSpace. All rights reserved.</p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}