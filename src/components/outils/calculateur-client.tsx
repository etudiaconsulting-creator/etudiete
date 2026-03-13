"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowLeftRight } from "lucide-react";

type Tab = "mb" | "bet" | "macro";
type Sexe = "homme" | "femme";
type Methode = "harris" | "black";

const napOptions = [
  { value: "1.2", label: "Alité — 1.2" },
  { value: "1.4", label: "Sédentaire — 1.4" },
  { value: "1.6", label: "Activité modérée — 1.6" },
  { value: "1.8", label: "Actif — 1.8" },
  { value: "2.0", label: "Très actif — 2.0" },
  { value: "2.2", label: "Sportif intense — 2.2" },
];

const KJ_FACTOR = 4.1855;

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const selectClass =
  "w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400";

const labelClass = "block text-sm text-gray-700 dark:text-gray-300 mb-1.5";

export default function CalculateurClient() {
  // Tab
  const [activeTab, setActiveTab] = useState<Tab>("mb");

  // Tab 1: MB
  const [sexe, setSexe] = useState<Sexe>("homme");
  const [age, setAge] = useState("");
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [methode, setMethode] = useState<Methode>("harris");

  // Tab 2: BET
  const [mbManuel, setMbManuel] = useState("");
  const [nap, setNap] = useState("1.4");

  // Tab 3: Macro
  const [betManuel, setBetManuel] = useState("");
  const [protPct, setProtPct] = useState(15);
  const [lipPct, setLipPct] = useState(35);

  // Convertisseur
  const [convKcal, setConvKcal] = useState("");
  const [convKj, setConvKj] = useState("");

  // === Calculs ===

  const mb = useMemo(() => {
    const a = parseFloat(age);
    const p = parseFloat(poids);
    const t = parseFloat(taille);
    if (!a || !p || !t || a <= 0 || p <= 0 || t <= 0) return null;

    if (methode === "harris") {
      return sexe === "homme"
        ? 13.397 * p + 4.799 * t - 5.677 * a + 88.362
        : 9.247 * p + 3.098 * t - 4.33 * a + 447.593;
    }
    // Black et al.
    const coef = sexe === "homme" ? 1.083 : 0.963;
    return coef * Math.pow(p, 0.48) * Math.pow(t, 0.5) * Math.pow(a, -0.13) * (1000 / KJ_FACTOR);
  }, [age, poids, taille, sexe, methode]);

  const mbForBet = mbManuel.trim() ? parseFloat(mbManuel) : mb;
  const bet = useMemo(() => {
    if (!mbForBet || mbForBet <= 0) return null;
    return mbForBet * parseFloat(nap);
  }, [mbForBet, nap]);

  // Auto-fill BET tab when MB changes
  const betForMacro = betManuel.trim() ? parseFloat(betManuel) : bet;
  const glucPct = 100 - protPct - lipPct;
  const macroError = protPct + lipPct > 100;

  const macroTable = useMemo(() => {
    if (!betForMacro || betForMacro <= 0 || macroError) return null;
    const protKcal = betForMacro * protPct / 100;
    const lipKcal = betForMacro * lipPct / 100;
    const glucKcal = betForMacro * glucPct / 100;
    return {
      prot: { pct: protPct, kcal: protKcal, g: protKcal / 4 },
      lip: { pct: lipPct, kcal: lipKcal, g: lipKcal / 9 },
      gluc: { pct: glucPct, kcal: glucKcal, g: glucKcal / 4 },
      total: betForMacro,
    };
  }, [betForMacro, protPct, lipPct, glucPct, macroError]);

  const formulaText = useMemo(() => {
    if (methode === "harris") {
      return sexe === "homme"
        ? "MB = 13.397 × Poids + 4.799 × Taille - 5.677 × Âge + 88.362"
        : "MB = 9.247 × Poids + 3.098 × Taille - 4.330 × Âge + 447.593";
    }
    const c = sexe === "homme" ? "1.083" : "0.963";
    return `MB = ${c} × Poids⁰·⁴⁸ × Taille⁰·⁵⁰ × Âge⁻⁰·¹³ × 1000 / 4.1855`;
  }, [sexe, methode]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "mb", label: "Métabolisme de base" },
    { key: "bet", label: "Besoins énergétiques" },
    { key: "macro", label: "Macronutriments" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Calculateur nutritionnel
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Métabolisme de base, besoins énergétiques et répartition des macronutriments
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white dark:bg-gray-700 text-emerald-700 dark:text-emerald-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Métabolisme de base */}
      {activeTab === "mb" && (
        <Card>
          <div className="space-y-5">
            {/* Sexe */}
            <div>
              <label className={labelClass}>Sexe</label>
              <div className="grid grid-cols-2 gap-3">
                {(["homme", "femme"] as Sexe[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSexe(s)}
                    className={`py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${
                      sexe === s
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    {s === "homme" ? "Homme" : "Femme"}
                  </button>
                ))}
              </div>
            </div>

            {/* Âge, Poids, Taille */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="age" className={labelClass}>Âge (ans)</label>
                <input id="age" type="number" min={1} max={120} step={1} value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" className={inputClass} />
              </div>
              <div>
                <label htmlFor="poids" className={labelClass}>Poids (kg)</label>
                <input id="poids" type="number" min={1} max={300} step={0.1} value={poids} onChange={(e) => setPoids(e.target.value)} placeholder="70" className={inputClass} />
              </div>
              <div>
                <label htmlFor="taille" className={labelClass}>Taille (cm)</label>
                <input id="taille" type="number" min={50} max={250} step={1} value={taille} onChange={(e) => setTaille(e.target.value)} placeholder="175" className={inputClass} />
              </div>
            </div>

            {/* Méthode */}
            <div>
              <label htmlFor="methode" className={labelClass}>Méthode de calcul</label>
              <select id="methode" value={methode} onChange={(e) => setMethode(e.target.value as Methode)} className={selectClass}>
                <option value="harris">Harris-Benedict révisée (Roza & Shizgal, 1984)</option>
                <option value="black">Black et al. (1996)</option>
              </select>
            </div>

            {/* Résultat */}
            <div className={`rounded-xl p-5 border text-center ${mb !== null ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Métabolisme de base</p>
              <p className={`text-3xl font-medium ${mb !== null ? "text-emerald-600 dark:text-emerald-400" : "text-gray-300 dark:text-gray-600"}`}>
                {mb !== null ? `${Math.round(mb)} kcal/jour` : "—"}
              </p>
              {mb !== null && (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    soit {Math.round(mb * KJ_FACTOR)} kJ/jour
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 font-mono">
                    {formulaText}
                  </p>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Tab 2: Besoins énergétiques totaux */}
      {activeTab === "bet" && (
        <Card>
          <div className="space-y-5">
            <div>
              <label htmlFor="mbInput" className={labelClass}>
                Métabolisme de base (kcal/jour)
                {mb !== null && !mbManuel.trim() && (
                  <span className="text-emerald-600 dark:text-emerald-400 ml-2 text-xs">— calculé automatiquement</span>
                )}
              </label>
              <input
                id="mbInput"
                type="number"
                min={0}
                step={1}
                value={mbManuel.trim() ? mbManuel : mb !== null ? Math.round(mb).toString() : ""}
                onChange={(e) => setMbManuel(e.target.value)}
                placeholder="Ex : 1500"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="nap" className={labelClass}>Niveau d&apos;activité physique (NAP)</label>
              <select id="nap" value={nap} onChange={(e) => setNap(e.target.value)} className={selectClass}>
                {napOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Résultat */}
            <div className={`rounded-xl p-5 border text-center ${bet !== null ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Besoins énergétiques totaux</p>
              <p className={`text-3xl font-medium ${bet !== null ? "text-emerald-600 dark:text-emerald-400" : "text-gray-300 dark:text-gray-600"}`}>
                {bet !== null ? `${Math.round(bet)} kcal/jour` : "—"}
              </p>
              {bet !== null && (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    soit {Math.round(bet * KJ_FACTOR)} kJ/jour
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                    Pour un individu de {poids || "—"} kg, {taille || "—"} cm, {age || "—"} ans, avec un NAP de {nap}, les besoins énergétiques totaux sont de {Math.round(bet)} kcal/jour.
                  </p>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Répartition macronutriments */}
      {activeTab === "macro" && (
        <Card>
          <div className="space-y-5">
            <div>
              <label htmlFor="betInput" className={labelClass}>
                Besoins énergétiques totaux (kcal/jour)
                {bet !== null && !betManuel.trim() && (
                  <span className="text-emerald-600 dark:text-emerald-400 ml-2 text-xs">— calculé automatiquement</span>
                )}
              </label>
              <input
                id="betInput"
                type="number"
                min={0}
                step={1}
                value={betManuel.trim() ? betManuel : bet !== null ? Math.round(bet).toString() : ""}
                onChange={(e) => setBetManuel(e.target.value)}
                placeholder="Ex : 2100"
                className={inputClass}
              />
            </div>

            {/* Sliders */}
            <div>
              <label className={labelClass}>Protéines : {protPct}%</label>
              <input type="range" min={10} max={30} step={1} value={protPct} onChange={(e) => setProtPct(Number(e.target.value))} className="w-full accent-emerald-600" />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>10%</span><span>30%</span></div>
            </div>

            <div>
              <label className={labelClass}>Lipides : {lipPct}%</label>
              <input type="range" min={20} max={45} step={1} value={lipPct} onChange={(e) => setLipPct(Number(e.target.value))} className="w-full accent-emerald-600" />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>20%</span><span>45%</span></div>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-sm text-gray-700 dark:text-gray-300">Glucides (auto)</span>
              <span className={`text-sm font-medium ${macroError ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                {glucPct}%
              </span>
            </div>

            {macroError && (
              <p className="text-sm text-red-500 font-medium">
                La somme protéines + lipides dépasse 100 %. Ajuste les curseurs.
              </p>
            )}

            {/* Table */}
            {macroTable && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Macronutriment</th>
                      <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">%</th>
                      <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">kcal</th>
                      <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">grammes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2.5 text-gray-900 dark:text-white">Protéines</td>
                      <td className="py-2.5 text-right text-gray-700 dark:text-gray-300">{macroTable.prot.pct}%</td>
                      <td className="py-2.5 text-right text-gray-700 dark:text-gray-300">{Math.round(macroTable.prot.kcal)}</td>
                      <td className="py-2.5 text-right font-medium text-emerald-600 dark:text-emerald-400">{Math.round(macroTable.prot.g)} g</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2.5 text-gray-900 dark:text-white">Lipides</td>
                      <td className="py-2.5 text-right text-gray-700 dark:text-gray-300">{macroTable.lip.pct}%</td>
                      <td className="py-2.5 text-right text-gray-700 dark:text-gray-300">{Math.round(macroTable.lip.kcal)}</td>
                      <td className="py-2.5 text-right font-medium text-emerald-600 dark:text-emerald-400">{Math.round(macroTable.lip.g)} g</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2.5 text-gray-900 dark:text-white">Glucides</td>
                      <td className="py-2.5 text-right text-gray-700 dark:text-gray-300">{macroTable.gluc.pct}%</td>
                      <td className="py-2.5 text-right text-gray-700 dark:text-gray-300">{Math.round(macroTable.gluc.kcal)}</td>
                      <td className="py-2.5 text-right font-medium text-emerald-600 dark:text-emerald-400">{Math.round(macroTable.gluc.g)} g</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-medium text-gray-900 dark:text-white">Total</td>
                      <td className="py-2.5 text-right font-medium text-gray-900 dark:text-white">100%</td>
                      <td className="py-2.5 text-right font-medium text-gray-900 dark:text-white">{Math.round(macroTable.total)}</td>
                      <td className="py-2.5 text-right text-gray-400">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Convertisseur kcal/kJ */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-sm font-medium text-gray-900 dark:text-white">Convertisseur kcal / kJ</h2>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div>
            <label htmlFor="convKcal" className={labelClass}>kcal</label>
            <input
              id="convKcal"
              type="number"
              min={0}
              step={1}
              value={convKcal}
              onChange={(e) => {
                setConvKcal(e.target.value);
                const v = parseFloat(e.target.value);
                setConvKj(isNaN(v) ? "" : (v * KJ_FACTOR).toFixed(1));
              }}
              placeholder="0"
              className={inputClass}
            />
          </div>
          <span className="text-gray-400 dark:text-gray-500 text-sm pb-2.5">=</span>
          <div>
            <label htmlFor="convKj" className={labelClass}>kJ</label>
            <input
              id="convKj"
              type="number"
              min={0}
              step={1}
              value={convKj}
              onChange={(e) => {
                setConvKj(e.target.value);
                const v = parseFloat(e.target.value);
                setConvKcal(isNaN(v) ? "" : (v / KJ_FACTOR).toFixed(1));
              }}
              placeholder="0"
              className={inputClass}
            />
          </div>
        </div>
      </Card>

      {/* Note pédagogique */}
      <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-300">
              Note pédagogique
            </p>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
              Ces calculs sont basés sur les formules utilisées dans le référentiel du BTS Diététique et Nutrition. En situation d&apos;examen (E4), tu dois maîtriser ces calculs à la main. Cet outil te permet de vérifier tes résultats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
