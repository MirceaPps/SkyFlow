import React, { useState, useEffect } from "react";
import "./Admin.css";

const API = "/api/flights";

export default function Admin() {
  const [secret, setSecret] = useState(localStorage.getItem("admin_secret") || "");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const emptyForm = {
    origin: "București",
    destination: "",
    price: "",
    price_label: "",
    image: "",
    skyscanner_url: "",
  };
  const [form, setForm] = useState(emptyForm);

  // ── Auth ──────────────────────────────────────────────
  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch(`${API}/`, {
      headers: { "x-admin-secret": secret },
    });
    if (res.ok) {
      localStorage.setItem("admin_secret", secret);
      setLoggedIn(true);
      loadFlights();
    } else {
      setLoginError("Parolă incorectă.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_secret");
    setSecret("");
    setLoggedIn(false);
    setFlights([]);
  }

  // ── Data ──────────────────────────────────────────────
  async function loadFlights() {
    setLoading(true);
    const res = await fetch(`${API}/`, {
      headers: { "x-admin-secret": secret },
    });
    const data = await res.json();
    setFlights(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Ștergi această ofertă?")) return;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "x-admin-secret": secret },
    });
    flash("Ofertă ștearsă.", "success");
    loadFlights();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      price: parseFloat(form.price),
    };

    // Auto-completează price_label dacă e gol
    if (!payload.price_label) {
      payload.price_label = `${payload.price} lei dus-întors`;
    }

    const url = editingId ? `${API}/${editingId}` : `${API}/`;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": secret,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      flash(editingId ? "Ofertă actualizată!" : "Ofertă adăugată!", "success");
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      loadFlights();
    } else {
      const err = await res.json();
      setError(JSON.stringify(err.detail));
    }
  }

  function startEdit(flight) {
    setForm({
      origin: flight.origin,
      destination: flight.destination,
      price: flight.price,
      price_label: flight.price_label,
      image: flight.image,
      skyscanner_url: flight.skyscanner_url,
    });
    setEditingId(flight.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function flash(msg, type) {
    if (type === "success") setSuccess(msg);
    else setError(msg);
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  }

  // Auto-login dacă avem secretul salvat
  useEffect(() => {
    if (secret) handleLogin({ preventDefault: () => {} });
    // eslint-disable-next-line
  }, []);

  // ── Render: Login ─────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <h1>✈ SkyFlow Admin</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Parolă admin"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              autoFocus
            />
            {loginError && <p className="admin-error">{loginError}</p>}
            <button type="submit">Intră</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Render: Dashboard ─────────────────────────────────
  return (
    <div className="admin-page">

      {/* Header */}
      <div className="admin-header">
        <h1>✈ SkyFlow Admin</h1>
        <div className="admin-header-actions">
          <a href="/" target="_blank" rel="noreferrer" className="btn-secondary">
            Vezi site ↗
          </a>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Notificări */}
      {success && <div className="admin-flash success">{success}</div>}
      {error   && <div className="admin-flash error">{error}</div>}

      {/* Formular adaugă / editează */}
      {showForm ? (
        <div className="admin-form-card">
          <h2>{editingId ? "✏️ Editează ofertă" : "➕ Ofertă nouă"}</h2>
          <form onSubmit={handleSubmit} className="admin-form">

            <div className="form-row">
              <label>Destinație *</label>
              <input
                required
                placeholder="ex: Paris, Franța"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
              />
            </div>

            <div className="form-row">
              <label>Preț (lei) *</label>
              <input
                required
                type="number"
                placeholder="ex: 480"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div className="form-row">
              <label>Etichetă preț</label>
              <input
                placeholder="ex: 480 lei dus-întors (opțional)"
                value={form.price_label}
                onChange={(e) => setForm({ ...form, price_label: e.target.value })}
              />
            </div>

            <div className="form-row">
              <label>URL poză *</label>
              <input
                required
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              {form.image && (
                <img src={form.image} alt="preview" className="img-preview" />
              )}
            </div>

            <div className="form-row">
              <label>Link Skyscanner *</label>
              <input
                required
                placeholder="https://www.skyscanner.ro/..."
                value={form.skyscanner_url}
                onChange={(e) => setForm({ ...form, skyscanner_url: e.target.value })}
              />
              {form.skyscanner_url && (
                <a
                  href={form.skyscanner_url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-preview"
                >
                  Testează link ↗
                </a>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Salvează" : "Adaugă ofertă"}
              </button>
              <button type="button" className="btn-secondary" onClick={cancelForm}>
                Anulează
              </button>
            </div>

          </form>
        </div>
      ) : (
        <div className="admin-toolbar">
          <span>{flights.length} oferte active</span>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Adaugă ofertă
          </button>
        </div>
      )}

      {/* Lista oferte */}
      {loading ? (
        <p className="admin-loading">Se încarcă...</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Poză</th>
                <th>Destinație</th>
                <th>Preț</th>
                <th>Link Skyscanner</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.id}>
                  <td>
                    <img src={f.image} alt={f.destination} className="table-thumb" />
                  </td>
                  <td>
                    <strong>{f.destination}</strong>
                    <br />
                    <small>din {f.origin}</small>
                  </td>
                  <td>{f.price_label}</td>
                  <td>
                    <a
                      href={f.skyscanner_url}
                      target="_blank"
                      rel="noreferrer"
                      className="sky-link"
                    >
                      Skyscanner ↗
                    </a>
                  </td>
                  <td className="td-actions">
                    <button className="btn-edit" onClick={() => startEdit(f)}>
                      Editează
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(f.id)}>
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
