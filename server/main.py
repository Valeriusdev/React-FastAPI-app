import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Book(BaseModel):
    title: str

class Books(BaseModel):
    books: List[Book]

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"books": []}

@app.get("/books", response_model=Books)
def get_books():
    return Books(books=memory_db["books"])

@app.post("/books", response_model=Book)
def add_book(book: Book):
    memory_db["books"].append(book)
    return book

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)