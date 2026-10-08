# ecekayan.dev

Two pages, no build step.

- `index.html`: who am i
- `gifts.html`: what to get ece. The list lives in `gifts.js` (`GIFTS`), one line per gift.

## Running locally

```
python3 -m http.server 8000
```

## Publishing (GitHub Pages)

Pages deploys from `main`, root folder. The `CNAME` file sets the custom domain.

DNS (one-time):

1. In Squarespace Domains → ecekayan.dev → DNS, add:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www`: `ecekyn.github.io`
2. Back in Pages settings, tick "Enforce HTTPS" once the certificate is issued (`.dev` requires HTTPS).
