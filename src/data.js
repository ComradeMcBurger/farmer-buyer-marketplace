// Sample data standing in for the APMC/Agmarknet feed (Mandi Data Aggregator, under development)
export const BASE = { onion: 1850, tomato: 1500, soybean: 4600, cotton: 7000, tur: 7800 };
export const CROPS = Object.keys(BASE);
export const MANDIS = ["Lasalgaon", "Pune", "Nashik", "Nagpur", "Latur"];
const OFF = [-0.03, 0.04, 0, 0.025, -0.015];

export function price(crop, mandi, day) {
  const ci = CROPS.indexOf(crop);
  const v = BASE[crop] * (1 + OFF[mandi]) * (1 + 0.035 * Math.sin(day * 1.1 + ci * 1.7 + mandi * 0.9));
  return Math.round(v / 10) * 10;
}
// Price Analytics: 7-day series, today's price, % change
export function series(crop) {
  const p = Array.from({ length: 7 }, (_, i) => price(crop, 0, i));
  return { p, today: p[6], change: ((p[6] - p[0]) / p[0]) * 100 };
}
export const inr = (n) => "₹" + n.toLocaleString("en-IN");

export const SEED = [
  { id: 1, crop: "onion", qty: 40, loc: "Nashik", min: 1800, own: true, sold: null,
    bids: [{ id: 11, by: "Patil Traders", amt: 1840 }, { id: 12, by: "Agro Foods Pvt Ltd", amt: 1910 }] },
  { id: 2, crop: "soybean", qty: 25, loc: "Latur", min: 4500, own: false, sold: null, bids: [] },
  { id: 3, crop: "tomato", qty: 12, loc: "Pune", min: 1450, own: false, sold: null,
    bids: [{ id: 13, by: "Fresh Mart", amt: 1500 }] },
];
