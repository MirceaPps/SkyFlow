from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Flight

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/flights")
def create_flight(origin: str, destination: str, price: float, db: Session = Depends(get_db)):
    flight = Flight(origin=origin, destination=destination, price=price)
    db.add(flight)
    db.commit()
    db.refresh(flight)
    return flight

@router.get("/flights")
def get_flights(db: Session = Depends(get_db)):
    return db.query(Flight).all()
