"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdOutlineShoppingBag } from "react-icons/md";

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/creators", label: "Creators" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname.startsWith("/");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // 16px Satoshi text: weight 500 when selected, 400 otherwise
  const linkClass = (href: string) =>
    `text-base transition-opacity ${
      isHome ? "hover:opacity-80" : "hover:text-primary"
    } ${isActive(href) ? "font-medium" : "font-normal"}`;

  return (
    <header
      className={
        isHome
          ? "absolute inset-x-0 top-0 z-50 text-white"
          : "bg-base-100 shadow-sm"
      }
    >
      <nav
        aria-label="Main navigation"
        className="navbar mx-auto max-w-7xl px-4"
      >
        {/* Left: mobile menu + logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="btn btn-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu dropdown-content bg-base-100 text-base-content rounded-box z-10 mt-3 w-52 gap-1 p-2 shadow"
            >
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={linkClass(l.href)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="sm:hidden">
                <Link href="/signin" className={linkClass("/signin")}>
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/" className="ml-2 shrink-0">
            <Image
              src="/logos/Header_Logo.png"
              alt="YourBrand"
              width={170}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Center: desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={linkClass(l.href)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: auth + cart */}
        <div className="navbar-end gap-6">
          <Link
            href="/signin"
            className={`hidden sm:inline ${linkClass("/signin")}`}
          >
            Sign In
          </Link>
          <Link href="/signup" className={linkClass("/signup")}>
            Join us
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className={
              isHome ? "hover:opacity-80" : "hover:text-primary"
            }
          >
            <MdOutlineShoppingBag size={24} />
          </Link>
        </div>
      </nav>
    </header>
  );
}