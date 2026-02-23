import React, { useEffect, useState } from "react";

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
    <div style={{ padding: "40px" }}>
      <h1>Travel DevOps ✈️</h1>

      <h2>Add Flight</h2>
      <form onSubmit={addFlight}>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Flights</h2>
      {flights.length === 0 ? (
        <p>No flights available</p>
      ) : (
        flights.map((flight) => (
          <div key={flight.id}>
            {flight.origin} → {flight.destination} | €{flight.price}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
