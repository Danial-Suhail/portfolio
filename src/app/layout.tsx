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
  metadataBase: new URL('danialsuhail.com'), 
  title: 'Danial Suhail',
  description: 'Im an 18 year old Software Engineer and Full-Stack Developer based in Waterloo, ON',
  openGraph: {
    type: 'website',
    title: 'Danial Suhail | Software Engineer',
    description: 'Im an 18 year old Software Engineer and Full-Stack Developer based in Waterloo, ON',
    images: [
      {
        url: '/banner.png', 
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danial Suhail',
    description: 'Im an 18 year old Software Engineer and Full-Stack Developer based in Waterloo, ON',
    creator: '@danial_suhail_', 
    images: ['/banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
                  "min-h-screen bg-background font-sans antialiased px-6 sm:px-12 md:px-24",
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
