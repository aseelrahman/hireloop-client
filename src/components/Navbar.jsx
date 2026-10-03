"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { HiOutlineMenuAlt3, HiOutlineX, HiOutlineLogout } from "react-icons/hi";

import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

const Navbar = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const firstName = session?.user?.name?.split(" ")[0];
  const firstInitial = firstName?.charAt(0).toUpperCase();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignout = async () => {
    setIsSigningOut(true);

    try {
      await authClient.signOut();

      setIsOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 dark:bg-black">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/5 bg-zinc-900/90 px-5 py-3 shadow-lg backdrop-blur-md md:px-7">
        {/* Main Navbar Row */}
        <div className="flex h-10 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center"
            onClick={closeMenu}
          >
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={130}
              height={40}
              priority
              className="h-auto w-32 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden h-10 items-center gap-8 md:flex">
            {/* Navigation Links */}
            <div className="flex h-full items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex h-full items-center text-sm text-zinc-300 transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-zinc-700" />

            {/* Authentication */}
            {!isPending &&
              (session?.user ? (
                /* Logged In */
                <div className="flex h-10 items-center gap-3">
                  {/* User Profile */}
                  <div className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-1 pr-4 transition-all duration-300 hover:border-accent/30 hover:bg-white/10">
                    {/* Initial */}
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                      {firstInitial}
                    </div>

                    {/* First Name */}
                    <span className="max-w-28 truncate text-sm font-semibold text-white">
                      {firstName}
                    </span>
                  </div>

                  {/* Sign Out */}
                  <Button
                    variant="danger"
                    className="h-10"
                    isPending={isSigningOut}
                    onPress={handleSignout}
                  >
                    <HiOutlineLogout className="text-lg" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                /* Logged Out */
                <div className="flex h-10 items-center gap-4">
                  {/* Sign In */}
                  <Link
                    href="/signin"
                    className="flex h-10 items-center text-sm font-medium text-accent transition-opacity duration-300 hover:opacity-75"
                  >
                    Sign In
                  </Link>

                  {/* Get Started */}
                  <Link
                    href="/signup"
                    className="flex h-10 items-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90"
                  >
                    Get Started
                  </Link>
                </div>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            isIconOnly
            variant="ghost"
            className="h-10 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onPress={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <HiOutlineX className="size-6" />
            ) : (
              <HiOutlineMenuAlt3 className="size-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`grid transition-all duration-300 md:hidden ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-4 flex flex-col gap-1 border-t border-zinc-800 pt-4">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-3 text-sm text-zinc-300 transition-all duration-200 hover:bg-accent/10 hover:pl-5 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-zinc-800" />

              {/* Mobile Authentication */}
              {!isPending &&
                (session?.user ? (
                  /* Logged In */
                  <div className="flex flex-col gap-3">
                    {/* User Profile */}
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                      {/* Initial */}
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-base font-semibold text-white">
                        {firstInitial}
                      </div>

                      {/* User Info */}
                      <div className="min-w-0">
                        <p className="text-xs text-zinc-500">Signed in as</p>

                        <p className="truncate text-sm font-semibold text-white">
                          {firstName}
                        </p>
                      </div>
                    </div>

                    {/* Sign Out */}
                    <Button
                      variant="danger"
                      className="w-full"
                      isPending={isSigningOut}
                      onPress={handleSignout}
                    >
                      <HiOutlineLogout className="text-lg" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  /* Logged Out */
                  <div className="flex flex-col gap-2">
                    {/* Sign In */}
                    <Link
                      href="/signin"
                      onClick={closeMenu}
                      className="rounded-xl px-3 py-3 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent/10"
                    >
                      Sign In
                    </Link>

                    {/* Get Started */}
                    <Link
                      href="/signup"
                      onClick={closeMenu}
                      className="rounded-xl bg-accent px-4 py-3 text-center text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90"
                    >
                      Get Started
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
