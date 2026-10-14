import {
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { BsLayoutSidebar } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import {
  HiOutlineSquares2X2,
  HiOutlineMagnifyingGlass,
  HiOutlineBookmark,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineCog6Tooth,
  HiOutlineBanknotes,
  HiOutlineUsers,
  HiOutlineBuildingOffice2,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { getUserSession } from "@/lib/core/session";

export async function DashboardSidebar() {
  const user = await getUserSession();
  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: Bell,
      href: "/dashboard/recruiter/jobs/new",
      label: "Post A Job",
    },
    {
      icon: IoBriefcaseOutline,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    {
      icon: Envelope,
      href: "/message",
      label: "Messages",
    },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
    {
      icon: HiOutlineSquares2X2,
      href: "/dashboard/seeker",
      label: "Dashboard",
    },
    {
      icon: HiOutlineMagnifyingGlass,
      href: "/dashboard/seeker/jobs",
      label: "Jobs",
    },
    {
      icon: HiOutlineBookmark,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },
    {
      icon: HiOutlineDocumentText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    {
      icon: HiOutlineCreditCard,
      href: "/dashboard/seeker/billing",
      label: "Billing",
    },
    {
      icon: HiOutlineCog6Tooth,
      href: "/dashboard/seeker/settings",
      label: "Settings",
    },
  ];

  const adminNavLinks = [
    {
      icon: HiOutlineSquares2X2,
      href: "/dashboard/admin",
      label: "Dashboard",
    },
    {
      icon: HiOutlineUsers,
      href: "/dashboard/admin/users",
      label: "Users",
    },
    {
      icon: HiOutlineBuildingOffice2,
      href: "/dashboard/admin/companies",
      label: "Companies",
    },
    {
      icon: HiOutlineBriefcase,
      href: "/dashboard/admin/jobs",
      label: "Jobs",
    },
    {
      icon: HiOutlineBanknotes,
      href: "/dashboard/admin/payments",
      label: "Payments",
    },
    {
      icon: HiOutlineCog6Tooth,
      href: "/dashboard/admin/settings",
      label: "Settings",
    },
  ];

  const navLinksMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 border-r border-default p-4 bg-[#0d0d0e]">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <BsLayoutSidebar />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
