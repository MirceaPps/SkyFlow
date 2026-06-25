from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, Base, SessionLocal
from .models import Flight
from .routers import flights, uploads
import os, time

UPLOAD_DIR = "/app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(
    title="SkyFlow API",
    docs_url=None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servește pozele uploadate direct din backend
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


def seed_flights(db):
    if db.query(Flight).count() > 0:
        return
    offers = [
        Flight(
            origin="Timișoara",
            destination="Zadar, Croația",
            price=375.0,
            price_label="375 lei dus-întors",
            image="/images/zadar.jpg",
            skyscanner_url=(
                "https://www.skyscanner.ro/transport/zboruri/buch/zada/"
                "260730/260806/?adultsv2=1&cabinclass=economy&childrenv2=&"
                "ref=home&rtn=1&preferdirects=true"
            ),
        ),
        Flight(
            origin="București",
            destination="Barcelona, Spania",
            price=499.0,
            price_label="499 lei dus-întors",
            image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
            skyscanner_url=(
                "https://www.skyscanner.ro/transport/zboruri/buch/bcn/"
                "260801/260808/?adultsv2=1&cabinclass=economy&ref=home&rtn=1"
            ),
        ),
        Flight(
            origin="București",
            destination="Roma, Italia",
            price=420.0,
            price_label="420 lei dus-întors",
            image="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
            skyscanner_url=(
                "https://www.skyscanner.ro/transport/zboruri/buch/rome/"
                "260815/260822/?adultsv2=1&cabinclass=economy&ref=home&rtn=1"
            ),
        ),
        Flight(
            origin="București",
            destination="Amsterdam, Olanda",
            price=550.0,
            price_label="550 lei dus-întors",
            image="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800",
            skyscanner_url=(
                "https://www.skyscanner.ro/transport/zboruri/buch/ams/"
                "260901/260908/?adultsv2=1&cabinclass=economy&ref=home&rtn=1"
            ),
        ),
        Flight(
            origin="București",
            destination="Londra, Marea Britanie",
            price=610.0,
            price_label="610 lei dus-întors",
            image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
            skyscanner_url=(
                "https://www.skyscanner.ro/transport/zboruri/buch/lond/"
                "260910/260917/?adultsv2=1&cabinclass=economy&ref=home&rtn=1"
            ),
        ),
        Flight(
            origin="București",
            destination="Atena, Grecia",
            price=340.0,
            price_label="340 lei dus-întors",
            image="https://images.unsplash.com/photo-1555993539-1732b0258235?w=800",
            skyscanner_url=(
                "https://www.skyscanner.ro/transport/zboruri/buch/ath/"
                "260720/260727/?adultsv2=1&cabinclass=economy&ref=home&rtn=1"
            ),
        ),
    ]
    db.add_all(offers)
    db.commit()
    print(f"Seeded {len(offers)} flights.")


@app.on_event("startup")
def startup():
    retries = 10
    while retries > 0:
        try:
            Base.metadata.create_all(bind=engine)
            print("Database connected and tables created.")
            db = SessionLocal()
            try:
                seed_flights(db)
            finally:
                db.close()
            break
        except Exception as e:
            print(f"Database not ready ({e}), retrying...")
            time.sleep(3)
            retries -= 1


app.include_router(flights.router)
app.include_router(uploads.router)


@app.get("/")
def root():
    return {"message": "SkyFlow API running 🚀"}
