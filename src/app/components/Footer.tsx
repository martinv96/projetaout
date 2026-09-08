"use client";

import { useState } from "react";
import { Facebook, Instagram, Mail, Phone, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setMessage("Une erreur est survenue, réessayez.");
        return;
      }

      setMessage("Merci pour votre inscription !");
      setEmail("");
    } catch {
      setMessage("Erreur lors de l'inscription.");
    }
  };

  return (
    <footer className="mt-auto bg-yellow-400 py-10 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold">CookMaster</h2>
          <p className="mt-2">&copy; 2025 CookMaster. Tous droits réservés.</p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Navigation</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li><Link href="/recipes" className="hover:underline">Recettes</Link></li>
            <li><Link href="/about" className="hover:underline">À propos</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Contact</h3>
          <p className="flex items-center gap-2"><Mail size={18} /> support@cookmaster.com</p>
          <p className="mt-2 flex items-center gap-2"><Phone size={18} /> +33 6 12 34 56 78</p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Suivez-nous</h3>
          <div className="mb-4 flex gap-4">
            <Link href="#" className="hover:opacity-80" aria-label="Facebook"><Facebook /></Link>
            <Link href="#" className="hover:opacity-80" aria-label="Instagram"><Instagram /></Link>
            <Link href="#" className="hover:opacity-80" aria-label="X"><X /></Link>
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded px-3 py-2 text-gray-800"
              required
            />
            <button type="submit" className="rounded bg-white px-3 py-2 font-semibold text-yellow-500 hover:bg-yellow-100">
              S&apos;inscrire
            </button>
          </form>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
      </div>
    </footer>
  );
}
