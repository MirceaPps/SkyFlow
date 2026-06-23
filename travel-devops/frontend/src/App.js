import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [flights, setFlights] = useState([]);

  const fetchFlights = () => {
    fetch("/api/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="app-container">

      <header className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>✈ SkyFlow</h1>

            <p>
              Vacanțe, city break-uri și oferte last minute la cele mai bune prețuri.
            </p>

            <button className="hero-btn">
              Vezi ofertele
            </button>
          </div>
        </div>
      </header>

      <section className="section-title">
        <h2>🔥 Ofertele săptămânii</h2>
      </section>

      <section className="deals">

        <div className="deal-card">
          <span className="badge">OFERTĂ</span>

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Sardinia"
          />

          <div className="deal-content">
            <h3>Vacanță în Sardinia</h3>
            <p>187€ zbor și cazare 4 nopți</p>
          </div>
        </div>

        <div className="deal-card">
          <span className="badge">OFERTĂ</span>

          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="Cannes"
          />

          <div className="deal-content">
            <h3>Vacanță în Cannes</h3>
            <p>211€ zbor și cazare 5 nopți</p>
          </div>
        </div>

        <div className="deal-card">
          <span className="badge">OFERTĂ</span>

          <img
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b"
            alt="Albania"
          />

          <div className="deal-content">
            <h3>Vacanță în Albania</h3>
            <p>143€ zbor și cazare 7 nopți</p>
          </div>
        </div>

      </section>

      <section className="db-section">
        <h2>✈ Oferte din baza de date</h2>

        <div className="flight-list">
          {flights.map((flight) => (
            <div className="flight-card" key={flight.id}>
              <h3>
                {flight.origin} → {flight.destination}
              </h3>

              <p>€{flight.price}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default App;