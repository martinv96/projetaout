"use client";

import React from "react";
import { useState } from "react";
import { Code, Rocket, Heart } from "lucide-react";
import { Mail, Phone, InstagramIcon, FacebookIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
    const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Envoi...");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("✅ Merci ! Vérifiez vos mails.");
        setEmail("");
      } else {
        setStatus("❌ Erreur, réessayez.");
      }
    } catch {
      setStatus("❌ Impossible d’envoyer le mail.");
    }
  };
  return (
    <main className="bg-gray-100 min-h-screen text-gray-800">
      {/* HEADER */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-yellow-400 text-white px-8 py-6 shadow-md flex justify-between items-center"
      >
        <Link href="/" className="text-2xl font-bold">
          CookMaster
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-yellow-100 transition">
            Accueil
          </Link>
          <Link href="/recipes" className="hover:text-yellow-100 transition">
            Recettes
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-100 transition font-semibold"
          >
            Contact
          </Link>
        </nav>
      </motion.header>
      {/* HERO */}
      <section className="bg-yellow-300 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            À propos de <span className="text-gray-900">CookMaster</span>
          </h1>
          <p className="text-lg md:text-xl">
            Un projet personnel passionné pour partager la cuisine et la tech ✨
          </p>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Le projet</h2>
        <p className="text-lg leading-relaxed mb-6">
          <strong>CookMaster</strong> est un projet personnel que j’ai imaginé
          et développé pour combiner mes deux passions : la cuisine et le
          développement web. L’objectif est de proposer une plateforme moderne,
          simple et intuitive pour découvrir, partager et expérimenter des
          recettes du monde entier 🍲.
        </p>
        <p className="text-lg leading-relaxed">
          Ce projet est également l’occasion pour moi de mettre en pratique mes
          compétences en développement web et mobile, et de tester les bonnes
          pratiques modernes en termes de design, performance et accessibilité.
        </p>
      </section>

      {/* VALEURS */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <Heart className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Passion</h3>
            <p>Un projet né de l’envie de partager l’amour de la cuisine.</p>
          </div>
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <Code className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Technologie</h3>
            <p>
              Une plateforme développée avec les dernières technologies web.
            </p>
          </div>
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <Rocket className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Ambition</h3>
            <p>
              Faire grandir le projet et en faire une vraie référence culinaire.
            </p>
          </div>
        </div>
      </section>

      {/* STACK TECH */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">
          Technologies utilisées
        </h2>
        <div className="flex flex-wrap gap-3">
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
            React
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
            TailwindCSS
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
            TypeScript
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
            Lucide Icons
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
            Framer Motion
          </span>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-300 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Envie d’en savoir plus ?</h2>
        <p className="mb-6 text-lg">
          Découvrez toutes les recettes ou contactez-moi directement !
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/recipes"
            className="bg-white text-yellow-500 font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-100 transition"
          >
            Voir les recettes
          </Link>
          <a
            href="/contact"
            className="border-2 border-white text-white font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-500 transition"
          >
            Me contacter
          </a>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-yellow-400 text-white py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* LOGO + COPYRIGHT */}
          <div>
            <h2 className="text-2xl font-bold">CookMaster</h2>
            <p className="mt-2">
              &copy; 2025 CookMaster. Tous droits réservés.
            </p>
          </div>

          {/* NAVIGATION RAPIDE */}
          <div>
            <h3 className="font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:underline">
                  Recettes
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="px-3 py-2 rounded text-gray-800"
          />
          <button
            type="submit"
            className="bg-white text-yellow-500 font-bold rounded py-2 hover:bg-yellow-100 transition"
          >
            S’abonner
          </button>
          {status && <p className="text-sm mt-2">{status}</p>}
        </form>
          </div>
        </div>
      </footer>
    </main>
  );
}
