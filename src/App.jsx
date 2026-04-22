
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Achievements", "Contact"];

const PROJECTS = [
  {
    title: "Vrikshami",
    icon: "🌱",
    subtitle: "Plant Adoption Platform",
    stack: ["Node.js", "Express.js", "MongoDB", "Razorpay"],
    desc: "NGO donation & tree adoption platform with referral rewards, certificate generation, and secure payment integration.",
    problem: "NGOs lacked a digital platform for transparent donations and tree adoptions.",
    solution: "Built end-to-end REST API with Razorpay payment orchestration and auto-generated PDF certificates.",
    impact: ["Scalable REST APIs supporting 500+ simulated requests/sec", "30% faster queries via MongoDB indexing", "Clean modular architecture for easy scaling"],
    highlights: ["Scalable REST APIs", "Payment workflow orchestration", "Clean architecture"],
    github: "https://github.com/rajpohekar/Vrikshami",
    live: null,
    color: "#00C896",
  },
  {
    title: "TicketWise",
    icon: "🎫",
    subtitle: "AI-Powered Ticket System",
    stack: ["Node.js", "Express.js", "MongoDB", "Inngest", "Gemini API", "JWT"],
    desc: "Intelligent ticket management with AI-based categorization, RBAC, and event-driven background processing.",
    problem: "Manual ticket routing was slow and error-prone across multi-role teams.",
    solution: "Integrated Gemini AI for auto-categorization + Inngest for event-driven async processing with JWT-based RBAC.",
    impact: ["AI categorization reducing manual triage by ~70%", "Event-driven architecture for non-blocking workflows", "Secure RBAC with JWT — zero unauthorized access in testing"],
    highlights: ["AI ticket categorization", "Role-based access control", "Event-driven backend"],
    github: "https://github.com/rajpohekar/TicketWise",
    live: null,
    color: "#00F5FF",
    featured: true,
  }
];

const SKILLS = {
  Languages: ["C++", "C", "JavaScript", "SQL", "Python"],
  "Web & Frameworks": ["Node.js", "Express.js", "EJS", "HTML", "CSS"],
  "Databases & Tools": ["MongoDB", "Git", "GitHub", "Razorpay API", "Gemini API"],
  "CS Fundamentals": ["DSA", "DBMS", "OS", "OOP", "SDLC", "System Design"],
};

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Techathon 2.0", desc: "Top 15 Finalist – National Hackathon" },
  { icon: "🎖️", title: "NCC 'A' Certificate", desc: "Bravo Grade – National Cadet Corps" },
  { icon: "🏏", title: "District Cricket League", desc: "Winner – 2 consecutive times" },
  { icon: "⚡", title: "Amravati Division", desc: "Trials Qualified – Cricket" },
  { icon: "🌐", title: "NSS Coordinator", desc: "Activity Coordinator – PICT NSS" },
  { icon: "💡", title: "LeetCode", desc: "270+ Problems Solved" },
];

const VALUE_PROPS = [
  { icon: "🏗️", title: "Strong Backend System Design", desc: "Experienced in REST APIs, auth systems, payment flows, and event-driven architectures built for scale." },
  { icon: "🧹", title: "Clean & Scalable Code", desc: "Modular architecture, separation of concerns, and maintainable codebases — not just working code." },
  { icon: "⚡", title: "Fast Learner — ML + Backend", desc: "Bridged AI (Gemini, Q-learning) with backend systems in real projects, not just tutorials." },
  { icon: "🧩", title: "Proven Problem Solver", desc: "270+ DSA problems, National Hackathon Finalist, and research-level cryptography exposure." },
];

// Particle background — disabled on mobile
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.8,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,245,255,0.45)"; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [isMobile]);
  if (isMobile) return null;
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />;
}

function TypingText({ texts }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) { setDisplay(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
        else { setTimeout(() => setDeleting(true), 1800); }
      } else {
        if (charIdx > 0) { setDisplay(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
        else { setDeleting(false); setIdx(i => (i + 1) % texts.length); }
      }
    }, deleting ? 40 : 70);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);
  return <span style={{ color: "#00F5FF" }}>{display}<span style={{ animation: "blink 1s steps(1) infinite", color: "#00F5FF" }}>|</span></span>;
}

function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); if (ref.current) observer.unobserve(ref.current); }
    }, { threshold: 0, rootMargin: "100px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{
      maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: "opacity 0.65s ease-out, transform 0.65s ease-out", ...style,
    }}>{children}</section>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2.5rem" }}>
      <span style={{ color: "#00F5FF", fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #00F5FF33, transparent)" }} />
    </div>
  );
}

function Tag({ children, color = "#00F5FF" }) {
  return (
    <span style={{ background: color + "18", border: `1px solid ${color}44`, color, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 0.5 }}>
      {children}
    </span>
  );
}

export default function Portfolio() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("rajpohekar21@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: "8c869c42-680e-4493-a819-8a8ef6a07b2a", name: formState.name, email: formState.email, message: formState.message, subject: "New Contact from Portfolio!" }),
      });
      const result = await response.json();
      if (result.success) { setFormSent(true); setFormState({ name: "", email: "", message: "" }); }
      else { alert("Something went wrong. Please try again or email me directly."); }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#0B0F19", color: "#E2E8F0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .nav-link { cursor: pointer; color: #94A3B8; font-size: 14px; font-family: 'Space Mono', monospace; transition: color 0.2s; }
        .nav-link:hover { color: #00F5FF; }
        .btn-primary { background: transparent; border: 1.5px solid #00F5FF; color: #00F5FF; padding: 10px 24px; border-radius: 8px; font-family: 'Space Mono', monospace; font-size: 13px; cursor: pointer; transition: all 0.2s; letter-spacing: 1px; }
        .btn-primary:hover { background: #00F5FF18; box-shadow: 0 0 20px #00F5FF44; transform: translateY(-2px); }
        .btn-ghost { background: transparent; border: 1.5px solid #334155; color: #94A3B8; padding: 10px 24px; border-radius: 8px; font-family: 'Space Mono', monospace; font-size: 13px; cursor: pointer; transition: all 0.2s; letter-spacing: 1px; }
        .btn-ghost:hover { border-color: #64748B; color: #CBD5E1; transform: translateY(-2px); }
        .project-card { background: #0F1629; border: 1px solid #1E293B; border-radius: 16px; padding: 1.75rem; transition: all 0.3s; position: relative; overflow: hidden; }
        .project-card:hover { transform: translateY(-6px); border-color: #00F5FF44; box-shadow: 0 20px 60px #00F5FF0D; }
        .skill-pill { background: #0F1629; border: 1px solid #1E293B; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-family: 'Space Mono', monospace; color: #94A3B8; transition: all 0.2s; cursor: default; }
        .skill-pill:hover { border-color: #00F5FF66; color: #00F5FF; background: #00F5FF0A; }
        .achievement-card { background: #0F1629; border: 1px solid #1E293B; border-radius: 12px; padding: 1.25rem; transition: all 0.25s; }
        .achievement-card:hover { border-color: #00F5FF33; transform: translateY(-3px); }
        .value-card { background: #0F1629; border: 1px solid #1E293B; border-radius: 14px; padding: 1.5rem; transition: all 0.3s; }
        .value-card:hover { border-color: #00F5FF44; transform: translateY(-4px); box-shadow: 0 12px 40px #00F5FF09; }
        .input-field { background: #0F1629; border: 1px solid #1E293B; border-radius: 10px; padding: 12px 16px; color: #E2E8F0; font-size: 14px; font-family: 'DM Sans', sans-serif; width: 100%; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: #00F5FF66; }
        .coding-card { background: #0F1629; border: 1px solid #1E293B; border-radius: 12px; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; transition: all 0.25s; }
        .coding-card:hover { border-color: #00F5FF44; box-shadow: 0 8px 30px #00F5FF0A; }
        .social-icon { width: 44px; height: 44px; border: 1px solid #1E293B; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; background: #0F1629; color: #64748B; font-size: 18px; text-decoration: none; }
        .social-icon:hover { border-color: #00F5FF66; color: #00F5FF; background: #00F5FF0A; }
        .impact-badge { display: inline-flex; align-items: center; gap: 6px; background: #00C89618; border: 1px solid #00C89644; border-radius: 6px; padding: "4px 10px"; font-size: 12px; color: #00C896; font-family: 'Space Mono', monospace; }
        .hamburger { display: none; background: none; border: 1px solid #1E293B; color: #94A3B8; font-size: 20px; cursor: pointer; border-radius: 8px; padding: 6px 10px; transition: all 0.2s; }
        .hamburger:hover { border-color: #00F5FF66; color: #00F5FF; }
        .mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(11,15,25,0.98); border-bottom: 1px solid #1E293B; backdrop-filter: blur(16px); z-index: 99; padding: 1.5rem; flex-direction: column; gap: 20px; }
        .mobile-menu.open { display: flex; animation: fadeSlideUp 0.25s ease-out; }
        .sticky-cta { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 90; padding: 12px 20px; background: rgba(11,15,25,0.97); border-top: 1px solid #1E293B; backdrop-filter: blur(12px); gap: 12px; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: block !important; }
          .sticky-cta { display: flex !important; }
          .hero-grid { flex-direction: column-reverse !important; text-align: center; }
          .hero-grid > div:first-child { align-items: center !important; }
          .hero-btns { justify-content: center !important; }
          .hero-stats { justify-content: center !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .exp-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .section-pad { padding-bottom: 7rem !important; }
          .hero-title { font-size: clamp(2.4rem, 10vw, 4rem) !important; }
        }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0B0F19; } ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 2px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: navScrolled ? "rgba(11,15,25,0.96)" : "transparent", borderBottom: navScrolled ? "1px solid #1E293B" : "1px solid transparent", backdropFilter: navScrolled ? "blur(12px)" : "none", transition: "all 0.3s" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#00F5FF", letterSpacing: -0.5 }}>
          RP<span style={{ color: "#E2E8F0" }}>.</span>
        </span>
        <div className="nav-links-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</span>)}
          <button className="btn-primary" onClick={() => scrollTo("Contact")} style={{ padding: "8px 20px" }}>Hire Me</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>{menuOpen ? "✕" : "☰"}</button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(l => <span key={l} className="nav-link" style={{ fontSize: 16 }} onClick={() => scrollTo(l)}>{l}</span>)}
        <button className="btn-primary" onClick={() => scrollTo("Contact")}>Hire Me</button>
      </div>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <ParticleCanvas />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 70% 50%, #00F5FF08 0%, transparent 70%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", paddingTop: 80, width: "100%" }}>

          {/* Quick Impact Summary Banner */}
          <div style={{ marginBottom: 28, padding: "10px 18px", background: "#00F5FF0D", border: "1px solid #00F5FF33", borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C896", boxShadow: "0 0 8px #00C896", flexShrink: 0, animation: "float 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#00F5FF", letterSpacing: 1 }}>
              Available for Backend Roles &amp; Internships
            </span>
          </div>

          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap-reverse", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 460px", display: "flex", flexDirection: "column" }}>
              <h1 className="hero-title" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem,7vw,5rem)", lineHeight: 1.05, marginBottom: 16, letterSpacing: -1 }}>
                Hi, I'm <span style={{ color: "#00F5FF", textShadow: "0 0 40px #00F5FF55" }}>Raj Pohekar</span>
              </h1>

              <div style={{ fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#94A3B8", marginBottom: 20, fontWeight: 400, minHeight: 36 }}>
                <TypingText texts={["Full-Stack Developer", "Backend Engineer", "Competitive Programmer", "Problem Solver"]} />
              </div>

              {/* Quick Impact Summary */}
              <div style={{ background: "#0F1629", border: "1px solid #1E293B", borderRadius: 12, padding: "16px 20px", marginBottom: 28 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Quick Impact Summary</div>
                {[
                  "Built scalable APIs handling payments & AI workflows",
                  "270+ DSA problems · Hackathon Top-15 Finalist",
                  "Blockchain & Cryptography Research (Springer Published)",
                ].map((line, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0", fontSize: 14, color: "#94A3B8", lineHeight: 1.5 }}>
                    <span style={{ color: "#00F5FF", fontSize: 10, flexShrink: 0 }}>◆</span>
                    {line}
                  </div>
                ))}
              </div>

              <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
                <button className="btn-primary" onClick={() => scrollTo("Projects")}>View My Work →</button>
                <a href="https://drive.google.com/file/d/1vC2NMlhhn94UE9_3PJtNHJ4JXwfUm8_v/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <button className="btn-ghost">Download Resume</button>
                </a>
                <button className="btn-ghost" onClick={() => scrollTo("Contact")}>Contact Me</button>
              </div>

              <div className="hero-stats" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[{ label: "LeetCode", value: "270+ solved" }, { label: "CodeChef", value: "2⭐ · 1531" }, { label: "CGPA", value: "8.65 / 10" }].map(s => (
                  <div key={s.label} style={{ background: "#0F1629", border: "1px solid #1E293B", borderRadius: 10, padding: "10px 18px", display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 10, color: "#475569", fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</span>
                    <span style={{ fontSize: 14, color: "#E2E8F0", fontWeight: 600 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: "1 1 260px", display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <img
                src="https://res.cloudinary.com/dbcwka2ey/image/upload/v1776864774/1001183869.jpg_tosjvi.jpg"
                alt="Raj Pohekar"
                // style={{ width: "clamp(180px, 30vw, 300px)", height: "clamp(180px, 30vw, 300px)", borderRadius: "0", objectFit: "cover", border: "2px solid #00F5FF", boxShadow: "0 0 40px #00F5FF44", animation: "float 6s ease-in-out infinite" }}
                style={{
                  width: "250px",
                  height: "300px",
                  borderRadius: "0",
                  objectFit: "cover",
                  border: "2px solid #00F5FF",
                  boxShadow: "0 0 40px #00F5FF44",
                  animation: "float 6s ease-in-out infinite"
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <div style={{ width: 24, height: 40, border: "1.5px solid #1E293B", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 3, height: 8, background: "#00F5FF", borderRadius: 2, animation: "float 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" style={{ paddingBottom: "5rem" }}>
        <SectionLabel>01 · About Me</SectionLabel>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.4rem)", marginBottom: 20, letterSpacing: -0.5 }}>
              Backend-first.<br /><span style={{ color: "#00F5FF" }}>Systems-focused.</span>
            </h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, fontSize: 15, marginBottom: 14 }}>
              Backend engineer focused on building scalable, secure, and production-ready systems. Experienced in API design, payment integration, and event-driven architectures with strong problem-solving foundations.
            </p>
            <p style={{ color: "#64748B", lineHeight: 1.8, fontSize: 14, marginBottom: 20 }}>
              Currently pursuing B.E. in Electronics & Telecommunication Engineering at PICT (2022–2026), maintaining a CGPA of 8.65 while building real-world projects.
            </p>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#475569", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Focus Areas</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["REST API Design", "JWT Auth & Security", "Razorpay Payments", "DB Indexing", "Event-Driven Arch"].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#0F1629", border: "1px solid #1E293B", borderRadius: 16, padding: "1.5rem" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Education</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#E2E8F0", marginBottom: 4 }}>B.E. Electronics & Telecommunication</div>
              <div style={{ fontSize: 14, color: "#64748B", marginBottom: 8 }}>Pune Institute of Computer Technology</div>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 13, color: "#475569" }}>2022 – 2026</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#00F5FF" }}>CGPA: 8.65</span>
              </div>
            </div>
            {[{ platform: "LeetCode", stat: "270+ Problems", sub: "Array · DP · Graphs · Trees", color: "#FFA116", icon: "⚡" }, { platform: "CodeChef", stat: "2⭐ Coder", sub: "Max Rating: 1531", color: "#5B4638", icon: "🍴" }].map(c => (
              <div key={c.platform} className="coding-card">
                <div style={{ width: 44, height: 44, borderRadius: 10, background: c.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#E2E8F0" }}>{c.platform}</div>
                  <div style={{ fontSize: 13, color: "#64748B" }}>{c.sub}</div>
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: c.color }}>{c.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHAT I BRING */}
      <div style={{ background: "#0A0D16", borderTop: "1px solid #0F1629", borderBottom: "1px solid #0F1629" }}>
        <Section id="value">
          <SectionLabel>✦ What I Bring</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {VALUE_PROPS.map(v => (
              <div key={v.title} className="value-card">
                <div style={{ fontSize: 28, marginBottom: 12 }}>{v.icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#E2E8F0", marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* EXPERIENCE */}
      <Section id="experience">
        <SectionLabel>02 · Experience & Research</SectionLabel>
        <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
          <div>
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 0, top: 6, bottom: 0, width: 2, background: "linear-gradient(to bottom, #00F5FF, #00F5FF22)" }} />
              <div style={{ position: "absolute", left: -5, top: 6, width: 12, height: 12, borderRadius: "50%", background: "#00F5FF", boxShadow: "0 0 12px #00F5FF88" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00F5FF", letterSpacing: 2 }}>FEB 2024 – MAY 2024</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, margin: "8px 0 4px", color: "#E2E8F0" }}>Research Intern</h3>
              <div style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>Cryptography & Blockchain Research</div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Implemented cryptographic models using ECC for secure blockchain-based voting",
                  "Analyzed trade-offs between security, performance, and voter anonymity",
                  "Designed lightweight validation models resistant to tampering",
                  "Research published in Springer proceedings",
                ].map(item => (
                  <li key={item} style={{ display: "flex", gap: 10, color: "#94A3B8", fontSize: 14, lineHeight: 1.6 }}>
                    <span style={{ color: "#00F5FF", marginTop: 2, flexShrink: 0 }}>▸</span>{item}
                  </li>
                ))}
              </ul>
              <a href="https://link.springer.com/chapter/10.1007/978-3-032-18211-1_38" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, color: "#00F5FF", fontSize: 13, fontFamily: "'Space Mono', monospace", textDecoration: "none" }}>
                📄 View Research Paper →
              </a>
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #0F1629 0%, #0B0F19 100%)", border: "1px solid #A855F744", borderRadius: 16, padding: "1.75rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle, #A855F711 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>📡</span>
              <Tag color="#A855F7">Final Year Project</Tag>
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#E2E8F0", marginBottom: 8, lineHeight: 1.4 }}>
              ML-Based Trajectory Optimization for UAV-Enabled 5G Communication
            </h3>
            <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>
              Simulated UAV trajectory optimization using Q-learning for a UAV acting as a temporary 5G base station during emergencies — improving coverage efficiency by an estimated 25% while minimizing energy consumption.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {["Reinforcement Learning", "Q-Learning", "5G Networks", "Energy Efficiency"].map(t => <Tag key={t} color="#A855F7">{t}</Tag>)}
            </div>
            <div style={{ padding: "10px 14px", background: "#A855F711", border: "1px solid #A855F733", borderRadius: 8, fontSize: 12, color: "#A855F7", fontFamily: "'Space Mono', monospace", textAlign: "center" }}>
              Bridging Machine Learning + Wireless Communication
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" style={{ borderTop: "1px solid #0F1629" }}>
        <SectionLabel>03 · Featured Projects</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {PROJECTS.map(p => (
            <div key={p.title} className="project-card" style={{ borderColor: p.featured ? "#00F5FF33" : "#1E293B" }}>
              {p.featured && (
                <div style={{ position: "absolute", top: 16, right: 16, background: "#00F5FF22", border: "1px solid #00F5FF66", borderRadius: 6, padding: "3px 10px", fontSize: 11, color: "#00F5FF", fontFamily: "'Space Mono', monospace" }}>
                  Featured
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 32 }}>{p.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#E2E8F0" }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>{p.subtitle}</div>
                </div>
              </div>

              {/* Problem → Solution → Impact */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, background: "#0B0F1988", borderRadius: 10, padding: "12px 14px", border: "1px solid #1E293B88" }}>
                {[{ label: "Problem", text: p.problem, color: "#F59E0B" }, { label: "Solution", text: p.solution, color: "#00F5FF" }].map(item => (
                  <div key={item.label}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: item.color, letterSpacing: 1, textTransform: "uppercase" }}>{item.label} </span>
                    <span style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Measurable Impact */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00C896", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Impact</div>
                {p.impact.map(h => (
                  <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "4px 0", fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>
                    <span style={{ color: p.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>◆</span>{h}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {p.stack.map(s => <Tag key={s} color={p.color}>{s}</Tag>)}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <button className="btn-ghost" style={{ fontSize: 12, padding: "8px 18px" }}>GitHub ↗</button>
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <button className="btn-primary" style={{ fontSize: 12, padding: "8px 18px" }}>Live Demo ↗</button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" style={{ borderTop: "1px solid #0F1629" }}>
        <SectionLabel>04 · Technical Skills</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00F5FF", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map(s => <span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: "1.25rem 1.5rem", background: "#00F5FF0A", border: "1px solid #00F5FF22", borderRadius: 12, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#00F5FF22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>⚙️</div>
          <div>
            <div style={{ fontWeight: 600, color: "#E2E8F0", fontSize: 15 }}>Core Focus</div>
            <div style={{ fontSize: 13, color: "#64748B" }}>Backend Engineering · System Design · Distributed Systems · API Architecture</div>
          </div>
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      <Section id="achievements">
        <SectionLabel>05 · Achievements & Leadership</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {ACHIEVEMENTS.map(a => (
            <div key={a.title} className="achievement-card">
              <div style={{ fontSize: 28, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#E2E8F0", marginBottom: 4 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="section-pad" style={{ borderTop: "1px solid #0F1629" }}>
        <SectionLabel>06 · Get In Touch</SectionLabel>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.4rem)", marginBottom: 16, letterSpacing: -0.5 }}>
              Let's build something <span style={{ color: "#00F5FF" }}>great</span> together.
            </h2>
            <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
              Currently open to backend engineering roles, internships, and interesting collaborations. If you have an opportunity or a challenging problem to solve, I'd love to connect.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#0F1629", border: "1px solid #1E293B", borderRadius: 10, padding: "12px 16px" }}>
                <span style={{ color: "#00F5FF", fontSize: 18 }}>✉️</span>
                <span style={{ fontSize: 14, color: "#94A3B8", flex: 1, wordBreak: "break-all" }}>rajpohekar21@gmail.com</span>
                <button onClick={copyEmail} style={{ background: "transparent", border: "1px solid #1E293B", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: copiedEmail ? "#00C896" : "#475569", cursor: "pointer", fontFamily: "'Space Mono', monospace", transition: "all 0.2s", flexShrink: 0 }}>
                  {copiedEmail ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href="https://github.com/rajpohekar21" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/raj-pohekar-b57a1a284/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div style={{ background: "#0F1629", border: "1px solid #1E293B", borderRadius: 16, padding: "1.75rem" }}>
            {formSent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#00F5FF", marginBottom: 8 }}>Message Sent!</div>
                <div style={{ color: "#64748B", fontSize: 14 }}>Thanks for reaching out. I'll get back to you soon.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input className="input-field" placeholder="Your Name" required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
                <input className="input-field" type="email" placeholder="Your Email" required value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} />
                <textarea className="input-field" placeholder="Your Message" rows={5} required value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })} style={{ resize: "vertical" }} />
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #0F1629", padding: "2rem 1.5rem", textAlign: "center", paddingBottom: isMobile ? "5rem" : "2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#334155" }}>
            Designed & Built by <span style={{ color: "#00F5FF" }}>Raj Pohekar</span>
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#1E293B" }}>© 2025 · All Rights Reserved</span>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="sticky-cta">
        <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => scrollTo("Contact")}>Hire Me</button>
        <a href="https://drive.google.com/file/d/1vC2NMlhhn94UE9_3PJtNHJ4JXwfUm8_v/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
          <button className="btn-ghost" style={{ width: "100%", justifyContent: "center" }}>Resume</button>
        </a>
      </div>
    </div>
  );
}
