"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, InstagramIcon, FacebookIcon, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const questions = [
  {
    question: "Quel ingrédient est essentiel pour une pâte à crêpes ?",
    options: ["Farine", "Levure", "Chocolat", "Huile d'olive"],
    answer: "Farine",
  },
  {
    question: "Quelle est la température idéale pour cuire une pizza ?",
    options: ["180°C", "200°C", "250°C", "300°C"],
    answer: "250°C",
  },
  {
    question: "Quel est le plat national de l'Espagne ?",
    options: ["Paella", "Ratatouille", "Sushi", "Tacos"],
    answer: "Paella",
  },
  {
    question: "Quel fromage est utilisé dans une fondue savoyarde ?",
    options: ["Mozzarella", "Comté", "Cheddar", "Roquefort"],
    answer: "Comté",
  },
  {
    question: "Quel est l'ingrédient principal du guacamole ?",
    options: ["Avocat", "Tomate", "Poivron", "Oignon"],
    answer: "Avocat",
  },
  {
    question: "Quelle épice donne sa couleur jaune au curry ?",
    options: ["Curcuma", "Paprika", "Safran", "Cumin"],
    answer: "Curcuma",
  },
  {
    question: "Quel est le temps de cuisson idéal pour un œuf mollet ?",
    options: ["3 minutes", "5 minutes", "7 minutes", "10 minutes"],
    answer: "5 minutes",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Décrémente chaque seconde
      return () => clearTimeout(timer); // Nettoie le timer à chaque re-render
    } else {
      // Si le temps est écoulé, passe automatiquement à la question suivante
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswers((prev) => [...prev, ""]); // Enregistre une réponse vide
        setTimeLeft(10); // Réinitialise le temps pour la prochaine question
      } else {
        setShowScore(true); // Affiche le score si c'était la dernière question
      }
    }
  }, [timeLeft, currentQuestion]);

  const handleAnswer = (selectedOption: string) => {
    setSelectedAnswers((prev) => [...prev, selectedOption]);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setTimeLeft(10); // Réinitialise le chrono pour la prochaine question
      }, 500); // Animation avant de passer à la question suivante
    } else {
      setTimeout(() => setShowScore(true), 500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers([]);
    setTimeLeft(10); // Réinitialise le temps
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-sans flex flex-col">
      <Header />

      {/* QUIZ SECTION */}
      <section className="px-8 py-16 flex-grow relative">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🍳 Quiz culinaire
          </h2>

          {/* Barre de progression */}
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <motion.div
              className="bg-yellow-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            ></motion.div>
          </div>

          {showScore ? (
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-800 mb-4">
                Vous avez obtenu un score de {score} sur {questions.length} !
              </p>
              <p className="text-lg font-medium text-gray-700 mb-6">
                {score === questions.length
                  ? "Félicitations ! Vous êtes un véritable chef étoilé ! ⭐"
                  : score >= questions.length / 2
                  ? "Pas mal ! Vous avez de bonnes bases en cuisine. 🍴"
                  : "Ne vous découragez pas ! Continuez à apprendre et à cuisiner. 👨‍🍳"}
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Corrigé du quiz :
              </h3>
              <ul className="text-left space-y-4">
                {questions.map((q, index) => (
                  <li key={index}>
                    <p className="font-semibold text-gray-800">
                      {index + 1}. {q.question}
                    </p>
                    <p
                      className={`${
                        selectedAnswers[index] === q.answer
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Votre réponse : {selectedAnswers[index]}
                    </p>
                    {selectedAnswers[index] !== q.answer && (
                      <p className="text-gray-600">
                        Réponse correcte : {q.answer}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <button
                onClick={resetQuiz}
                className="bg-yellow-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition mt-6"
              >
                Recommencer le quiz
              </button>
            </div>
          ) : (
            <div>
              {/* Chrono placé ici */}
              <div className="flex justify-center items-center mb-6">
                <div className="bg-yellow-400 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-4">
                  <span className="text-lg font-semibold">
                    ⏱️ Temps restant :
                  </span>
                  <span className="text-2xl font-bold">{timeLeft}s</span>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-4">
                Question {currentQuestion + 1} sur {questions.length}
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-100 text-gray-800 px-4 py-3 rounded-lg shadow hover:bg-yellow-200 transition"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Illustration à gauche */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/4 left-8 hidden lg:block"
        >
          <div className="flex flex-col items-center bg-yellow-100 p-6 rounded-lg shadow-lg border border-yellow-300">
            <div className="relative w-40 h-40 mb-4">
              <Image
                src="/chef-hat.png"
                alt="Chef illustration"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-800 text-center font-semibold">
              <span className="text-yellow-500">
                Devenez un expert culinaire
              </span>{" "}
              <br />
              avec nos quiz interactifs !
            </p>
            <div className="mt-4">
              <Link
                href="/recipes"
                className="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
              >
                Explorer les recettes
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Citation inspirante à droite */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/4 right-4 hidden lg:block"
        >
          <blockquote className="bg-yellow-100 p-6 rounded-lg shadow-md text-gray-700 italic text-right max-w-xs">
            &quot;La cuisine est l&apos;art de transformer
            <br />
            des ingrédients simples en moments
            <br />
            extraordinaires.&quot;
          </blockquote>
        </motion.div>
      </section>

      <Footer />
      {false && (
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
      )}
    </div>
  );
}
