"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Phone, InstagramIcon, FacebookIcon, X } from "lucide-react";

const recipes = [
  {
    id: "1",
    title: "Tarte aux pommes",
    description: "Une tarte aux pommes fondante et délicieuse.",
    image: "/tarte.jpg",
    ingredients: [
      "4 pommes",
      "1 pâte brisée",
      "50 g de sucre",
      "30 g de beurre",
      "1 c. à café de cannelle",
    ],
    steps: [
      "Préchauffer le four à 180°C.",
      "Étaler la pâte dans un moule à tarte.",
      "Éplucher et couper les pommes en tranches.",
      "Disposer les pommes sur la pâte.",
      "Saupoudrer de sucre et de cannelle, ajouter des morceaux de beurre.",
      "Cuire 35 minutes jusqu'à ce que la tarte soit dorée.",
    ],
  },
  {
    id: "2",
    title: "Spaghetti Carbonara",
    description: "Classique italien, crémeux et gourmand.",
    image: "/carbonara.jpg",
    ingredients: [
      "200 g de spaghetti",
      "100 g de pancetta",
      "2 œufs",
      "50 g de parmesan râpé",
      "Poivre noir",
    ],
    steps: [
      "Cuire les spaghetti al dente.",
      "Faire revenir la pancetta jusqu'à ce qu'elle soit dorée.",
      "Battre les œufs avec le parmesan.",
      "Égoutter les pâtes et les mélanger avec la pancetta.",
      "Ajouter le mélange œufs-parmesan hors du feu et mélanger rapidement.",
      "Poivrer selon le goût et servir immédiatement.",
    ],
  },
  {
    id: "3",
    title: "Salade fraîcheur",
    description: "Salade saine et rafraîchissante pour l'été.",
    image: "/salade.jpg",
    ingredients: [
      "Laitue",
      "Tomates cerises",
      "Concombre",
      "Feta",
      "Olives noires",
      "Vinaigrette au citron",
    ],
    steps: [
      "Laver et couper la laitue, tomates et concombre.",
      "Mélanger tous les légumes dans un saladier.",
      "Ajouter la feta émiettée et les olives.",
      "Assaisonner avec la vinaigrette au citron.",
      "Mélanger délicatement et servir frais.",
    ],
  },
];

const tips = [
  {
    title: "Cuisinez de saison",
    text: "Utilisez des fruits et légumes de saison pour plus de saveurs et moins de dépenses.",
  },
  {
    title: "Assaisonnez correctement",
    text: "Le sel et les épices doivent être ajoutés progressivement pour ne pas masquer les goûts.",
  },
  {
    title: "Préparez à l’avance",
    text: "Coupez, épluchez et conservez vos ingrédients pour gagner du temps lors de la préparation.",
  },
  {
    title: "Nettoyez au fur et à mesure",
    text: "Gardez votre espace de travail propre pour cuisiner plus sereinement.",
  },
  {
    title: "Goûtez souvent",
    text: "Goûtez vos plats pendant la préparation pour ajuster l'assaisonnement.",
  },
  {
    title: "Utilisez des herbes fraîches",
    text: "Les herbes fraîches ajoutent plus de saveur que les herbes sèches.",
  },
  // Ajoute autant de tips que tu veux
];

// --- SLIDER ---
function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % recipes.length);
    }, 4500); // 4.5 sec
    return () => clearInterval(interval);
  }, []);

  if (typeof window !== "undefined") {
    const consoleError = console.error;
    console.error = (...args) => {
      if (/hydration/i.test(args[0])) return;
      consoleError(...args);
    };
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl mb-12">
      {recipes.map((recipe, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {recipe.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- PAGE PRINCIPALE ---
export default function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [emailNewsletter, setEmailNewsletter] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // déclenche le fade out
      setTimeout(() => {
        setStartIndex((prev) => (prev + 3) % tips.length);
        setFade(true); // déclenche le fade in
      }, 500); // durée du fade out
    }, 5500); // toutes les 5,5 secondes

    return () => clearInterval(interval);
  }, []);

  const visibleTips = [
    tips[startIndex],
    tips[(startIndex + 1) % tips.length],
    tips[(startIndex + 2) % tips.length],
  ];

  return (
    <div className="min-h-screen bg-yellow-50 font-sans flex flex-col">
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
          <Link href="/contact" className="hover:text-yellow-100 transition">
            Contact
          </Link>
        </nav>
      </motion.header>
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-screen flex items-center justify-center bg-gray-900"
      >
        {/* Background image */}
        <Image
          src="/hero-food.jpg"
          alt="Recette"
          fill
          className="object-cover brightness-75"
          priority
        />

        {/* Texte centré */}
        <div className="relative text-center px-6 md:px-12 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Découvrez des recettes{" "}
            <span className="text-yellow-400">faciles à préparer</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Explorez notre collection pour tous les goûts. Que vous soyez
            débutant ou chef expérimenté, trouvez l’inspiration pour vos repas !
          </p>
          <Link
            href="/recipes"
            className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-500 transition transform hover:scale-105"
          >
            Voir les recettes
          </Link>
        </div>
      </motion.section>
      {/* COOKING TIPS */}
      <section className="px-8 py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            🧑‍🍳 Astuces de cuisine
          </h3>

          <div
            className={`grid md:grid-cols-3 gap-8 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {visibleTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition h-40 flex flex-col justify-between"
              >
                <h4 className="text-xl font-semibold mb-2">{tip.title}</h4>
                <p className="text-gray-600 overflow-y-auto">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SLIDER */}
      <section
        className="relative py-16 bg-white overflow-hidden"
        style={{
          backgroundImage: "url('/grain.jpg')",

          backgroundSize: "auto", // taille naturelle des grains
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4">
          <ImageSlider />
        </div>
      </section>
      {/* RECIPES */}
      <section id="recipes" className="px-8 py-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nos recettes populaires
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
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
                  className="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
                >
                  Voir la recette
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* ABOUT SECTION */}
      <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl text-gray-500 font-bold mb-6">
            À propos de <span className="text-red-500">CookMaster</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            CookMaster est une plateforme dédiée aux passionnés de cuisine.
            Notre objectif est de partager des recettes variées, simples et
            gourmandes pour inspirer vos repas au quotidien. Que vous soyez
            débutant ou chef confirmé, vous trouverez toujours une idée adaptée
            à vos envies !
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow-md p-6 rounded-2xl">
              <h3 className="text-xl text-gray-400 font-semibold mb-2">
                💡 Inspiration
              </h3>
              <p className="text-gray-600">
                Des recettes pour toutes les occasions et toutes les saisons.
              </p>
            </div>
            <div className="bg-white text-gray-400 shadow-md p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">⏱️ Simplicité</h3>
              <p className="text-gray-600">
                Des plats rapides et faciles à préparer au quotidien.
              </p>
            </div>
            <div className="bg-white text-gray-400 shadow-md p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">🌍 Partage</h3>
              <p className="text-gray-600">
                Une communauté qui échange et découvre de nouvelles saveurs.
              </p>
            </div>
          </div>

          <Link
            href="/recipes"
            className="bg-red-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-red-600 transition"
          >
            Découvrir nos recettes
          </Link>
        </div>
      </section>
      );
      {/* QUIZ SECTION */}
      <section className="px-8 py-16 bg-gray-50">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🍳 Quiz culinaire
        </h3>
        <p className="text-center text-gray-700 mb-6">
          Testez vos connaissances sur la cuisine et découvrez si vous êtes un
          vrai chef !
        </p>
        <div className="text-center">
          <Link
            href="/quiz"
            className="bg-yellow-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
          >
            Commencer le quiz
          </Link>
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
              onSubmit={async (e) => {
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
