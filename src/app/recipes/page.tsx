"use client"; // Client Component
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import recipes from "../../data/recipes";
import recipesViande from "../../data/viandes";
import { Mail, Phone, InstagramIcon, FacebookIcon, X } from "lucide-react";

export default function RecipesPage() {
  const [emailNewsletter, setEmailNewsletter] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!emailNewsletter) return;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailNewsletter }),
      });

      if (res.ok) {
        setNewsletterMessage("Merci pour votre inscription !");
        setEmailNewsletter("");
      } else {
        setNewsletterMessage("Une erreur est survenue, réessayez.");
      }
    } catch (err) {
      console.error(err);
      setNewsletterMessage("Erreur lors de l'inscription.");
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
  recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
);

const filteredRecipesViande = recipesViande.filter((recipe) =>
  recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
);

const [showTitles, setShowTitles] = useState(true);

  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
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
          <Link
            href="/recipes"
            className="hover:text-yellow-100 transition font-semibold"
          >
            Recettes
          </Link>
          <Link href="/contact" className="hover:text-yellow-100 transition">
            Contact
          </Link>
        </nav>
      </motion.header>

      {/* SEARCH SECTION */}
      <section className="px-8 py-8 bg-yellow-100">
  <div className="max-w-4xl mx-auto">
    <div className="relative">
      <input
        type="text"
        placeholder="🔍 Rechercher une recette..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-6 py-3 border border-gray-300 rounded-full shadow-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all duration-300"
      />
      <button
  onClick={() => {
    setSearchQuery(searchTerm); // Met à jour la recherche déclenchée
    setShowTitles(false); // Cache les titres
  }}
  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300"
>
  Rechercher
</button>
    </div>
  </div>
</section>

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center px-8 py-16 bg-yellow-100"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Découvrez nos{" "}
          <span className="text-yellow-600">délicieuses recettes</span>
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-6">
          Parcourez notre sélection de recettes simples, gourmandes et adaptées
          à tous les goûts. Que vous soyez débutant ou chef confirmé, il y a
          forcément une recette pour vous !
        </p>
      </motion.section>

      {/* RECIPES GRID */}
     <section className="px-8 py-16">
  {showTitles && (
    <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      Nos recettes populaires
    </h3>
  )}
  <div className="grid md:grid-cols-3 gap-8">
    {filteredRecipes.map((recipe, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition"
      >
        <div className="relative w-full h-64">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6">
          <h4 className="font-bold text-2xl mb-2">{recipe.title}</h4>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          <Link
            href={`/recipes/${recipe.id}`}
            className="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition inline-block"
          >
            Voir la recette
          </Link>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      {/* RECIPES VIANDES */}
      <section className="px-8 py-16">
  {showTitles && (
    <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      Nos recettes viandes
    </h3>
  )}
  <div className="grid md:grid-cols-3 gap-8">
    {filteredRecipesViande.map((recipe, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition"
      >
        <div className="relative w-full h-64">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6">
          <h4 className="font-bold text-2xl mb-2">{recipe.title}</h4>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          <Link
            href={`/viandes/${recipe.id}`}
            className="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition inline-block"
          >
            Voir la recette
          </Link>
        </div>
      </motion.div>
    ))}
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
            <form
              className="flex flex-col gap-2"
              onSubmit={handleNewsletterSubmit}
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
              {newsletterMessage && (
                <p className="text-sm mt-2 font-semibold text-green-600">
                  {newsletterMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
