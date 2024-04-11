import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

const links = [
  { name: "Buy", href: "/buy" },
  { name: "Rent", href: "/rent" },
  { name: "Sell", href: "/sell" },
  { name: "Loan", href: "/loan" },
  { name: "Agents", href: "/agents" },
  { name: "Manege Rentals", href: "/manege-rentals" },
  { name: "Advertise", href: "/advertise" },
  { name: "Help", href: "/help" },
  { name: "Sign In", href: "/sign-in" },
];

export default function Header() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white py-4 px-6">
      {/* header when screen size is middle or higher */}
      <div className="hidden md:flex">
        <div className="flex-grow">
          <div className="flex items-center">
            <div className="flex justify-start items-center">
              {links.slice(0, 5).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex text-black h-[48px] items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600",
                    {
                      "bg-sky-100 text-blue-600": pathname === link.href,
                    },
                  )}
                >
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              ))}
            </div>
            <div className="flex-grow" />
          </div>
        </div>
        <div className="flex-grow-0">
          <Link href="/">
            <Image
              src="/jiro-housing.svg"
              width={1000}
              height={300}
              alt="Logo"
              className="h-12 w-auto cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex-grow">
          <div className="flex justify-end items-center">
            {links.slice(5).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex text-black h-[48px] items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600",
                  {
                    "bg-sky-100 text-blue-600": pathname === link.href,
                  },
                )}
              >
                <p className="hidden md:block">{link.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* header when screen size is small */}
      <div className="md:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <button
            className="text-black"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>
          <div className="flex-grow-0">
            <Link href="/">
              <Image
                src="/jiro-housing.svg"
                width={1000}
                height={300}
                alt="Logo"
                className="h-12 w-auto cursor-pointer"
              />
            </Link>
          </div>
          {links.slice(-1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-black hover:text-blue-600"
            >
              <p>{link.name}</p>
            </Link>
          ))}
        </div>
        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed top-16 left-6 z-50 bg-white py-4 px-6 shadow-md">
            {links.slice(0, 8).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-black hover:text-blue-600 py-2"
              >
                <p>{link.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
