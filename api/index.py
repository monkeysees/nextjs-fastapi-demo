from fastapi import FastAPI, Query
from typing import Annotated
from api.models import PaginatedBooks
from api.db import collection
from api.utils import get_paginated_books


app = FastAPI()


@app.get("/api/books", response_model=PaginatedBooks)
async def list_books(
    page: Annotated[int, Query(ge=1)] = 1, page_size: Annotated[int, Query(le=100)] = 8
):
    books = await get_paginated_books(collection, page - 1, page_size)
    books["page"] += 1
    return books
