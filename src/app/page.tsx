"use client";

import { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MunditelLogo from "./MunditelLogo";

const DottedGlobe = dynamic(() => import("./DottedGlobe"), { ssr: false });

// ─────────────────────────────────────────────────────────────────────────────
// SELETOR DE IDIOMA — Português / Inglês
//
// Todos os textos do site ficam no objeto "t" abaixo, separados por idioma.
// Para ADICIONAR um idioma novo (ex: francês), copie o bloco "en" inteiro,
// cole como "fr", traduza os textos, e adicione { code: "fr", label: "FR", flag: "🇫🇷" }
// no array LANGS. Pronto — o site passa a ter o novo idioma.
// ─────────────────────────────────────────────────────────────────────────────

type Lang = "en" | "pt";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "pt", label: "PT", flag: "🇧🇷" },
];

const t = {
  en: {
    nav: { services: "Services", voice: "Voice", sms: "SMS", did: "DID Numbers", about: "About", contact: "Contact" },
    getStarted: "Get Started",
    hero: {
      tag: "International Telecom Solutions",
      title1: "Connecting", title2: "Global Comms",
      desc: "Munditel delivers wholesale voice, SMS, DID numbers and Local ANI routes for carriers, enterprises and global communication providers.",
      quote: "Request a Quote", explore: "Explore Services",
    },
    heroServices: [
      { name: "Voice", desc: "Wholesale & CLI" },
      { name: "SMS", desc: "A2P & OTP" },
      { name: "DID", desc: "Global numbers" },
    ],
    globe: { tag: "Worldwide Network", title: "Connecting continents", net: "Munditel · Global Network", countries: "120+ countries" },
    numbers: {
      tag: "Coverage", title: "By the numbers",
      countries: "Countries", minutes: "Minutes / month", uptime: "Uptime SLA", support: "Support",
    },
    trustedBy: "Trusted by",
    services: {
      tag: "Our Services", title: "Everything your telecom operation needs",
      voice: { title: "Wholesale Voice", desc: "CLI routes, Local ANI routes and voice termination with international coverage across 120+ countries.", features: ["Wholesale voice termination", "CLI & Local ANI routes", "High completion rates", "Real-time CDR reporting"] },
      sms: { title: "SMS Solutions", desc: "A2P messaging, OTP delivery and bulk SMS for businesses, banks, fintechs and communication platforms.", features: ["A2P & OTP messaging", "Bulk SMS campaigns", "Two-way SMS support", "Delivery receipts"] },
      did: { title: "DID Numbers & Routes", desc: "Global DID numbers and international routing solutions designed for telecom operators, carriers and enterprises.", features: ["DID numbers worldwide", "Inbound & outbound routes", "Number portability", "Tier-1 carrier connections"] },
    },
    why: {
      tag: "Why Munditel", title1: "Carrier-grade infrastructure.", title2: "Built for scale.",
      desc: "Munditel delivers the backbone for international communication — from wholesale voice routes to SMS delivery and DID numbers. Our mission is to give operators, carriers and enterprises access to reliable, high-performance telecom infrastructure at a global scale.",
      cta: "Talk to our team",
      items: [
        { title: "Global Reach", desc: "Routes and numbers across 120+ countries and 6 continents." },
        { title: "99.9% Uptime SLA", desc: "Carrier-grade redundancy with proactive 24/7 monitoring." },
        { title: "Low Latency", desc: "Optimized international routing for crystal-clear voice calls." },
        { title: "24/7 Support", desc: "Dedicated technical team ready around the clock." },
      ],
    },
    cta: { tag: "Ready to connect?", title: "Scale your global communications today", desc: "Wholesale Voice · SMS Solutions · Global DID Numbers · Local ANI Routes", quote: "Request a Quote", wa: "Message on WhatsApp" },
    contact: {
      tag: "Contact", title: "Talk to our telecom team",
      desc: "Get in touch to discuss international routes, wholesale voice, SMS solutions and carrier-grade communication services tailored to your needs.",
      offer: "Services we offer",
      tags: ["Wholesale Voice", "SMS A2P", "OTP", "DID Numbers", "Local ANI Routes", "Global Routing"],
      name: "Name", namePh: "Your name",
      company: "Company", companyPh: "Company name",
      email: "Email", emailPh: "you@company.com",
      country: "Country", countryPh: "e.g. Brazil",
      phone: "Phone", phonePh: "+1 555 0000",
      service: "Service of Interest", servicePh: "Select a service",
      serviceOpts: ["Wholesale Voice", "SMS / A2P / OTP", "DID Numbers", "Local ANI Routes", "Global Routing", "Other"],
      message: "Message", messagePh: "Tell us about your traffic volumes, destinations and requirements...",
      send: "Send via WhatsApp", note: "Your message will open in WhatsApp ready to send.",
    },
    footer: { rights: "© 2026 Munditel. All rights reserved.", services: "Voice · SMS · DID Numbers · Global Routes" },
    waMsg: { greeting: "Hello, Munditel team!", name: "Name", company: "Company", email: "Email", phone: "Phone", country: "Country", service: "Service of interest", message: "Message" },
  },
  pt: {
    nav: { services: "Serviços", voice: "Voz", sms: "SMS", did: "Números DID", about: "Sobre", contact: "Contato" },
    getStarted: "Começar",
    hero: {
      tag: "Soluções de Telecom Internacional",
      title1: "Conectando", title2: "Comunicações Globais",
      desc: "A Munditel oferece voz por atacado, SMS, números DID e rotas Local ANI para operadoras, empresas e provedores de comunicação global.",
      quote: "Solicitar Orçamento", explore: "Ver Serviços",
    },
    heroServices: [
      { name: "Voz", desc: "Atacado & CLI" },
      { name: "SMS", desc: "A2P & OTP" },
      { name: "DID", desc: "Números globais" },
    ],
    globe: { tag: "Rede Mundial", title: "Conectando continentes", net: "Munditel · Rede Global", countries: "120+ países" },
    numbers: {
      tag: "Cobertura", title: "Em números",
      countries: "Países", minutes: "Minutos / mês", uptime: "Disponibilidade", support: "Suporte",
    },
    trustedBy: "Confiado por",
    services: {
      tag: "Nossos Serviços", title: "Tudo o que sua operação de telecom precisa",
      voice: { title: "Voz por Atacado", desc: "Rotas CLI, rotas Local ANI e terminação de voz com cobertura internacional em mais de 120 países.", features: ["Terminação de voz por atacado", "Rotas CLI & Local ANI", "Altas taxas de completamento", "Relatórios CDR em tempo real"] },
      sms: { title: "Soluções de SMS", desc: "Mensagens A2P, entrega de OTP e SMS em massa para empresas, bancos, fintechs e plataformas de comunicação.", features: ["Mensagens A2P & OTP", "Campanhas de SMS em massa", "Suporte a SMS bidirecional", "Confirmações de entrega"] },
      did: { title: "Números DID & Rotas", desc: "Números DID globais e soluções de roteamento internacional projetadas para operadoras, transportadoras e empresas.", features: ["Números DID no mundo todo", "Rotas de entrada & saída", "Portabilidade numérica", "Conexões com operadoras Tier-1"] },
    },
    why: {
      tag: "Por que a Munditel", title1: "Infraestrutura de nível operadora.", title2: "Feita para escalar.",
      desc: "A Munditel oferece a espinha dorsal da comunicação internacional — de rotas de voz por atacado à entrega de SMS e números DID. Nossa missão é dar a operadoras e empresas acesso a uma infraestrutura de telecom confiável e de alta performance em escala global.",
      cta: "Fale com nossa equipe",
      items: [
        { title: "Alcance Global", desc: "Rotas e números em mais de 120 países e 6 continentes." },
        { title: "99,9% de Disponibilidade", desc: "Redundância de nível operadora com monitoramento proativo 24/7." },
        { title: "Baixa Latência", desc: "Roteamento internacional otimizado para chamadas de voz nítidas." },
        { title: "Suporte 24/7", desc: "Equipe técnica dedicada, pronta a qualquer hora." },
      ],
    },
    cta: { tag: "Pronto para conectar?", title: "Escale suas comunicações globais hoje", desc: "Voz por Atacado · Soluções de SMS · Números DID Globais · Rotas Local ANI", quote: "Solicitar Orçamento", wa: "Falar no WhatsApp" },
    contact: {
      tag: "Contato", title: "Fale com nossa equipe de telecom",
      desc: "Entre em contato para discutir rotas internacionais, voz por atacado, soluções de SMS e serviços de comunicação de nível operadora sob medida.",
      offer: "Serviços que oferecemos",
      tags: ["Voz por Atacado", "SMS A2P", "OTP", "Números DID", "Rotas Local ANI", "Roteamento Global"],
      name: "Nome", namePh: "Seu nome",
      company: "Empresa", companyPh: "Nome da empresa",
      email: "E-mail", emailPh: "voce@empresa.com",
      country: "País", countryPh: "ex: Brasil",
      phone: "Telefone", phonePh: "+55 11 90000-0000",
      service: "Serviço de Interesse", servicePh: "Selecione um serviço",
      serviceOpts: ["Voz por Atacado", "SMS / A2P / OTP", "Números DID", "Rotas Local ANI", "Roteamento Global", "Outro"],
      message: "Mensagem", messagePh: "Conte sobre seus volumes de tráfego, destinos e necessidades...",
      send: "Enviar pelo WhatsApp", note: "Sua mensagem abrirá no WhatsApp pronta para enviar.",
    },
    footer: { rights: "© 2026 Munditel. Todos os direitos reservados.", services: "Voz · SMS · Números DID · Rotas Globais" },
    waMsg: { greeting: "Olá, equipe Munditel!", name: "Nome", company: "Empresa", email: "E-mail", phone: "Telefone", country: "País", service: "Serviço de interesse", message: "Mensagem" },
  },
};

export default function Home() {
  const whatsappNumber = "554199410601";
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  const c = t[lang]; // textos do idioma atual

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const company = String(formData.get("company") || "");
    const email = String(formData.get("email") || "");
    const country = String(formData.get("country") || "");
    const phone = String(formData.get("phone") || "");
    const service = String(formData.get("service") || "");
    const message = String(formData.get("message") || "");
    const m = c.waMsg;
    const text = `${m.greeting}

${m.name}: ${name}
${m.company}: ${company}
${m.email}: ${email}
${m.phone}: ${phone}
${m.country}: ${country}
${m.service}: ${service}

${m.message}:
${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  }

  const navLinks = [
    { href: "#services", label: c.nav.services },
    { href: "#voice", label: c.nav.voice },
    { href: "#sms", label: c.nav.sms },
    { href: "#did", label: c.nav.did },
    { href: "#about", label: c.nav.about },
    { href: "#contact", label: c.nav.contact },
  ];

  // Botãozinho do seletor de idioma (reutilizado no desktop e mobile)
  const LangSwitcher = ({ compact = false }: { compact?: boolean }) => (
    <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "#0a1628", border: "1px solid #1e3a5f" }}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors"
          style={{
            background: lang === l.code ? "#2563eb" : "transparent",
            color: lang === l.code ? "#fff" : "#94a3b8",
          }}
          aria-label={l.label}
        >
          <span style={{ fontSize: 14 }}>{l.flag}</span>
          {!compact && <span>{l.label}</span>}
        </button>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#060d1a] text-white overflow-x-hidden">

      {/* ── TELA DE LOADING INICIAL ── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 100, background: "#060d1a",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
          opacity: loading ? 1 : 0, visibility: loading ? "visible" : "hidden",
          transition: "opacity 0.6s ease, visibility 0.6s ease",
        }}
      >
        <MunditelLogo height={92} showText={false} animateOnce={true} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-0.01em" }}><span style={{ color: "#fff" }}>Mundi</span><span style={{ color: "#1776eb" }}>tel</span></div>
          <div style={{ color: "#64748b", fontSize: 11, letterSpacing: "0.22em", marginTop: 6, textTransform: "uppercase" }}>Connecting voices to the world</div>
        </div>
        <div style={{ width: 160, height: 3, background: "#0f2340", borderRadius: 99, overflow: "hidden", marginTop: 4 }}>
          <div style={{ width: "40%", height: "100%", background: "linear-gradient(90deg,#3b82f6,#38bdf8)", borderRadius: 99, animation: "mun-load 1.4s ease-in-out infinite" }} />
        </div>
        <style>{`@keyframes mun-load { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
      </div>

      <style>{`
        @keyframes float-up { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes blob-float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.03); } }
        @keyframes blob-float-slow { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(12px) scale(1.04); } }
        @keyframes glow-pulse { 0%, 100% { opacity: 0.55; } 50% { opacity: 0.85; } }
        @keyframes drift-in { 0% { opacity: 0; transform: scale(0.6); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes dot-twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .hero-text { animation: float-up 0.7s ease both; }
        .hero-text-delay { animation: float-up 0.7s 0.15s ease both; }
        .hero-text-delay2 { animation: float-up 0.7s 0.3s ease both; }
        .nav-link { position: relative; color: #64748b; font-size: 14px; transition: color 0.2s; }
        .nav-link:hover { color: #e2e8f0; }
        .nav-link::after { content: ""; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #3b82f6; transition: width 0.2s; }
        .nav-link:hover::after { width: 100%; }
        .blob { position: absolute; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .blob-glow { position: absolute; border-radius: 50%; filter: blur(40px); animation: glow-pulse 5s ease-in-out infinite; z-index: 0; }
        .blob-content { position: relative; z-index: 2; }
        .blob-num { font-weight: 800; color: #fff; line-height: 1; letter-spacing: -0.02em; }
        .blob-lbl { font-size: 12px; color: rgba(255,255,255,0.92); margin-top: 6px; line-height: 1.3; }
        .service-card { background: #0a1628; border: 1px solid #1e3a5f; border-radius: 16px; padding: 32px; transition: border-color 0.25s, transform 0.2s; }
        .service-card:hover { border-color: #3b82f6; transform: translateY(-3px); }
        .input-field { width: 100%; background: #060d1a; border: 1px solid #1e3a5f; border-radius: 10px; padding: 13px 16px; color: #e2e8f0; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .input-field::placeholder { color: #334155; }
        .input-field:focus { border-color: #3b82f6; }
        @media (max-width: 768px) {
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-3col { grid-template-columns: 1fr !important; }
          .grid-4col { grid-template-columns: 1fr 1fr !important; }
          .hero-title { font-size: 36px !important; }
          .section-pad { padding: 48px 20px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .blob-stage { transform: scale(0.82); transform-origin: top center; }
        }
      `}</style>

      <header className="sticky top-0 z-50 transition-all duration-300" style={{ background: scrolled ? "rgba(6,13,26,0.97)" : "rgba(6,13,26,0.85)", borderBottom: "1px solid #0f2340", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex justify-between items-center">
          <MunditelLogo height={72} showText={true} animateOnce={false} />
          <nav className="hidden md:flex gap-7">
            {navLinks.map((l) => (<a key={l.href} href={l.href} className="nav-link">{l.label}</a>))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <LangSwitcher />
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-400 border border-green-900 hover:border-green-500 px-4 py-2 rounded-lg transition-colors"><WhatsAppIcon /> WhatsApp</a>
            <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">{c.getStarted}</a>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher compact />
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-6 bg-slate-300 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 w-6 bg-slate-300 transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-6 bg-slate-300 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#060d1a] px-5 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (<a key={l.href} href={l.href} className="text-slate-300 text-base py-1" onClick={() => setMenuOpen(false)}>{l.label}</a>))}
            <a href="#contact" className="mt-2 bg-blue-600 text-white text-center font-semibold py-3 rounded-lg" onClick={() => setMenuOpen(false)}>{c.getStarted}</a>
          </div>
        )}
      </header>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-28 grid md:grid-cols-2 gap-12 items-center section-pad grid-2col">
        <div>
          <p className="hero-text text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5">{c.hero.tag}</p>
          <h1 className="hero-text-delay hero-title text-5xl md:text-6xl font-extrabold leading-[1.08] text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            {c.hero.title1}<br /><span style={{ color: "#3b82f6" }}>{c.hero.title2}</span>
          </h1>
          <p className="hero-text-delay2 text-slate-400 text-lg leading-relaxed max-w-xl mb-10">{c.hero.desc}</p>
          <div className="flex flex-wrap gap-3 mb-12">
            <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">{c.hero.quote}</a>
            <a href="#services" className="border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white px-7 py-3.5 rounded-xl transition-colors text-sm">{c.hero.explore}</a>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-8 border-t border-slate-800 grid-3col">
            {c.heroServices.map((s) => (
              <div key={s.name} style={{ borderLeft: "2px solid #3b82f6", paddingLeft: 16 }}>
                <div className="text-lg font-extrabold text-white">{s.name}</div>
                <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden flex flex-col items-center justify-center" style={{ background: "#050b16", border: "1px solid #1e3a5f", minHeight: 460, padding: "32px 0" }}>
          <div className="self-start px-7 mb-2">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">{c.globe.tag}</p>
            <h3 className="text-2xl font-extrabold text-white">{c.globe.title}</h3>
          </div>
          <div style={{ width: "100%", height: 340 }}>
            <DottedGlobe />
          </div>
          <div className="w-full px-7 mt-6 flex items-center justify-between">
            <span className="text-slate-600 text-xs">{c.globe.net}</span>
            <span className="text-slate-600 text-xs">{c.globe.countries}</span>
          </div>
        </div>
      </section>

      {/* ── BOLAS COM GLOW + NÚMEROS ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-12 section-pad">
        <div className="rounded-3xl relative overflow-hidden" style={{ background: "#050b16", border: "1px solid #1e3a5f", padding: "32px 24px" }}>
          <div className="text-center mb-2">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">{c.numbers.tag}</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">{c.numbers.title}</h2>
          </div>
          <div className="blob-stage relative mx-auto" style={{ height: 280, maxWidth: 760 }}>
            <div className="blob-glow" style={{ width: 190, height: 190, left: "8%", top: 70, background: "#2dd4bf" }} />
            <div className="blob-glow" style={{ width: 230, height: 230, left: "32%", top: 45, background: "#7c3aed", animationDelay: "1.5s" }} />
            <div className="blob-glow" style={{ width: 230, height: 230, right: "18%", top: 50, background: "#2563eb", animationDelay: "3s" }} />
            <div className="blob-glow" style={{ width: 170, height: 170, right: "2%", top: 75, background: "#38bdf8", animationDelay: "2s" }} />
            <div className="blob" style={{ width: 150, height: 150, left: "6%", top: 65, zIndex: 4, background: "radial-gradient(circle at 35% 35%, #5eead4, #14b8a6)", boxShadow: "0 0 45px rgba(45,212,191,0.5)", animation: "drift-in 0.9s ease both, blob-float 6s ease-in-out infinite 0.9s" }}>
              <div className="blob-content"><div className="blob-num" style={{ fontSize: 38, color: "#042f2e" }}>120+</div><div className="blob-lbl" style={{ color: "#042f2e" }}>{c.numbers.countries}</div></div>
            </div>
            <div className="blob" style={{ width: 185, height: 185, left: "30%", top: 50, zIndex: 3, background: "radial-gradient(circle at 35% 30%, #a78bfa, #7c3aed)", boxShadow: "0 0 55px rgba(124,58,237,0.55)", animation: "drift-in 0.9s ease 0.2s both, blob-float-slow 7s ease-in-out infinite 1.1s" }}>
              <div className="blob-content"><div className="blob-num" style={{ fontSize: 44 }}>50M+</div><div className="blob-lbl">{c.numbers.minutes}</div></div>
            </div>
            <div className="blob" style={{ width: 185, height: 185, right: "16%", top: 50, zIndex: 2, background: "radial-gradient(circle at 40% 35%, #60a5fa, #2563eb)", boxShadow: "0 0 55px rgba(37,99,235,0.6)", animation: "drift-in 0.9s ease 0.4s both, blob-float 8s ease-in-out infinite 1.3s" }}>
              <div className="blob-content"><div className="blob-num" style={{ fontSize: 42 }}>99.9%</div><div className="blob-lbl">{c.numbers.uptime}</div></div>
            </div>
            <div className="blob" style={{ width: 140, height: 140, right: "1%", top: 70, zIndex: 1, background: "radial-gradient(circle at 35% 35%, #7dd3fc, #0ea5e9)", boxShadow: "0 0 45px rgba(56,189,248,0.5)", animation: "drift-in 0.9s ease 0.6s both, blob-float-slow 6.5s ease-in-out infinite 1.5s" }}>
              <div className="blob-content"><div className="blob-num" style={{ fontSize: 34, color: "#082f49" }}>24/7</div><div className="blob-lbl" style={{ color: "#082f49" }}>{c.numbers.support}</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-slate-600 text-xs uppercase tracking-widest">{c.trustedBy}</p>
          <div className="flex flex-wrap gap-6 md:gap-10 text-slate-600 text-sm font-semibold tracking-wider">
            {["VIVO", "CLARO", "TIM", "VODAFONE", "ORANGE", "TELEFÓNICA"].map((b) => (<span key={b} className="hover:text-slate-300 transition-colors cursor-default">{b}</span>))}
          </div>
        </div>
      </div>

      <section id="services" className="max-w-7xl mx-auto px-5 md:px-8 py-20 section-pad">
        <div className="text-center mb-14">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">{c.services.tag}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ letterSpacing: "-0.02em" }}>{c.services.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 grid-3col">
          <div id="voice" className="service-card">
            <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center mb-5"><PhoneIcon /></div>
            <h3 className="text-xl font-bold text-white mb-3">{c.services.voice.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{c.services.voice.desc}</p>
            <ul className="space-y-2">{c.services.voice.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-slate-400"><CheckIcon /> {f}</li>))}</ul>
          </div>
          <div id="sms" className="service-card">
            <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center mb-5"><SMSIcon /></div>
            <h3 className="text-xl font-bold text-white mb-3">{c.services.sms.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{c.services.sms.desc}</p>
            <ul className="space-y-2">{c.services.sms.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-slate-400"><CheckIcon /> {f}</li>))}</ul>
          </div>
          <div id="did" className="service-card">
            <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center mb-5"><GlobeIcon /></div>
            <h3 className="text-xl font-bold text-white mb-3">{c.services.did.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{c.services.did.desc}</p>
            <ul className="space-y-2">{c.services.did.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-slate-400"><CheckIcon /> {f}</li>))}</ul>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-slate-800" style={{ background: "#050c18" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 section-pad">
          <div className="grid md:grid-cols-2 gap-16 items-center grid-2col">
            <div>
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">{c.why.tag}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6" style={{ letterSpacing: "-0.02em" }}>{c.why.title1}<br /><span className="text-slate-400">{c.why.title2}</span></h2>
              <p className="text-slate-400 text-base leading-relaxed mb-10">{c.why.desc}</p>
              <a href="#contact" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">{c.why.cta}</a>
            </div>
            <div className="grid grid-cols-2 gap-5 grid-2col">
              {c.why.items.map((item, idx) => (
                <div key={idx} className="bg-[#0a1628] border border-slate-800 rounded-2xl p-5 hover:border-blue-900 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center mb-3">{[<GlobeIcon key="g" />, <ShieldIcon key="s" />, <SpeedIcon key="sp" />, <SupportIcon key="su" />][idx]}</div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 section-pad">
        <div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f2340 0%, #0a1628 60%, #0d1f38 100%)", border: "1px solid #1e3a5f" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 65%)" }} />
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4 relative">{c.cta.tag}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 relative" style={{ letterSpacing: "-0.02em" }}>{c.cta.title}</h2>
          <p className="text-slate-400 text-base mb-8 relative max-w-xl mx-auto">{c.cta.desc}</p>
          <div className="flex flex-wrap justify-center gap-4 relative">
            <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors">{c.cta.quote}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-700/30 hover:bg-green-700/50 border border-green-700 text-green-400 font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors"><WhatsAppIcon /> {c.cta.wa}</a>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-800" style={{ background: "#050c18" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-16 items-start section-pad contact-grid">
          <div>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">{c.contact.tag}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5" style={{ letterSpacing: "-0.02em" }}>{c.contact.title}</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10">{c.contact.desc}</p>
            <div className="space-y-4 mb-10">
              {[{ icon: <PhoneIcon size={16} />, text: "+55 41 9941-0601" }, { icon: <WhatsAppIcon />, text: "wa.me/554199410601" }].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-slate-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-400">{item.icon}</div>{item.text}
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid #1e3a5f" }}>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">{c.contact.offer}</p>
              <div className="flex flex-wrap gap-2">{c.contact.tags.map((tag) => (<span key={tag} className="text-xs font-medium text-blue-400 px-3 py-1 rounded-full" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>{tag}</span>))}</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="rounded-2xl p-7 md:p-8 space-y-4" style={{ background: "#0a1628", border: "1px solid #1e3a5f" }}>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-slate-500 mb-1.5">{c.contact.name} *</label><input name="name" className="input-field" placeholder={c.contact.namePh} required /></div>
              <div><label className="block text-xs text-slate-500 mb-1.5">{c.contact.company} *</label><input name="company" className="input-field" placeholder={c.contact.companyPh} required /></div>
            </div>
            <div><label className="block text-xs text-slate-500 mb-1.5">{c.contact.email} *</label><input name="email" type="email" className="input-field" placeholder={c.contact.emailPh} required /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-slate-500 mb-1.5">{c.contact.country} *</label><input name="country" className="input-field" placeholder={c.contact.countryPh} required /></div>
              <div><label className="block text-xs text-slate-500 mb-1.5">{c.contact.phone}</label><input name="phone" type="tel" className="input-field" placeholder={c.contact.phonePh} /></div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">{c.contact.service}</label>
              <select name="service" className="input-field" style={{ appearance: "none" }}>
                <option value="">{c.contact.servicePh}</option>
                {c.contact.serviceOpts.map((o) => (<option key={o}>{o}</option>))}
              </select>
            </div>
            <div><label className="block text-xs text-slate-500 mb-1.5">{c.contact.message} *</label><textarea name="message" className="input-field" rows={4} placeholder={c.contact.messagePh} required style={{ resize: "vertical" }} /></div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-sm transition-colors"><WhatsAppIcon /> {c.contact.send}</button>
            <p className="text-center text-xs text-slate-600">{c.contact.note}</p>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row gap-4 justify-between items-center text-slate-600 text-sm">
          <div style={{ opacity: 0.5 }}><MunditelLogo height={34} showText={true} animateOnce={false} /></div>
          <p>{c.footer.rights}</p>
          <p className="text-xs">{c.footer.services}</p>
        </div>
      </footer>

      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-full shadow-xl text-sm font-bold transition-all hover:scale-105" aria-label="WhatsApp">
        <WhatsAppIcon /><span className="hidden sm:inline">WhatsApp</span>
      </a>
    </main>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.52 5.83L0 24l6.313-1.496A11.963 11.963 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.647-.51-5.162-1.4l-.37-.22-3.748.888.944-3.64-.242-.374A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}
function PhoneIcon({ size = 20 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" aria-hidden="true"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 17v3a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>);
}
function SMSIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" aria-hidden="true"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
}
function GlobeIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" /></svg>);
}
function ShieldIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" aria-hidden="true"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.4C16.5 22.15 20 17.25 20 12V6l-8-4z" /></svg>);
}
function SpeedIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>);
}
function SupportIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" aria-hidden="true"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>);
}
function CheckIcon() {
  return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>);
}
