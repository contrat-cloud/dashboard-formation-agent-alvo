import { NextResponse } from "next/server";
const domainMap = {
  "dash1.alvo.market": "dashboard-1",
  "dash2.alvo.market": "dashboard-2",
};
export function middleware(request) {
  const hostname = request.headers.get("host")?.split(":")[0];
  const pathname = request.nextUrl.pathname;
  if (hostname && domainMap[hostname] && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/d/" + domainMap[hostname];
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
