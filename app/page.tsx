import Image from "next/image";
import Pagination from "./components/Pagination";

export default function App() {
  const booksWithPagination = {
    books: [
      {
        title: "The Great Adventure",
        description:
          "An epic journey across uncharted lands and mysterious territories.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Mystery in the Mansion",
        description:
          "A thrilling mystery set in an old, spooky mansion with hidden secrets.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Romance in Paris",
        description:
          "A heartwarming love story set against the backdrop of the city of love.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Science Fiction: Beyond the Stars",
        description:
          "A futuristic adventure that takes you to the far reaches of the galaxy.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "The Haunted Forest",
        description:
          "A spine-chilling tale of ghosts and ghouls lurking in a dark forest.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "The Detective's Casebook",
        description:
          "A collection of intriguing detective stories that will keep you guessing.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Fantasy Realm",
        description:
          "A magical journey through a world of wizards, dragons, and mythical creatures.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Historical Legends",
        description:
          "Stories of famous historical figures and their legendary deeds.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "The Lost Treasure",
        description:
          "A gripping tale of a treasure hunt filled with danger and excitement.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Journey to the Unknown",
        description: "An exploration of mysterious and uncharted territories.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "A Tale of Two Cities",
        description: "A dramatic story set in two contrasting cities.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Underwater Mysteries",
        description:
          "An adventure beneath the waves filled with aquatic wonders.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Desert Survival",
        description:
          "A survival story set in the harsh and unforgiving desert.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Space Odyssey",
        description:
          "A space exploration adventure that delves into the unknown universe.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "The Secret Garden",
        description:
          "A heartwarming story about the discovery of a hidden garden.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Winter Wonderland",
        description:
          "A magical tale set in a winter landscape filled with wonder.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "The Enchanted Castle",
        description:
          "A fairy tale about a castle filled with enchantment and mystery.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "The Last Frontier",
        description:
          "A story about the final frontier of exploration and discovery.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Urban Legends",
        description: "A collection of eerie and thrilling urban legends.",
        cover: "https://placehold.co/400x600.png",
      },
      {
        title: "Island Escape",
        description:
          "An adventure story about escaping from a deserted island.",
        cover: "https://placehold.co/400x600.png",
      },
    ],
    currentPage: 2,
    maxPage: 2,
  };

  return (
    <main className="container mx-auto px-32 pt-16 pb-32 ">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Books</h1>
        <a href="./new-book" className="btn">
          Add new book
        </a>
      </div>
      <div className="container grid grid-cols-4 gap-8 mb-8">
        {booksWithPagination.books.map((b) => (
          <div
            className="card card-compact card-bordered bg-base-100"
            key={b.title}
          >
            <figure className="">
              <Image width={400} height={600} src={b.cover} alt="Cover image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title items-start text-ellipsis overflow-hidden">
                {b.title}
              </h2>
              <p className="text-ellipsis overflow-hidden">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={booksWithPagination.currentPage}
        maxPage={booksWithPagination.maxPage}
      />
    </main>
  );
}
