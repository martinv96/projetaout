"use client"; // Client Component
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import recipes from "../../data/recipes";
import recipesViande from "../../data/viandes";

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
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
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nos recettes viandes
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {recipesViande.map((recipe, index) => (
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
      <footer className="bg-yellow-400 text-white py-6 mt-auto flex flex-col items-center gap-4">
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
}
