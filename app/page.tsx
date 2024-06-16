import Link from "next/link";
import BooksGrid from "./components/BooksGrid";

export default function HomePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Books</h1>
        <Link href="/new-book" className="btn">
          Add new book
        </Link>
      </div>
      <BooksGrid />
    </div>
  );
}
