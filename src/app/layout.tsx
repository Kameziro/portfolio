import type { Metadata } from "next";
import { Pixelify_Sans, Press_Start_2P, VT323 } from "next/font/google";
import { pt } from "@/content/pt";
import { cn } from "@/lib/utils";
import "./globals.css";

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

const sans = Pixelify_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = VT323({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: pt.meta.title,
  description: pt.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn("dark h-full", pixel.variable, sans.variable, mono.variable)}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <noscript>
          <style>{`.pixel-reveal,.pixel-reveal-item{opacity:1;transform:none}.pixel-reveal>.pixel-rule{transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
