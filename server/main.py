import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
from database import BookModel, init_db, get_db

class Book(BaseModel):
    id: int | None = None
    title: str

class Books(BaseModel):
    books: List[Book]

def book_from_orm(db_book) -> Book:
    return Book(id=db_book.id, title=db_book.title)

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

@app.get("/books", response_model=Books)
def get_books(db: Session = Depends(get_db)):
    books = db.query(BookModel).all()
    return Books(books=[book_from_orm(b) for b in books])

@app.post("/books", response_model=Book)
def add_book(book: Book, db: Session = Depends(get_db)):
    db_book = BookModel(title=book.title)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return book_from_orm(db_book)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)