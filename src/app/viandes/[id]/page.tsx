"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import recipes from "../../../data/viandes";
import { Mail, Phone, InstagramIcon, FacebookIcon, X, } from "lucide-react";

export default function RecipePage() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [stepIndex, setStepIndex] = useState(0);

  if (!id) return <div>Chargement...</div>;

  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return <div>Recette introuvable</div>;

  const steps = recipe.steps;
  const nextStep = () => setStepIndex((prev) => (prev + 1) % steps.length);
  const prevStep = () =>
    setStepIndex((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="min-h-screen bg-yellow-50 font-sans flex flex-col">
      {/* HEADER */}
      <header className="bg-yellow-400 text-white px-8 py-6 shadow-md flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold">CookMaster</Link>
        <nav className="space-x-4">
          <Link href="/">Accueil</Link>
          <Link href="/recipes">Recettes</Link>
        </nav>
      </header>

      <div className="px-4 py-16 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden p-8"
        >
          <h1 className="text-4xl font-extrabold mb-6 text-gray-500">{recipe.title}</h1>

          <h2 className="text-2xl font-semibold mb-4 text-gray-500">Étapes</h2>

          {/* SLIDER */}
          <div className="relative w-full h-[400px] flex flex-col items-center">
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
                className="px-6 py-2 bg-gray-600 rounded-full hover:bg-gray-300 transition"
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

          <Link
            href="/recipes"
            className="mt-10 inline-block bg-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition shadow-md"
          >
            Retour aux recettes
          </Link>
        </motion.div>
      </div>
      {/* FOOTER */}<footer className="bg-yellow-400 text-white py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* LOGO + COPYRIGHT */}
        <div>
          <h2 className="text-2xl font-bold">CookMaster</h2>
          <p className="mt-2">&copy; 2025 CookMaster. Tous droits réservés.</p>
        </div>

        {/* NAVIGATION RAPIDE */}
        <div>
          <h3 className="font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li><Link href="/recipes" className="hover:underline">Recettes</Link></li>
            <li><Link href="/about" className="hover:underline">À propos</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="flex items-center gap-2">
            <Mail size={18} /> support@cookmaster.com
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Phone size={18} /> +33 6 12 34 56 78
          </p>
        </div>

        {/* RÉSEAUX + NEWSLETTER */}
        <div>
          <h3 className="font-semibold mb-3">Suivez-nous</h3>
          <div className="flex gap-4 mb-4">
            <Link href="#" className="hover:opacity-80">
              <FacebookIcon />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <InstagramIcon />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <X />
            </Link>
          </div>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Votre email"
              className="px-3 py-2 rounded text-gray-800"
            />
            <button
              type="submit"
              className="bg-white text-yellow-500 font-bold rounded py-2 hover:bg-yellow-100 transition"
            >
              S’abonner
            </button>
          </form>
        </div>
      </div>
    </footer>
    </div>

    
  );
}
