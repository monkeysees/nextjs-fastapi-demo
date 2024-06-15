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
