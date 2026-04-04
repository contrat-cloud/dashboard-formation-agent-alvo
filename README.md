# Alvo Academy

Portail de dashboards Dust.tt avec branding Alvo et protection par mot de passe.

## Architecture

- Next.js 14 App Router
- Proxy server-side avec fetch interceptor pour contourner CORS
- Authentification par cookie (24h TTL)
- Branding Alvo personnalise

## Deploiement

1. Push sur GitHub
2. Vercel deploie automatiquement
3. Variables d'environnement: DASH1_PASSWORD
