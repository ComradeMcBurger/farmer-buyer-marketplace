# Farmer–Buyer Direct Agricultural Marketplace

A multilingual (English/Marathi) web app that connects smallholder farmers and FPOs in Maharashtra directly with wholesale buyers, combining APMC mandi price visibility with a crop-listing and bidding marketplace.

## Status

| Module (from design doc) | Status |
|---|---|
| Multilingual UI/UX layer (English/Marathi, price cards) | Working |
| Price Analytics Service (today's price, 7-day trend, nearby-mandi comparison) | Working (sample data) |
| Marketplace & Listing Engine (post listing, place bid, accept bid) | Working (in-memory) |
| Mandi Data Aggregator (live APMC/Agmarknet feed) | In development |
| Auth & Profile Service (verified roles) | In development (Farmer/Buyer switch simulates roles) |
| Backend API + database (persistent listings and bids) | In development |

## Tech stack

React 18, Vite 5, plain CSS, inline SVG charts, GitHub Actions + GitHub Pages for deployment.

## Run locally

```bash
npm install
npm run dev
```

## Demo flow

1. Choose a crop on **Mandi prices** to see the 7-day trend and nearby-mandi comparison.
2. Switch language to मराठी.
3. As **Farmer**, post a listing. As **Buyer**, place a bid on it (must be at least the minimum price).
4. Switch back to Farmer and accept the best bid. The listing is marked sold.
