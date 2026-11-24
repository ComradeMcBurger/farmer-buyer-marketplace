import { useState } from "react";
import { CROPS, inr } from "../data";

export default function Farmer({ t, listings, onPost, onAccept }) {
  const [f, setF] = useState({ crop: "onion", qty: "", loc: "", min: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const qty = +f.qty, min = +f.min;
    if (!qty || !min || !f.loc.trim()) return setErr(t.errfill);
    onPost({ crop: f.crop, qty, loc: f.loc.trim(), min });
    setErr("");
    setF({ ...f, qty: "", loc: "", min: "" });
  };
  return (
    <>
      <div className="card">
        <h2>{t.newl}</h2>
        <form onSubmit={submit}>
          <label>{t.crop}
            <select value={f.crop} onChange={set("crop")}>
              {CROPS.map((k) => <option key={k} value={k}>{t.crops[k]}</option>)}
            </select>
          </label>
          <label>{t.qty}<input type="number" min="1" value={f.qty} onChange={set("qty")} /></label>
          <label>{t.loc}<input type="text" value={f.loc} onChange={set("loc")} /></label>
          <label>{t.min}<input type="number" min="1" value={f.min} onChange={set("min")} /></label>
          <label>&nbsp;<button className="btn y" type="submit">{t.post}</button></label>
        </form>
        <div className="msg" role="alert">{err}</div>
      </div>
      {listings.filter((l) => l.own).map((l) => (
        <div className="card" key={l.id}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            <strong>{t.crops[l.crop]} · {l.qty} q · {l.loc}</strong>
            <span className={"tag" + (l.sold ? " sold" : "")}>{l.sold ? t.sold : t.open}</span>
          </div>
          <div style={{ color: "var(--mute)" }}>{t.min}: {inr(l.min)}</div>
          {l.sold ? (
            <div className="up" style={{ marginTop: 6 }}>{t.soldto}: {l.sold.by} — {inr(l.sold.amt)}</div>
          ) : !l.bids.length ? (
            <div style={{ color: "var(--mute)", marginTop: 6 }}>{t.nobids}</div>
          ) : (
            <>
              <div style={{ marginTop: 8 }}><strong>{t.bids} ({l.bids.length})</strong></div>
              {[...l.bids].sort((a, b) => b.amt - a.amt).map((b) => (
                <div className="bid" key={b.id}>
                  <span>{b.by} — <strong>{inr(b.amt)}</strong></span>
                  <button className="btn" onClick={() => onAccept(l.id, b.id)}>{t.accept}</button>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </>
  );
}
