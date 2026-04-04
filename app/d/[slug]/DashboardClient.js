"use client";
import { useState } from "react";

export default function DashboardClient({ slug, name, isAuthenticated: initialAuth }) {
    const [authenticated, setAuthenticated] = useState(initialAuth);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
                const res = await fetch("/api/auth", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ slug, password }),
                });
                if (res.ok) {
                          setAuthenticated(true);
                } else {
                          const data = await res.json();
                          setError(data.error || "Mot de passe incorrect");
                }
        } catch {
                setError("Erreur de connexion");
        } finally {
                setLoading(false);
        }
  }

  if (!authenticated) {
        return (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif",
                  background: "#0a0a0a", color: "#fafafa",
        }}>
          <form onSubmit={handleLogin} style={{
              display: "flex", flexDirection: "column", gap: "1rem",
              width: "100%", maxWidth: "380px", padding: "2.5rem",
              background: "#111", borderRadius: "16px", border: "1px solid #222",
  }}>
{/* Alvo Logo */}
          <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            <div style={{
                          fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em",
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
              ALVO
                </div>
            <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.25rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Academy
                </div>
                </div>

          <h1 style={{
                            fontSize: "1.1rem", fontWeight: 500, textAlign: "center",
                            color: "#ccc", margin: "0.5rem 0",
              }}>
{name}
</h1>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            autoFocus
            style={{
                            padding: "0.8rem 1rem", background: "#1a1a1a",
                            border: "1px solid #333", borderRadius: "10px",
                            color: "#fafafa", fontSize: "0.95rem", outline: "none",
                            transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#333")}
          />

{error && (
              <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: 0, textAlign: "center" }}>
{error}
</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
                            padding: "0.8rem",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            color: "#fff", border: "none", borderRadius: "10px",
                            fontSize: "0.95rem", fontWeight: 600,
                            cursor: loading ? "wait" : "pointer",
                            opacity: loading ? 0.7 : 1,
                            transition: "opacity 0.2s",
            }}
          >
{loading ? "Connexion..." : "Acceder"}
</button>
  </form>
  </div>
    );
  }

                  return (
                        <>
                          <style>{`
                                  html, body { margin: 0; padding: 0; overflow: hidden; height: 100%; width: 100%; background: #0a0a0a; }
                                          .alvo-topbar {
                                                    position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
                                                              height: 48px; background: #0a0a0a; border-bottom: 1px solid #1a1a1a;
                                                                        display: flex; align-items: center; padding: 0 20px;
                                                                                  font-family: system-ui, -apple-system, sans-serif;
                                                                                          }
                                                                                                  .alvo-logo {
                                                                                                            font-size: 1rem; font-weight: 700; letter-spacing: -0.02em;
                                                                                                                      background: linear-gradient(135deg, #6366f1, #8b5cf6);
                                                                                                                                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                                                                                                                                        }
                                                                                                                                                .alvo-sep { color: #333; margin: 0 12px; font-weight: 300; }
                                                                                                                                                        .alvo-title { color: #999; font-size: 0.85rem; font-weight: 400; }
                                                                                                                                                                .dust-frame {
                                                                                                                                                                          position: fixed; top: 48px; left: 0; width: 100vw;
                                                                                                                                                                                    height: calc(100vh - 48px); overflow: hidden;
                                                                                                                                                                                            }
                                                                                                                                                                                                    .dust-frame iframe { width: 100%; height: 100%; border: none; }
                                                                                                                                                                                                          `}</style>

      <div className="alvo-topbar">
                            <span className="alvo-logo">ALVO</span>
        <span className="alvo-sep">|</span>
        <span className="alvo-title">{name}</span>
                    </div>

      <div className="dust-frame">
                            <iframe
          src={"/api/proxy?slug=" + slug}
          allow="clipboard-write"
          title={name}
        />
            </div>
            </>
  );
}
