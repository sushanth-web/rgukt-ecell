import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white">

      {/* Top divider */}
      <div className="h-[2px] w-full bg-white/20" />

      <div className="relative bg-[#0B2E5F]">

        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-24 -top-24 h-60 w-60 sm:h-72 sm:w-72 rotate-12 rounded-[60px] bg-white/10" />
          <div className="absolute left-1/3 top-10 h-48 w-48 sm:h-56 sm:w-56 -rotate-12 rounded-[60px] bg-white/8" />
          <div className="absolute right-0 -bottom-28 h-64 w-64 sm:h-80 sm:w-80 rotate-6 rounded-[80px] bg-black/15" />
          <div className="absolute right-20 sm:right-40 top-6 h-44 w-44 sm:h-52 sm:w-52 rotate-12 rounded-[60px] bg-white/6" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">

          {/* Main Grid */}
          <div className="grid gap-10 sm:gap-12 md:grid-cols-4 md:gap-x-16">

            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <span className="text-base font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">
                  E-Cell
                </h3>
              </div>

              <p className="mt-4 max-w-sm mx-auto md:mx-0 text-sm leading-relaxed text-white/80">
                Empowering innovation & entrepreneurship among students by
                building a strong startup ecosystem.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-base font-semibold">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>
                  <Link to="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-white transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="hover:text-white transition">
                    Team
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-white transition">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h4 className="text-base font-semibold">Contact</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>RGUKT Ongole Campus</li>
                <li>
                  <a
                    href="mailto:epsc@rguktong.ac.in"
                    className="hover:text-white transition"
                  >
                    epsc@rguktong.ac.in
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919703695946"
                    className="hover:text-white transition"
                  >
                    +91 9703695946
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-left">
              <h4 className="text-base font-semibold">Follow Us</h4>

              <div className="mt-4 flex justify-center md:justify-start gap-4">

                <SocialLink
                  href="https://www.instagram.com/ecro_council?igsh=MWpnb2xtNHd3aGg3NA=="
                  label="Instagram"
                  hover="hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]"
                >
                  <FaInstagram />
                </SocialLink>

                <SocialLink
                  href="https://www.linkedin.com/in/entrepreneurship-cell-rgukt-ongole-032925386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  label="LinkedIn"
                  hover="hover:bg-[#0A66C2]"
                >
                  <FaLinkedinIn />
                </SocialLink>

                <SocialLink
                  href="https://x.com/N_Ram_Charan"
                  label="X"
                  hover="hover:bg-black"
                >
                  <FaXTwitter />
                </SocialLink>

              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-white/15 pt-4 text-center text-xs sm:text-sm text-white/70">
            © {new Date().getFullYear()} E-Cell RGUKT Ongole. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}

/* ===== Social Icon Component ===== */

function SocialLink({ href, label, hover, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`group grid h-10 w-10 place-items-center rounded-lg
                  bg-[#ff7a00] text-white shadow-md
                  transition-all duration-300 transform
                  hover:-translate-y-1 hover:shadow-lg ${hover}`}
    >
      {children}
    </a>
  );
}
