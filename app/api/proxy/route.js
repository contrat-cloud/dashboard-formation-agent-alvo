import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const dashboards = require("../../../dashboards.config");

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth_" + slug);
  if (!authCookie) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const dashboard = dashboards.find((d) => d.slug === slug);
  if (!dashboard) {
    return NextResponse.json({ error: "Dashboard introuvable" }, { status: 404 });
  }

  try {
    const res = await fetch(dashboard.dustUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    let html = await res.text();

    // Rewrite absolute Dust URLs to go through our proxy rewrites
    html = html.replace(/https:\/\/app\.dust\.tt/g, "/dp");
    html = html.replace(/https:\/\/viz\.dust\.tt/g, "/dv");

    // Inject CSS to hide Dust header/nav
    html = html.replace("</head>", '<style>header,nav,.header,[class*="Header"],[class*="TopBar"],[class*="topbar"],[class*="navbar"]{display:none!important}body{margin:0!important;padding:0!important}</style>\n</head>');

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Proxy error: " + err.message }, { status: 502 });
  }
}
