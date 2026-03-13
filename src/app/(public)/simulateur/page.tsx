import type { Metadata } from "next";
import SimulateurClient from "@/components/simulateur/simulateur-client";

export const metadata: Metadata = {
  title: "Simulateur de moyenne BTS Diététique et Nutrition 2027",
  description:
    "Calcule ta moyenne au BTS Diététique et Nutrition avec les coefficients du nouveau référentiel 2027. Sais-tu si tu as ton diplôme ?",
};

export default function SimulateurPage() {
  return <SimulateurClient />;
}
