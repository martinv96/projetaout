"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, InstagramIcon, FacebookIcon, X, } from "lucide-react";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [emailNewsletter, setEmailNewsletter] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 5000); // Reset après 5s
    } else {
      setStatus("error");
    }
  } catch (err) {
    console.error("Erreur lors de l'envoi du message :", err);
    setStatus("error");
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-yellow-400 text-white px-8 py-6 shadow-md flex justify-between items-center"
      >
        <Link href="/" className="text-2xl font-bold">CookMaster</Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-yellow-100 transition">
            Accueil
          </Link>
          <Link href="/recipes" className="hover:text-yellow-100 transition">
            Recettes
          </Link>
          <Link href="/contact" className="hover:text-yellow-100 transition font-semibold">
            Contact
          </Link>
        </nav>
      </motion.header>

      {/* MAIN CONTACT SECTION */}
      <section className="px-8 py-16 bg-yellow-50 flex-1">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            📬 Contactez-nous
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl shadow-md focus:outline-none focus:ring-2 bg-white text-black focus:ring-yellow-400"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl shadow-md focus:outline-none focus:ring-2 bg-white text-black focus:ring-yellow-400"
              required
            />

            <textarea
              placeholder="Votre message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full p-4 rounded-xl shadow-md focus:outline-none focus:ring-2 bg-white text-black focus:ring-yellow-400"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-white font-semibold py-4 rounded-xl hover:bg-yellow-500 transition"
            >
              Envoyer
            </button>

            {status === "success" && (
              <p className="text-green-600 font-semibold">Message envoyé !</p>
            )}
            {status === "error" && (
              <p className="text-red-600 font-semibold">
                Une erreur est survenue, réessayez.
              </p>
            )}
          </form>
        </div>
      </section>

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
          <form 
  className="flex flex-col gap-2"
  onSubmit={async (e) => {
    e.preventDefault();
    if (!emailNewsletter) return;

    try {
      const res = await fetch("/api/subscribe", { // crée un endpoint newsletter
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailNewsletter }),
      });

      if (res.ok) {
        alert("Merci pour votre inscription !");
        setEmailNewsletter("");
      } else {
        alert("Une erreur est survenue, réessayez.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription.");
    }
  }}
>
  <input
    type="email"
    placeholder="Votre email"
    className="px-3 py-2 rounded text-gray-800"
    value={emailNewsletter}
    onChange={(e) => setEmailNewsletter(e.target.value)}
    required
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
};

export default ContactPage;
