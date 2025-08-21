"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import viandes from "../../../data/viandes";

export default function ViandePage() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [stepIndex, setStepIndex] = useState(0);
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);

  if (!id) return <div>Chargement...</div>;

  const viande = viandes.find((v) => v.id === id);
  if (!viande) return <div>Recette introuvable</div>;

  const steps = viande.steps;
  const nextStep = () => setStepIndex((prev) => (prev + 1) % steps.length);
  const prevStep = () =>
    setStepIndex((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="min-h-screen bg-yellow-50 font-sans flex flex-col">
      {/* HEADER */}
      <header className="bg-yellow-400 text-white px-8 py-6 shadow-md flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold">
          CookMaster
        </Link>
        <nav className="space-x-4">
          <Link href="/">Accueil</Link>
          <Link href="/recipes">Recettes</Link>
          <Link href="/viandes">Viandes</Link>
        </nav>
      </header>

      {/* CONTENU PRINCIPAL */}
      <div className="px-4 py-16 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden p-8"
        >
          <h1 className="text-4xl font-extrabold mb-6 text-gray-500">
            {viande.title}
          </h1>

          {/* SECTION INGRÉDIENTS */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-500">Ingrédients</h2>
          <ul className="list-disc list-inside mb-8 text-gray-700">
            {viande.ingredients.map((ingredient, index) => (
              <li key={index} className="text-lg">
                {ingredient}
              </li>
            ))}
          </ul>

          {/* SLIDER DES ÉTAPES */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-500">Étapes</h2>
          <div className="relative w-full h-[400px] flex flex-col items-center">
            {/* Barre de progression */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${((stepIndex + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex flex-col items-center"
              >
                <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg mb-4">
                  <Image
                    src={steps[stepIndex].image}
                    alt={`Étape ${stepIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-lg text-gray-800 font-medium text-center">
                  Étape {stepIndex + 1}: {steps[stepIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CONTROLES */}
            <div className="flex justify-between w-full mt-6">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
              >
                ◀ Précédent
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition"
              >
                Suivant ▶
              </button>
            </div>
          </div>

          {/* CONSEILS POUR LA RECETTE */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-500">
            Conseils pour cette recette
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {viande.tips.map((tip, index) => (
              <li key={index} className="text-lg mb-2">
                {tip}
              </li>
            ))}
          </ul>

          <Link
            href="/recipes"
            className="mt-10 inline-block bg-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition shadow-md"
          >
            Retour aux viandes
          </Link>
        </motion.div>
      </div>
      <section className="bg-white py-12 shadow-inner">
  <div className="max-w-6xl mx-auto px-6">
    <h3 className="text-2xl font-bold text-gray-700 mb-6">
      Tu pourrais aussi aimer 🍖
    </h3>
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {viandes
        .filter((v) => v.id !== id)
        .slice(0, showMoreSuggestions ? viandes.length : 3)
        .map((rec) => (
          <Link
            key={rec.id}
            href={`/viandes/${rec.id}`}
            className="bg-yellow-50 rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden">
              <Image
                src={rec.image}
                alt={rec.title}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="font-semibold text-gray-700">{rec.title}</h4>
          </Link>
        ))}
    </div>
    {!showMoreSuggestions && (
      <button
        onClick={() => setShowMoreSuggestions(true)}
        className="mt-6 bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
      >
        Voir plus
      </button>
    )}
  </div>
</section>
    </div>
  );
}