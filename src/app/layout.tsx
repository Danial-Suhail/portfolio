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
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
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
