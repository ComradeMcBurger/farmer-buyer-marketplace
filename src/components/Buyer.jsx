import { useState } from "react";
import { inr } from "../data";

function BidCard({ l, t, onBid }) {
  const [amt, setAmt] = useState("");
  const [err, setErr] = useState("");
  const top = l.bids.length ? Math.max(...l.bids.map((b) => b.amt)) : 0;
  const submit = (e) => {
    e.preventDefault();
    if (!+amt || +amt < l.min) return setErr(t.errbid + l.min);
    onBid(l.id, +amt);
    setAmt(""); setErr("");
  };
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        <strong>{t.crops[l.crop]} · {l.qty} q · {l.loc}</strong>
        <span className="tag">{t.min}: {inr(l.min)}</span>
      </div>
      {top ? <div className="up">{t.bids}: {l.bids.length} · {inr(top)}</div>
           : <div style={{ color: "var(--mute)" }}>{t.nobids}</div>}
      <form style={{ marginTop: 10 }} onSubmit={submit}>
        <label>{t.yourbid}<input type="number" min="1" value={amt} onChange={(e) => setAmt(e.target.value)} /></label>
        <label>&nbsp;<button className="btn" type="submit">{t.bid}</button></label>
      </form>
      <div className="msg" role="alert">{err}</div>
    </div>
  );
}

export default function Buyer({ t, listings, onBid }) {
  const open = listings.filter((l) => !l.sold);
  if (!open.length) return <div className="card">{t.none}</div>;
  return open.map((l) => <BidCard key={l.id} l={l} t={t} onBid={onBid} />);
}
