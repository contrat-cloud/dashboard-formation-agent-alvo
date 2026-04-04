import dashboards from "../dashboards.config";
import { redirect } from "next/navigation";
export default function Home() {
  if (dashboards.length === 1) redirect("/d/" + dashboards[0].slug);
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",fontFamily:"system-ui,sans-serif",background:"#0a0a0a",color:"#fafafa" }}>
      <h1 style={{ fontSize:"1.5rem",marginBottom:"2rem",fontWeight:500 }}>Dashboards</h1>
      <div style={{ display:"flex",flexDirection:"column",gap:"0.75rem",width:"100%",maxWidth:"320px" }}>
        {dashboards.map((d) => (
          <a key={d.slug} href={"/d/"+d.slug} style={{ padding:"0.875rem 1.25rem",background:"#1a1a1a",border:"1px solid #333",borderRadius:"8px",color:"#fafafa",textDecoration:"none",fontSize:"0.95rem" }}>{d.name}</a>
        ))}
      </div>
    </div>
  );
}
