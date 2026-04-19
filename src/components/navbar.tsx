import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import { Tooltip } from "@/components/ui/tooltip";
import Particles from "./particles";
import Image from "next/image";
import BirdAnimation from "./bird-animation";

export default function Navbar() {
  return (
    <nav className="duo-modal-blur-target fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
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
          </div>
        </div>
      </div>
      
      {/* Swing Images hanging from navbar bottom */}
      <div className="absolute top-full left-0 w-full pointer-events-none">
        {/* Left swing - positioned below logo area */}
        <div className="absolute left-[4vw] top-0" data-swing="left">
          <Image
            src="/pixel/left_swing.png"
            alt="Left swing decoration"
            width={40}
            height={40}
            className="opacity-80"
          />
        </div>
        
        {/* Right swing - positioned below social icons area */}
        <div className="absolute right-[4vw] top-0" data-swing="right">
          <Image
            src="/pixel/right_swing.png"
            alt="Right swing decoration"
            width={40}
            height={40}
            className="opacity-80"
          />
        </div>
        
        {/* Bird Animation */}
        <BirdAnimation />
      </div>
    </nav>
  );
}
