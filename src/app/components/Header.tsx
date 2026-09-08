import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-yellow-400 px-8 py-6 text-white shadow-md">
      <Link href="/" className="text-2xl font-bold">
        CookMaster
      </Link>
      <nav className="flex items-center gap-4 font-medium">
        <Link href="/" className="transition hover:text-yellow-100">
          Accueil
        </Link>
        <Link href="/recipes" className="transition hover:text-yellow-100">
          Recettes
        </Link>
        <Link href="/viandes" className="transition hover:text-yellow-100">
          Viandes
        </Link>
        <Link href="/contact" className="transition hover:text-yellow-100">
          Contact
        </Link>
      </nav>
    </header>
  );
}
