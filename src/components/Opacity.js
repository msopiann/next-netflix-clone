"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Opacity() {
  const [opacity, setOpacity] = useState("");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const newOpacity = 1 - scrollPosition / 100;
    setOpacity(newOpacity < 0 ? 0 : newOpacity);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 h-12 md:hidden"
      style={{ opacity: opacity, zIndex: 10 }}
    >
      <div className="ml-3">
        <Link href="/" className="text-5xl">
          &lt;
        </Link>
      </div>
    </div>
  );
}
