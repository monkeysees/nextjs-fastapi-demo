from fastapi import UploadFile
import aiofiles
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import Any, List, Mapping, Sequence, TypedDict
from api.models import Book, PaginatedBooks


class AggregatedBooksResult(TypedDict):
    totalBooks: int
    books: List[Book]


async def get_paginated_books(
    collection: AsyncIOMotorCollection, page: int, page_size: int
) -> PaginatedBooks:
    skips = page_size * page

    pipeline: Sequence[Mapping[str, Any]] = [
        {
            "$facet": {
                "total": [{"$count": "count"}],
                "books": [
                    {"$skip": skips},
                    {"$limit": page_size},
                ],
            }
        },
        {"$unwind": "$total"},
        {"$project": {"totalBooks": "$total.count", "books": "$books"}},
    ]

    rawResult = await collection.aggregate(pipeline).to_list(length=None)
    result: AggregatedBooksResult = (
        rawResult[0] if rawResult else {"totalBooks": 0, "books": []}
    )

    total_books = result["totalBooks"]
    total_pages = (total_books + page_size - 1) // page_size

    return {
        "page": page,
        "page_size": page_size,
        "total_books": total_books,
        "total_pages": total_pages,
        "books": result["books"],
    }


async def add_book(collection: AsyncIOMotorCollection, book_data: Book) -> Book:
    new_book_creation_result = await collection.insert_one(book_data.model_dump())
    new_book = await collection.find_one({"_id": new_book_creation_result.inserted_id})
    if not new_book:
        raise Exception("Created document not found!")
    return new_book


async def upload_file(dest: str, file: UploadFile):
    if not file.filename:
        raise Exception("Filename must not be empty")

    upload_dir = Path(dest)
    upload_dir.mkdir(parents=True, exist_ok=True)
    filepath = upload_dir / file.filename

    async with aiofiles.open(filepath, "wb") as buffer:
        await buffer.write(await file.read())

    return filepath
