import dashboards from "../../../dashboards.config";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import DashboardClient from "./DashboardClient";

export function generateStaticParams() {
  return dashboards.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const dashboard = dashboards.find((d) => d.slug === params.slug);
  return { title: dashboard ? `${dashboard.name} — Alvo Academy` : "Alvo Academy" };
}

export default function DashboardPage({ params }) {
  const dashboard = dashboards.find((d) => d.slug === params.slug);
  if (!dashboard) notFound();

  const cookieStore = cookies();
  const isAuthenticated = !!cookieStore.get("auth_" + params.slug);

  return (
    <DashboardClient
      slug={params.slug}
      name={dashboard.name}
      dustUrl={dashboard.dustUrl}
      isAuthenticated={isAuthenticated}
    />
  );
}
