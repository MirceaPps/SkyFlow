from sqlalchemy import Column, Integer, String, Float
from .database import Base


class Flight(Base):
    __tablename__ = "flights"

    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String, index=True)
    destination = Column(String, index=True)
    price = Column(Float)
    price_label = Column(String)          # ex: "375 lei dus-întors"
    image = Column(String)                # URL sau cale locală
    skyscanner_url = Column(String)       # link direct Skyscanner
