import Link from "next/link";
import dashboards from "../dashboards.config";

export default function HomePage() {
    return (
          <div style={{
            minHeight: "100vh", background: "#0a0a0a", color: "#fafafa",
            fontFamily: "system-ui, -apple-system, sans-serif",
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "80px 20px",
    }}>
{/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{
                  fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
          ALVO
            </div>
        <div style={{
                      fontSize: "0.85rem", color: "#666", marginTop: "0.25rem",
                      letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
          Academy
            </div>
            </div>

{/* Dashboard cards */}
      <div style={{
                display: "grid", gap: "1rem", width: "100%", maxWidth: "600px",
      }}>
{dashboards.map((d) => (
            <Link
                            key={d.slug}
            href={`/d/${d.slug}`}
            style={{
                            display: "block", padding: "1.5rem",
                            background: "#111", border: "1px solid #222",
                            borderRadius: "12px", textDecoration: "none",
                            color: "#fafafa", transition: "border-color 0.2s, transform 0.2s",
            }}
          >
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>{d.name}</div>
            <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
              Acces protege par mot de passe
                </div>
                </Link>
        ))}
          </div>

      <div style={{ marginTop: "3rem", fontSize: "0.75rem", color: "#333" }}>
        Alvo Academy — Portail prive
          </div>
          </div>
  );
}
