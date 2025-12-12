# Accessibility Value Calculator (static)

A single-page calculator that estimates monthly revenue unlocked by making an eCommerce site accessible. Uses UK disability prevalence (DfE “How many people?”) and the Click-Away Pound stat that 69% of disabled customers leave inaccessible sites.

## Run locally

```bash
cd /Users/gareth.joyce/Projects/value-gained
npx serve .
# or use any static server: python3 -m http.server 4173
```

Then open http://localhost:4173 or the port shown.

## Deploy (free-friendly options)

- Netlify: drag-drop or `netlify deploy --dir .` for previews; `netlify deploy --prod` for prod.
- Vercel: `vercel .` (framework = “Other”, output dir = `.`, no build step).
- GitHub Pages: push to `main`, enable Pages for the repo root (static).

### Vercel config

- `vercel.json` is included for static hosting with SPA-style routing. Key bits:
  - `cleanUrls: true`
  - Fallback route to `index.html` for client-side routing:
    - `{ "handle": "filesystem" }`
    - `{ "src": "/(.*)", "dest": "/index.html" }`

## Inputs and method

- Inputs: average visitors/month, orders/month, average order value (£).
- Network factor: friends/family influence multiplier (default 1.5×).
- Baseline conversion = orders ÷ visitors (capped at 100%).
- For each impairment prevalence per 10k, we estimate disabled visitors, apply a network factor to capture influenced friends/family, assume 69% currently click away on inaccessible experiences, and apply the uplift slider to decide what share of that 69% you reclaim. Regained customers convert at the baseline rate.
- Revenue uplift = regained orders × AOV, formatted in the chosen currency (GBP/USD/EUR).

## Data sources

- DfE Accessibility & Inclusive Design Manual “How many people?” (UK prevalence): https://accessibility.education.gov.uk/app/how-many-people/10000
- Click-Away Pound (69% leave inaccessible sites): https://clickawaypound.com/

## Next improvements

- Add segmentation (mobile vs desktop), currency switcher, and PDF/CSV export.
- Add sensitivity slider for conversion uplift scenarios.
- Add testimonial/CTA section plus embed for booking an audit.

