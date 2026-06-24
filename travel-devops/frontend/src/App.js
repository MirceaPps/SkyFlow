import React from "react";
import "./App.css";

function App() {
  const [deals, setDeals] = React.useState([]);

  React.useEffect(() => {
    fetch("/offers.json")
      .then((res) => res.json())
      .then((data) => setDeals(data));
  }, []);

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          ✈ SkyFlow
        </div>

        <ul className="nav-links">
          <li><a href="#home">Acasă</a></li>
          <li><a href="#offers">Zboruri</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="overlay">
          <h1>✈ SkyFlow</h1>

          <p>
            Vacanțe, city break-uri și oferte last minute la cele mai bune prețuri.
          </p>

      
        </div>
      </section>

      <section className="offers" id="offers">
        <h2>🔥 Ofertele săptămânii</h2>

        <div className="deals">
          {deals.map((deal) => (
            <div className="deal-card" key={deal.id}>

              <img
                src={deal.image}
                alt={deal.title}
              />

              <div className="deal-content">
                <span>Zbor</span>

                <h3>{deal.title}</h3>

                <p>{deal.price}</p>

                <a
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="offer-button"
                >
                  Vreau oferta
                </a>

              </div>

            </div>
          ))}
        </div>

      </section>

      <footer className="footer" id="contact">
        <h3>SkyFlow</h3>

        <p>
          Vacanțe, city break-uri și oferte last minute.
        </p>

        <div className="socials">
          <a href="/">Facebook</a>
          <a href="/">Instagram</a>
        </div>

        <p className="copyright">
          © 2026 SkyFlow. Toate drepturile rezervate.
        </p>
      </footer>

    </div>
  );
}

export default App;