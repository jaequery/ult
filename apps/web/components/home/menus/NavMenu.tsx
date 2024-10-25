"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useUserContext } from "@web/app/user/UserContext";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useUserContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-4">
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pb-3 sm:px-3">
            {!currentUser ? (
              <MobileNavLink href="/login">Login / 로그인</MobileNavLink>
            ) : (
              <>
                <MobileNavLink href="/profile">Profile / 프로필</MobileNavLink>
                <MobileNavLink href="/logout">Logout / 로그아웃</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-orange-500 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </Link>
  );
}
