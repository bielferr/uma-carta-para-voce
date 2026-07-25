import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uma carta para você",
  description: "Uma pequena experiência, feita com carinho.",
  icons: {
    icon: "/download.png",
    shortcut: "/download.png",
    apple: "/download.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${greatVibes.variable} ${cormorant.variable} ${cinzel.variable}`}
    >
      <body suppressHydrationWarning className="bg-night-deep antialiased">
        {children}
      </body>
    </html>
  );
}
