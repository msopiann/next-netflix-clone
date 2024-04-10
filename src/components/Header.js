"use client";

import React, { useEffect } from "react";
import netflixLogo from "../../public/img/netflixLogo.png";
import netflixAvatar from "../../public/img/netflixAvatar.png";
import Image from "next/image";

export default function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className="navbar fixed top-0 flex justify-between w-full h-[4.5rem] p-4 bg-transparent z-10">
      <Image
        src={netflixLogo}
        alt="Netflix Logo"
        width={128}
        height={32}
        className="w-32 object-contain fixed left-5"
      />

      <Image
        src={netflixAvatar}
        alt="Netflix Avatar"
        width={128}
        height={32}
        className="w-11 object-contain fixed right-5"
      />
    </nav>
  );
}