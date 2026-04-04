const dashboards = [
  {
    slug: "dashboard-1",
    name: "Dashboard Alvo 1",
    dustUrl: "https://app.dust.tt/share/frame/d3505f75-402f-4f45-8188-cc266890c623",
    password: process.env.DASH1_PASSWORD || "changeme1",
    domain: "dash1.alvo.market",
  },
  {
    slug: "dashboard-2",
    name: "Dashboard Alvo 2",
    dustUrl: "https://app.dust.tt/share/frame/REMPLACE-PAR-TON-ID",
    password: process.env.DASH2_PASSWORD || "changeme2",
    domain: "dash2.alvo.market",
  },
];
module.exports = dashboards;
