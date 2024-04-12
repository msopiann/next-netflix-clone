import React from "react";
import netflixLogo from "../../public/img/netflixLogo.png";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mb-4">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="footer-logo">
            <Image
              src={netflixLogo}
              alt="Netflix Logo"
              width={0}
              height={0}
              loading="lazy"
              sizes="100vw"
              style={{ width: "30%", height: "auto" }}
            />
          </div>

          <ul className="mt-4 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <li>
              <Link
                href="https://github.com/msopiann"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Github</span>

                <FaGithub />
              </Link>
            </li>

            <li>
              <Link
                href="https://linkedin.com/in/msopiann"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Linkedin</span>

                <FaLinkedin />
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-xs text-gray-500">
          &copy; 2024. Netflix Clone Project. Code by{" "}
          <span className="text-red-600 font-bold hover:underline">
            Muhammad Sopian
          </span>
          .
        </p>
      </div>
    </footer>
  );
}
