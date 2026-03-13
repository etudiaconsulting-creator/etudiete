import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Découvrez les tarifs ETUDIET : plan gratuit, mensuel à 12,90 euros et annuel à 99 euros pour préparer votre BTS Diététique.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
