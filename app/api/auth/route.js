import { NextResponse } from "next/server";
const dashboards = require("../../../dashboards.config");

export async function POST(request) {
    try {
          const { slug, password } = await request.json();
          const dashboard = dashboards.find((d) => d.slug === slug);
          if (!dashboard) {
                  return NextResponse.json({ error: "Dashboard introuvable" }, { status: 404 });
          }
          if (password !== dashboard.password) {
                  return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
          }
          const token = Buffer.from(slug + ":" + Date.now() + ":" + Math.random()).toString("base64");
          const response = NextResponse.json({ success: true });
          response.cookies.set("auth_" + slug, token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  maxAge: 60 * 60 * 24,
                  path: "/",
          });
          return response;
    } catch (e) {
          return NextResponse.json({ error: "Requete invalide" }, { status: 400 });
    }
}
