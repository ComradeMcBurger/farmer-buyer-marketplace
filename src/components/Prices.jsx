import { useState } from "react";
import { CROPS, MANDIS, price, series, inr } from "../data";
import TrendChart from "./TrendChart";

export default function Prices({ t }) {
  const [crop, setCrop] = useState("onion");
  const { p, today, change } = series(crop);
  const vals = MANDIS.map((_, i) => price(crop, i, 6));
  const mx = Math.max(...vals);
  return (
    <>
      <div className="chips">
        {CROPS.map((k) => (
          <button key={k} className={k === crop ? "on" : ""} onClick={() => setCrop(k)}>{t.crops[k]}</button>
        ))}
      </div>
      <div className="card">
        <div>{t.today} · {t.crops[crop]}</div>
        <div className="big">{inr(today)} <small>{t.unit}</small></div>
        <div className={change >= 0 ? "up" : "dn"}>{change >= 0 ? "▲ " : "▼ "}{Math.abs(change).toFixed(1)}%</div>
      </div>
      <div className="card"><h2>{t.trend}</h2><TrendChart p={p} t={t} /></div>
      <div className="card">
        <h2>{t.nearby}</h2>
        {MANDIS.map((m, i) => (
          <div className="row" key={m}>
            <span className="n">{t.mandis[m]}</span>
            <span className="bar"><i className={vals[i] === mx ? "best" : ""} style={{ width: `${Math.round((vals[i] / mx) * 100)}%` }} /></span>
            <span className="v">{inr(vals[i])}</span>
          </div>
        ))}
        <span className="tag">{t.best}: {t.mandis[MANDIS[vals.indexOf(mx)]]}</span>
      </div>
    </>
  );
}
