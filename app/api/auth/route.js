import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dashboards from "../../../dashboards.config";
export async function POST(request) {
  try {
    const { slug, password } = await request.json();
    const dashboard = dashboards.find((d) => d.slug === slug);
    if (!dashboard) return NextResponse.json({ error: "Dashboard introuvable" }, { status: 404 });
    if (password !== dashboard.password) return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    const token = Buffer.from(slug + ":" + Date.now()).toString("base64");
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth_" + slug, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 86400, path: "/" });
    return response;
  } catch (e) { return NextResponse.json({ error: "Erreur serveur" }, { status: 500 }); }
}
