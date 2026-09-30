# Custom domain — Render steps (blocked until Derek provides a domain)

**Status:** Waiting for Derek to name a domain. Do **not** buy a domain or change DNS without an explicit domain from Derek.

Live today: https://my-portfolio-422m.onrender.com  
Render static service: `srv-daf6urou01pc73945re0`  
Root dir: `ai-tech-portfolio` · Publish: `dist`

## When Derek provides a domain (example: `derekfwanten.com`)

1. In [Render Dashboard → derekfwanten.onrender.com → Settings → Custom Domains](https://dashboard.render.com/static/srv-daf6urou01pc73945re0), add the domain (and `www` if desired).
2. At the DNS provider, create the records Render shows (typically):
   - **Apex:** `A` / `ALIAS` / `ANAME` to Render’s target, **or**
   - **www:** `CNAME` to `my-portfolio-422m.onrender.com` (or the hostname Render lists).
3. Wait for TLS provisioning (Render issues the cert automatically).
4. Update site meta to the new origin:
   - `ai-tech-portfolio/index.html` — `canonical`, `og:url`, `og:image`, `twitter:image`
5. Commit + push; verify the custom domain serves HTTPS and OG tags resolve.

## Not done automatically

- Domain purchase
- Registrar / DNS changes
- Pointing an existing domain without Derek’s confirmation
