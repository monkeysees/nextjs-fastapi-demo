from pydantic import BaseModel, Field
from typing import List, Optional, TypedDict
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, _val_info):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")


class Cover(TypedDict):
    filepath: str
    width: int
    height: int


class Book(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    description: str
    cover: Cover

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PaginatedBooks(TypedDict):
    page: int
    page_size: int
    total_books: int
    total_pages: int
    books: List[Book]
