import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import { Tooltip } from "@/components/ui/tooltip";
import Particles from "./particles";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <Particles particleColor="255, 255, 255" className="absolute inset-0 pointer-events-none" quantity={50} />
      <div className="w-full px-[4vw]"> {/* Adjust padding to be responsive */}
        <div className="flex flex-wrap justify-between h-14 items-center">
          {/* Logo / Title */}
          <Link href="#" className="flex items-center font-juliette text-mds">
            Danial Suhail
            <span className="sr-only"></span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex gap-[2vw]"> {/* Responsive gap */}
            {DATA.navbar.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`} 
                className="font-medium flex items-center text-sm transition-colors hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Media and Mode Toggle */}
          <div className="flex items-center gap-[2vw]"> {/* Responsive gap */}
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <Tooltip key={name}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="font-medium flex items-center text-sm transition-colors hover:underline">
                    <social.icon className="h-5 w-5" />
                  </a>
                </Tooltip>
              ))}
            <Separator orientation="vertical" className="h-full" />
            <ModeToggle/>
            <a href="/Danial_Suhail_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="sm">Resume</Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
