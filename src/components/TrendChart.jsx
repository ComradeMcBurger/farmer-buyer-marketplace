export default function TrendChart({ p, t }) {
  const w = 600, h = 200, pad = 34;
  const mn = Math.min(...p) - 30, mx = Math.max(...p) + 30;
  const pts = p.map((v, i) => [pad + (i * (w - 2 * pad)) / 6, h - pad - ((v - mn) / (mx - mn)) * (h - 2 * pad)]);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={t.trend}>
      <polyline fill="none" stroke="var(--g)" strokeWidth="3" points={pts.map((q) => q.join(",")).join(" ")} />
      {pts.map((q, i) => (
        <g key={i}>
          <circle cx={q[0]} cy={q[1]} r="5" fill={i === 6 ? "var(--y)" : "var(--g)"} />
          <text x={q[0]} y={h - 10} textAnchor="middle" fontSize="14" fill="var(--mute)">{t.d[i]}</text>
          {(i === 0 || i === 6) && (
            <text x={q[0]} y={q[1] - 10} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">{p[i]}</text>
          )}
        </g>
      ))}
    </svg>
  );
}
