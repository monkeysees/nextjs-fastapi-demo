import Link from "next/link";
import BookForm from "../components/BookForm";

export default function NewBookPage() {
  return (
    <div>
      <Link href="/" className="btn mb-8">
        Back
      </Link>
      <h1 className="text-3xl font-bold mb-2">Add a new book</h1>
      <BookForm />
    </div>
  );
}
