"use client";
import { useState } from "react";
export default function DashboardClient({ slug, name, dustUrl, isAuthenticated: initialAuth }) {
  const [authenticated, setAuthenticated] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleLogin(e) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ slug, password }) });
      if (res.ok) setAuthenticated(true);
      else { const data = await res.json(); setError(data.error || "Mot de passe incorrect"); }
    } catch { setError("Erreur de connexion"); } finally { setLoading(false); }
  }
  if (!authenticated) {
    return (
      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",fontFamily:"system-ui,sans-serif",background:"#0a0a0a",color:"#fafafa" }}>
        <form onSubmit={handleLogin} style={{ display:"flex",flexDirection:"column",gap:"1rem",width:"100%",maxWidth:"340px",padding:"2rem" }}>
          <h1 style={{ fontSize:"1.25rem",fontWeight:500,marginBottom:"0.5rem",textAlign:"center" }}>{name}</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" autoFocus style={{ padding:"0.75rem 1rem",background:"#1a1a1a",border:"1px solid #333",borderRadius:"8px",color:"#fafafa",fontSize:"0.95rem",outline:"none" }} />
          {error && <p style={{ color:"#ef4444",fontSize:"0.85rem",margin:0 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding:"0.75rem",background:"#fafafa",color:"#0a0a0a",border:"none",borderRadius:"8px",fontSize:"0.95rem",fontWeight:500,cursor:loading?"wait":"pointer",opacity:loading?0.7:1 }}>{loading ? "Connexion..." : "Acceder"}</button>
        </form>
      </div>
    );
  }
  return (
    <>
      <style>{`html,body{margin:0;padding:0;overflow:hidden;height:100%;width:100%}.dust-iframe-wrapper{position:fixed;top:0;left:0;width:100vw;height:100vh;overflow:hidden}.dust-iframe-wrapper iframe{width:100%;height:calc(100% + 80px);margin-top:-60px;border:none}`}</style>
      <div className="dust-iframe-wrapper"><iframe src={dustUrl} allow="clipboard-write" title={name} /></div>
    </>
  );
}
