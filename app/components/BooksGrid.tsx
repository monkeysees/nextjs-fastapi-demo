"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import { Book } from "../models";

interface PaginatedBooks {
  total_pages: number;
  books: Book[];
}

export default function BooksGrid() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [booksWithPagination, setBooksWithPagination] =
    useState<PaginatedBooks>({
      total_pages: 1,
      books: [],
    });
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?page=${currentPage}`, {
      cache: "no-store",
    })
      .then<PaginatedBooks>((res) => res.json())
      .then((data) => setBooksWithPagination(data));
  }, [currentPage]);

  return (
    <div>
      <div className="container grid grid-cols-4 gap-8 mb-8">
        {booksWithPagination.books.map((b) => (
          <div
            className="card card-compact card-bordered bg-base-100"
            key={b.title}
          >
            <figure className="">
              <Image
                width={b.cover.width}
                height={b.cover.height}
                src={b.cover.filepath}
                alt="Cover image"
              />
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
      <Pagination totalPages={booksWithPagination.total_pages} />
    </div>
  );
}
