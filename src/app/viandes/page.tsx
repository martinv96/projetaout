import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import viandes from "../../data/viandes";

export default function ViandesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yellow-50 font-sans">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-700">Recettes de viandes</h1>
          <p className="mt-3 text-lg text-gray-600">
            Découvrez des recettes généreuses et faciles à préparer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {viandes.map((viande) => (
            <Link
              key={viande.id}
              href={`/viandes/${viande.id}`}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={viande.image}
                  alt={viande.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-700">{viande.title}</h2>
                <p className="mt-2 text-gray-600">{viande.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
