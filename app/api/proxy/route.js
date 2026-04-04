import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dashboards from "../../../dashboards.config";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Slug manquant" }, { status: 400 });
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth_" + slug);
  if (!authCookie) return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  const dashboard = dashboards.find((d) => d.slug === slug);
  if (!dashboard) return NextResponse.json({ error: "Dashboard introuvable" }, { status: 404 });
  return NextResponse.json({ dustUrl: dashboard.dustUrl, name: dashboard.name });
}
