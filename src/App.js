import { useState, useMemo, useEffect, useRef } from "react";
import "./App.css";

// ✏️ EDIT HERE
const NAME = "Poorni";
const AGE = 24;
const IMG = ["images/photo1.jpg", "images/photo2.jpg"];
const WISHES = [
  { e: ["🫂"], t: "Machaa", d: "You’re the one person who makes every ordinary day feel special. Thank you for always being there." },
  { e: ["😊", "🧸"], t: "Your Smile", d: "Never lose that beautiful smile. It brightens every room and every heart around you." },
  { e: ["🧡"], t: "Your Dreams", d: "May every dream you hold close come true this year, bigger and better than you imagined." },
  { e: ["🐼", "😘"], t: "Our Friendship", d: "Here’s to endless memories, silly fights, big laughs and a lifetime of friendship." },
];

const COLORS = ["#f7e08a", "#c9962b", "#fff3b8", "#e8b4b8", "#ffffff"];

function Confetti({ n = 90 }) {
  const items = useMemo(() => Array.from({ length: n }, () => ({
    l: Math.random() * 100, d: Math.random() * 2.5, s: 6 + Math.random() * 8,
    t: 3 + Math.random() * 3, c: COLORS[Math.floor(Math.random() * COLORS.length)],
    r: Math.random() > 0.5 ? "50%" : "2px",
  })), [n]);
  return (
    <div className="confetti">
      {items.map((p, i) => (
        <i key={i} style={{ left: p.l + "%", width: p.s, height: p.s * 1.5, background: p.c, borderRadius: p.r, animationDelay: p.d + "s", animationDuration: p.t + "s" }} />
      ))}
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${on ? "in" : ""} ${className}`}>{children}</div>;
}

function Floaties() {
  const list = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    e: ["🧸", "🐼", "🎈", "💛", "✨", "🎀", "🫂"][i % 7], x: Math.random() * 92, s: 22 + Math.random() * 22, d: Math.random() * 10, t: 9 + Math.random() * 8,
  })), []);
  return <div className="floaties">{list.map((p, i) => <span key={i} style={{ left: p.x + "%", fontSize: p.s, animationDelay: p.d + "s", animationDuration: p.t + "s" }}>{p.e}</span>)}</div>;
}

function Dust() {
  const dots = useMemo(() => Array.from({ length: 40 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100, s: 2 + Math.random() * 4, d: Math.random() * 5,
  })), []);
  return <div className="dust">{dots.map((p, i) => <b key={i} style={{ left: p.x + "%", top: p.y + "%", width: p.s, height: p.s, animationDelay: p.d + "s" }} />)}</div>;
}

export default function App() {
  const [stage, setStage] = useState("box");
  const [wish, setWish] = useState(0);

  const open = () => {
    if (stage !== "box") return;
    setStage("opening");
    setTimeout(() => { setStage("show"); window.scrollTo(0, 0); }, 1800);
  };

  if (stage !== "show") {
    return (
      <div className="stage">
        <Dust />
        <p className="small">A special surprise for</p>
        <h1 className="script gold">{NAME}</h1>
        <div className={`box ${stage === "opening" ? "open" : ""}`} onClick={open}>
          <div className="glow" />
          <div className="lid"><span className="bow" /><span className="rib-v" /></div>
          <div className="body"><span className="rib-v" /></div>
        </div>
        <p className="small pulse">{stage === "box" ? "Tap the gift box to open ✨" : "Opening…"}</p>
        {stage === "opening" && <div className="flash" />}
      </div>
    );
  }

  return (
    <div className="page">
      <Confetti key={wish} n={wish ? 120 : 140} />
      <Floaties />
      <Dust />
      <section className="stage hero">
        <p className="small slide">✦ Celebrating ✦</p>
        <h2 className="title gold">HAPPY BIRTHDAY</h2>
        <h1 className="script gold big">{NAME}</h1>
        <div className="age"><span className="gold">{AGE}</span><small>th Birthday</small></div>
        <p className="small pulse">Scroll down ↓</p>
      </section>

      <section className="photos">
        {IMG.map((src, i) => (
          <Reveal key={i} className={i ? "right" : "left"}>
            <div className="frame"><img src={src} alt={NAME + " and friend"} /></div>
          </Reveal>
        ))}
      </section>

      <section className="wishes">
        <Reveal><h3 className="gold title2">Wishes From My Heart</h3></Reveal>
        {WISHES.map((w, i) => (
          <Reveal key={i}><div className="card"><div className="badge">{w.e.map((x, j) => <span key={j}>{x}</span>)}</div><h4>{w.t}</h4><p>{w.d}</p></div></Reveal>
        ))}
      </section>

      <section className="stage finale">
        <Reveal>
          <p className="small">Make a wish…</p>
          <h2 className="script gold big">Happy {AGE}th, {NAME}! 🎂</h2>
          <p className="msg">May this year shine as bright as you do. Stay happy, stay blessed, stay my best friend forever.</p>
          <button className="btn" onClick={() => setWish(wish + 1)}>🎉 Celebrate Again</button>
        </Reveal>
      </section>
    </div>
  );
}
