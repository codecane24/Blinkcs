import React from "react";
import { Inconsolata } from "next/font/google";

// ✅ Move this OUTSIDE the component (module scope)
const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Footer() {
  return (
    <div>
      {/* Footer section */}
      <div className="bg-black w-full h-12 pt-2 text-white font-light text-center text-sm flex flex-col md:flex-row items-center justify-center relative">
        <p className="mx-auto">© 2025 Blink Concrete Solutions</p>

        <span className="text-[0.7rem] mt-1 md:mt-0 md:absolute md:right-5">
          - developed by{" "}
          <span className={`${inconsolata.className} antialiased text-sm`}>
            Tech Tycoons
          </span>
        </span>
      </div>
    </div>
  );
}

export default Footer;
