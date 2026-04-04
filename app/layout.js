export const metadata = {
  title: "Alvo Academy",
  description: "Portail de dashboards Alvo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, background: "#0a0a0a" }}>
        {children}
      </body>
    </html>
  );
}
