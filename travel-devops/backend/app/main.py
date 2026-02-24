from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .models import Flight
from .routers import flights
from prometheus_fastapi_instrumentator import Instrumentator
import time

app = FastAPI()

Instrumentator().instrument(app).expose(app)

# 🔥 CORS pentru frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # pentru dev; în producție pui domeniul tău
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 Așteaptă DB să fie ready
@app.on_event("startup")
def startup():
    retries = 5
    while retries > 0:
        try:
            Base.metadata.create_all(bind=engine)
            print("Database connected and tables created.")
            break
        except Exception as e:
            print("Database not ready, retrying...")
            time.sleep(3)
            retries -= 1

# 🔥 Router flights
app.include_router(flights.router)

@app.get("/")
def root():
    return {"message": "Travel DevOps API running 🚀"}
