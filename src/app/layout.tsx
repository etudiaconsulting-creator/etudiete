import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://etudiet.fr"),
  title: {
    default: "ETUDIET — Programme de préparation BTS Diététique et Nutrition 2027",
    template: "%s | ETUDIET",
  },
  description:
    "Programme de révision personnalisé pour le BTS Diététique et Nutrition. Nouveau référentiel 2027. Quiz, exercices format examen, répétition espacée.",
  openGraph: {
    title: "ETUDIET — Préparation BTS Diététique 2027",
    description:
      "Programme de révision personnalisé pour le BTS Diététique et Nutrition.",
    siteName: "ETUDIET",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETUDIET — Préparation BTS Diététique 2027",
    description:
      "Programme de révision personnalisé pour le BTS Diététique et Nutrition.",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0F6E52" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
