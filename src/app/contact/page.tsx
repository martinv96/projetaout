"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await fetch("https://projetaout-3u06gyb8b-mvallee96s-projects.vercel.app/contact", {
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
        <h1 className="text-2xl font-bold">CookMaster</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-yellow-100 transition">
            Accueil
          </Link>
          <Link href="/recipes" className="hover:text-yellow-100 transition">
            Recettes
          </Link>
          <Link href="/contact" className="hover:text-yellow-100 transition">
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

      {/* FOOTER */}
      <footer className="bg-yellow-400 text-white py-6 flex flex-col items-center gap-4">
        <p>&copy; 2025 CookMaster. Tous droits réservés.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-100 transition">
            Facebook
          </a>
          <a href="#" className="hover:text-yellow-100 transition">
            Instagram
          </a>
          <a href="#" className="hover:text-yellow-100 transition">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
