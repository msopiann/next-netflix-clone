"use client";

import React, { useEffect } from "react";
import netflixLogo from "../../public/img/netflixLogo.png";
import netflixAvatar from "../../public/img/netflixAvatar.jpg";
import Image from "next/image";
import Link from "next/link";

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
      <Link href="/">
        <Image
          src={netflixLogo}
          alt="Netflix Logo"
          width={128}
          height={32}
          priority={true}
          style={{ objectFit: "contain" }}
          className="fixed left-5"
        />
      </Link>

      <Image
        src={netflixAvatar}
        alt="Netflix Avatar"
        width={44}
        height={32}
        priority={true}
        style={{ objectFit: "contain" }}
        className="fixed right-5"
      />
    </nav>
  );
}
