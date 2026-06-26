import React from "react";
import "./App.css";

function App() {
  const [deals, setDeals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/flights/")
      .then((res) => {
        if (!res.ok) throw new Error("Nu am putut încărca ofertele.");
        return res.json();
      })
      .then((data) => {
        setDeals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">

      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#home">Acasă</a></li>
          <li><a href="#offers">Zboruri</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="overlay">
          <h1>SkyFlow</h1>
          <p>Discover the best flight deals</p>
          <a href="#offers" className="hero-button">Vezi ofertele</a>
        </div>
      </section>

      <section className="offers" id="offers">
        <h2>🔥 Flight deals</h2>

        {loading && (
          <div className="status-msg">Se încarcă ofertele...</div>
        )}

        {error && (
          <div className="status-msg error">⚠️ {error}</div>
        )}

        {!loading && !error && deals.length === 0 && (
          <div className="status-msg">Nu există oferte momentan.</div>
        )}

        <div className="deals">
          {deals.map((deal) => (
            <div className="deal-card" key={deal.id}>
              <img src={deal.image} alt={deal.destination} />
              <div className="deal-content">
                <span className="badge">Zbor</span>
                <h3>{deal.destination}</h3>
                <p className="price">{deal.price_label}</p>
                <a
                  href={deal.skyscanner_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="offer-button"
                >
                  Vreau zborul
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <h3>SkyFlow</h3>
        <p>Vacanțe, city break-uri și oferte last minute.</p>
        <div className="socials">
          <a href="/">Facebook</a>
          <a href="/">Instagram</a>
        </div>
        <p className="copyright">© 2026 SkyFlow. Toate drepturile rezervate.</p>
      </footer>

    </div>
  );
}

export default App;
