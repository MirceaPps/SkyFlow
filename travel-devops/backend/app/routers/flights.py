from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from ..database import SessionLocal
from ..models import Flight
from ..auth import verify_admin

router = APIRouter(prefix="/flights", tags=["flights"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Schemas ---

class FlightCreate(BaseModel):
    origin: str
    destination: str
    price: float
    price_label: str
    image: str
    skyscanner_url: str


class FlightUpdate(BaseModel):
    origin: Optional[str] = None
    destination: Optional[str] = None
    price: Optional[float] = None
    price_label: Optional[str] = None
    image: Optional[str] = None
    skyscanner_url: Optional[str] = None


class FlightOut(BaseModel):
    id: int
    origin: str
    destination: str
    price: float
    price_label: str
    image: str
    skyscanner_url: str

    class Config:
        from_attributes = True


# --- Endpoints ---

# GET public - fara autentificare (site-ul public citeste de aici)
@router.get("/", response_model=list[FlightOut])
def get_flights(db: Session = Depends(get_db)):
    return db.query(Flight).all()


# Restul sunt protejate cu admin secret
@router.get("/{flight_id}", response_model=FlightOut)
def get_flight(flight_id: int, db: Session = Depends(get_db)):
    flight = db.query(Flight).filter(Flight.id == flight_id).first()
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return flight


@router.post("/", response_model=FlightOut, status_code=201,
             dependencies=[Depends(verify_admin)])
def create_flight(data: FlightCreate, db: Session = Depends(get_db)):
    flight = Flight(**data.dict())
    db.add(flight)
    db.commit()
    db.refresh(flight)
    return flight


@router.put("/{flight_id}", response_model=FlightOut,
            dependencies=[Depends(verify_admin)])
def update_flight(flight_id: int, data: FlightUpdate, db: Session = Depends(get_db)):
    flight = db.query(Flight).filter(Flight.id == flight_id).first()
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    for field, value in data.dict(exclude_unset=True).items():
        setattr(flight, field, value)
    db.commit()
    db.refresh(flight)
    return flight


@router.delete("/{flight_id}", status_code=204,
               dependencies=[Depends(verify_admin)])
def delete_flight(flight_id: int, db: Session = Depends(get_db)):
    flight = db.query(Flight).filter(Flight.id == flight_id).first()
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    db.delete(flight)
    db.commit()
