import { useState } from "react";
import { T } from "./i18n";
import { SEED } from "./data";
import Prices from "./components/Prices";
import Farmer from "./components/Farmer";
import Buyer from "./components/Buyer";

function Seg({ opts, cur, onPick, cls = "seg" }) {
  return (
    <div className={cls}>
      {opts.map(([k, label]) => (
        <button key={k} className={k === cur ? "on" : ""} onClick={() => onPick(k)}>{label}</button>
      ))}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [role, setRole] = useState("farmer");
  const [tab, setTab] = useState("prices");
  const [listings, setListings] = useState(SEED);
  const t = T[lang];

  const pickRole = (r) => { setRole(r); setTab("prices"); };
  const post = (l) => setListings([{ id: Date.now(), own: true, sold: null, bids: [], ...l }, ...listings]);
  const bid = (id, amt) =>
    setListings(listings.map((l) => l.id === id
      ? { ...l, bids: [...l.bids, { id: Date.now(), by: lang === "en" ? "You (Buyer)" : "तुम्ही (खरेदीदार)", amt }] } : l));
  const accept = (id, bidId) =>
    setListings(listings.map((l) => l.id === id ? { ...l, sold: l.bids.find((b) => b.id === bidId) } : l));

  return (
    <div className="wrap" lang={lang}>
      <header>
        <div><h1>{t.title}</h1><p className="sub">{t.sub}</p></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Seg opts={[["en", "English"], ["mr", "मराठी"]]} cur={lang} onPick={setLang} />
          <Seg opts={[["farmer", t.farmer], ["buyer", t.buyer]]} cur={role} onPick={pickRole} />
        </div>
      </header>
      <Seg cls="tabs" cur={tab} onPick={setTab}
        opts={[["prices", t.prices], role === "farmer" ? ["mine", t.mine] : ["browse", t.browse]]} />
      <main>
        {tab === "prices" && <Prices t={t} />}
        {tab === "mine" && <Farmer t={t} listings={listings} onPost={post} onAccept={accept} />}
        {tab === "browse" && <Buyer t={t} listings={listings} onBid={bid} />}
      </main>
      <p className="note">{t.note}</p>
    </div>
  );
}
