import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const footerLinks = [
  {
    title: "For Job Seekers",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Companies", href: "/companies" },
      { label: "Saved Jobs", href: "/saved-jobs" },
      { label: "Career Resources", href: "/resources" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { label: "Post a Job", href: "/post-job" },
      { label: "Recruiter Dashboard", href: "/recruiter" },
      { label: "Pricing", href: "/pricing" },
      { label: "Hiring Resources", href: "/resources/hiring" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "X",
    href: "#",
    icon: FaXTwitter,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
];

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-block">
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={130}
                height={40}
                className="h-auto w-32 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-zinc-500">
              Connecting talented people with the right opportunities. Discover
              jobs, explore companies, and take the next step in your career.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-sm font-semibold text-accent">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
                    >
                      <span className="mr-0 h-px w-0 bg-accent transition-all duration-300 group-hover:mr-2 group-hover:w-3" />

                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-14 flex flex-col gap-6 border-t border-zinc-900 pt-7 md:flex-row md:items-center md:justify-between">
          {/* Social Media */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col gap-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:gap-6">
            <p>© {new Date().getFullYear()} HireLoop. All rights reserved.</p>

            <div className="flex items-center gap-5">
              <Link
                href="/terms"
                className="transition-colors duration-200 hover:text-accent"
              >
                Terms
              </Link>

              <Link
                href="/privacy"
                className="transition-colors duration-200 hover:text-accent"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
