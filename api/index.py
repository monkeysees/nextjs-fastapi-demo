from fastapi import FastAPI, Query, Form, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from typing import Annotated
from api.models import PaginatedBooks, Book
from api.db import collection
from api.utils import get_paginated_books, add_book, upload_file
from api.settings import settings


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.NEXT_PUBLIC_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/books", response_model=PaginatedBooks)
async def read_books(
    page: Annotated[int, Query(ge=1)] = 1, page_size: Annotated[int, Query(le=100)] = 8
):
    books = await get_paginated_books(collection, page - 1, page_size)
    books["page"] += 1
    return books


@app.post("/api/books", response_model=Book)
async def create_book(
    title: Annotated[str, Form(min_length=1)],
    description: Annotated[str, Form(min_length=1)],
    cover: Annotated[UploadFile, File()],
):
    if not cover.filename:
        raise HTTPException(status_code=400, detail="Filename must not be empty")
    if not cover.content_type or not cover.content_type.startswith("image/"):
        raise HTTPException(400, detail="Invalid document type")

    cover_filepath = await upload_file("public/cover_images", cover)
    cover_image = Image.open(cover_filepath)

    new_book_data = Book(
        title=title,
        description=description,
        cover={
            "filepath": str(cover_filepath).replace("public", ""),
            "width": cover_image.size[0],
            "height": cover_image.size[1],
        },
    )
    new_book = await add_book(collection, new_book_data)

    return new_book
