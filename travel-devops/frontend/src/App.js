import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [flights, setFlights] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");

  const fetchFlights = () => {
    fetch("/api/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const addFlight = async (e) => {
    e.preventDefault();

    await fetch(
      `/api/flights?origin=${origin}&destination=${destination}&price=${price}`,
      {
        method: "POST",
      }
    );

    setOrigin("");
    setDestination("");
    setPrice("");

    fetchFlights();
  };

return (
  <div className="app-container">
    <div className="card">

      <h1>✈ Travel DevOps</h1>

      <p className="subtitle">
        Modern Flight Management Platform
      </p>

      <div className="form">
        <input
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />

        <input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addFlight}>
          Add Flight
        </button>
      </div>

      <div className="flight-list">
        {flights.map((flight) => (
          <div className="flight-card" key={flight.id}>
            <div className="flight-route">
              {flight.origin} ✈ {flight.destination}
            </div>

            <div className="flight-price">
              €{flight.price}
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
  )
}

export default App;
