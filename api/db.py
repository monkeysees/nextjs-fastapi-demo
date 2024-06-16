from motor.motor_asyncio import AsyncIOMotorClient
from api.settings import settings


client = AsyncIOMotorClient(settings.MONGODB_URL)
database = client.books_db
collection = database.books
