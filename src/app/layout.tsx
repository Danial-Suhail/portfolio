import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localfont from "next/font/local"
import "./globals.css";
import Particles from "@/components/particles";
import { useTheme } from "next-themes";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Juliette = localfont({
    src: [{
      path: "../../public/fonts/Juliette.otf",
      weight: "700",
    },
  ],
  variable: "--font-Juliette"
});

const SketchetikFillLight = localfont({
  src: [{
    path: "../../public/fonts/SketchetikFillLight.otf",
    weight: "700",
  },
],
variable: "--font-SketchetikFillLight"
});


export const metadata: Metadata = {
  metadataBase: new URL('https://danialsuhail.com'),
  title: 'Danial Suhail',
  description: "I'm an 18 year old Software Engineer and Full-Stack Developer based in Waterloo, ON.",
  openGraph: {
    url: 'https://danialsuhail.com',
    type: 'website',
    title: 'Danial Suhail',
    description: "I'm an 18 year old Software Engineer and Full-Stack Developer based in Waterloo, ON.",
    images: [{
      url: 'https://opengraph.b-cdn.net/production/images/db1a112c-0ed1-47eb-a8b7-156c8b2bd251.png?token=5O_qwy-ApRnk9hl-Fl6Pf_6bvYvd2dIvs1xby63wLN4&height=822&width=1200&expires=33274002237',
      width: 1200,
      height: 822,
      alt: 'Danial Suhail',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danial Suhail',
    description: "I'm an 18 year old Software Engineer and Full-Stack Developer based in Waterloo, ON.",
    images: ['https://opengraph.b-cdn.net/production/images/db1a112c-0ed1-47eb-a8b7-156c8b2bd251.png?token=5O_qwy-ApRnk9hl-Fl6Pf_6bvYvd2dIvs1xby63wLN4&height=822&width=1200&expires=33274002237'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
                className={cn(
                  "min-h-screen bg-background font-sans antialiased px-6 sm:px-12 md:px-24", // Adjusted padding
                  fontSans.variable,
                  Juliette.variable,
                  SketchetikFillLight.variable
                )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
