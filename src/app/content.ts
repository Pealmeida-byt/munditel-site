// ─────────────────────────────────────────────────────────────────────────────
// CONTEÚDO DO SITE — Inglês / Português / Chinês
//
// Todos os textos do site ficam aqui, separados por idioma.
// Para ADICIONAR um idioma novo (ex: francês): copie o bloco "en" inteiro,
// cole como "fr", traduza os textos, adicione "fr" no type Lang e
// { code: "fr", label: "FR", flag: "🇫🇷" } no array LANGS (em page.tsx).
// ─────────────────────────────────────────────────────────────────────────────

import type { RcsContent } from "./RcsPhone";

export type Lang = "en" | "pt" | "zh";

export const LANGS: { code: Lang; label: string; name: string; flag: string }[] = [
  { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
  { code: "pt", label: "PT", name: "Português", flag: "🇧🇷" },
  { code: "zh", label: "中文", name: "中文", flag: "🇨🇳" },
];

type Content = {
  nav: { services: string; voice: string; sms: string; did: string; rcs: string; about: string; contact: string };
  getStarted: string;
  hero: { tag: string; title1: string; title2: string; desc: string; quote: string; explore: string };
  heroServices: { name: string; desc: string }[];
  globe: { tag: string; title: string; net: string; countries: string };
  numbers: { tag: string; title: string; countries: string; minutes: string; uptime: string; support: string };
  trustedBy: string;
  services: {
    tag: string; title: string;
    voice: { title: string; desc: string; features: string[] };
    sms: { title: string; desc: string; features: string[] };
    did: { title: string; desc: string; features: string[] };
  };
  rcs: RcsContent;
  why: {
    tag: string; title1: string; title2: string; desc: string; cta: string;
    items: { title: string; desc: string }[];
  };
  cta: { tag: string; title: string; desc: string; quote: string; wa: string };
  contact: {
    tag: string; title: string; desc: string; offer: string; tags: string[];
    name: string; namePh: string; company: string; companyPh: string;
    email: string; emailPh: string; country: string; countryPh: string;
    phone: string; phonePh: string; service: string; servicePh: string; serviceOpts: string[];
    message: string; messagePh: string; send: string; note: string;
  };
  footer: { rights: string; services: string };
  waMsg: { greeting: string; name: string; company: string; email: string; phone: string; country: string; service: string; message: string };
};

export const t: Record<Lang, Content> = {
  en: {
    nav: { services: "Services", voice: "Voice", sms: "SMS", did: "DID Numbers", rcs: "RCS", about: "About", contact: "Contact" },
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
    rcs: {
      tag: "RCS Business Messaging",
      title: "Talk to your customers as a verified business",
      verified: "Verified business",
      placeholder: "Message…",
      replay: "Play again",
      messages: [
        { side: "in", text: "Hi! This is Munditel 👋 How can we help your operation today?" },
        { side: "out", text: "I need wholesale voice routes" },
        { side: "in", text: "Great! We cover 120+ countries with CLI and Local ANI routes." },
        { side: "in", text: "Want me to send you a quote now?" },
        { side: "out", text: "Yes, please send it!" },
        { side: "in", text: "✅ Sent! Our team is already taking care of everything for you." },
      ],
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
    nav: { services: "Serviços", voice: "Voz", sms: "SMS", did: "Números DID", rcs: "RCS", about: "Sobre", contact: "Contato" },
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
    rcs: {
      tag: "Mensagens RCS para Empresas",
      title: "Converse com seus clientes como uma empresa verificada",
      verified: "Empresa verificada",
      placeholder: "Mensagem…",
      replay: "Ver de novo",
      messages: [
        { side: "in", text: "Olá! Aqui é a Munditel 👋 Como podemos ajudar sua operação hoje?" },
        { side: "out", text: "Preciso de rotas de voz por atacado" },
        { side: "in", text: "Perfeito! Temos cobertura em 120+ países com rotas CLI e Local ANI." },
        { side: "in", text: "Quer que eu envie um orçamento agora?" },
        { side: "out", text: "Sim, pode enviar!" },
        { side: "in", text: "✅ Enviado! Nossa equipe já está cuidando de tudo pra você." },
      ],
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

  zh: {
    nav: { services: "服务", voice: "语音", sms: "短信", did: "DID 号码", rcs: "RCS", about: "关于我们", contact: "联系我们" },
    getStarted: "立即开始",
    hero: {
      tag: "国际电信解决方案",
      title1: "连接", title2: "全球通信",
      desc: "Munditel 为运营商、企业和全球通信服务商提供批发语音、短信、DID 号码和 Local ANI 路由。",
      quote: "申请报价", explore: "查看服务",
    },
    heroServices: [
      { name: "语音", desc: "批发与 CLI" },
      { name: "短信", desc: "A2P 与 OTP" },
      { name: "DID", desc: "全球号码" },
    ],
    globe: { tag: "全球网络", title: "连接各大洲", net: "Munditel · 全球网络", countries: "120+ 个国家" },
    numbers: {
      tag: "覆盖范围", title: "数据一览",
      countries: "国家", minutes: "分钟 / 月", uptime: "可用性 SLA", support: "支持",
    },
    trustedBy: "合作伙伴",
    services: {
      tag: "我们的服务", title: "您的电信业务所需的一切",
      voice: { title: "批发语音", desc: "CLI 路由、Local ANI 路由和语音落地，覆盖全球 120 多个国家。", features: ["批发语音落地", "CLI 与 Local ANI 路由", "高接通率", "实时 CDR 报表"] },
      sms: { title: "短信解决方案", desc: "面向企业、银行、金融科技和通信平台的 A2P 消息、OTP 发送和批量短信。", features: ["A2P 与 OTP 消息", "批量短信营销", "双向短信支持", "送达回执"] },
      did: { title: "DID 号码与路由", desc: "为电信运营商、承运商和企业设计的全球 DID 号码和国际路由解决方案。", features: ["全球 DID 号码", "呼入与呼出路由", "号码携带", "一级运营商互联"] },
    },
    rcs: {
      tag: "RCS 企业消息",
      title: "以认证企业身份与客户对话",
      verified: "已认证企业",
      placeholder: "输入消息…",
      replay: "重新播放",
      messages: [
        { side: "in", text: "您好！这里是 Munditel 👋 今天我们能为您的业务提供什么帮助？" },
        { side: "out", text: "我需要批发语音路由" },
        { side: "in", text: "太好了！我们覆盖 120 多个国家，提供 CLI 和 Local ANI 路由。" },
        { side: "in", text: "需要我现在给您发送报价吗？" },
        { side: "out", text: "好的，请发送！" },
        { side: "in", text: "✅ 已发送！我们的团队正在为您处理一切。" },
      ],
    },
    why: {
      tag: "为什么选择 Munditel", title1: "运营商级基础设施。", title2: "为规模而生。",
      desc: "Munditel 为国际通信提供坚实的支撑——从批发语音路由到短信发送和 DID 号码。我们的使命是让运营商、承运商和企业能够在全球范围内使用可靠、高性能的电信基础设施。",
      cta: "联系我们的团队",
      items: [
        { title: "全球覆盖", desc: "覆盖 120 多个国家和 6 大洲的路由与号码。" },
        { title: "99.9% 可用性 SLA", desc: "运营商级冗余，配备主动式 7×24 小时监控。" },
        { title: "低延迟", desc: "优化的国际路由，带来清晰的语音通话。" },
        { title: "7×24 小时支持", desc: "专属技术团队全天候待命。" },
      ],
    },
    cta: { tag: "准备好连接了吗？", title: "立即扩展您的全球通信", desc: "批发语音 · 短信解决方案 · 全球 DID 号码 · Local ANI 路由", quote: "申请报价", wa: "通过 WhatsApp 联系" },
    contact: {
      tag: "联系我们", title: "联系我们的电信团队",
      desc: "立即联系我们，探讨为您量身定制的国际路由、批发语音、短信解决方案和运营商级通信服务。",
      offer: "我们提供的服务",
      tags: ["批发语音", "SMS A2P", "OTP", "DID 号码", "Local ANI 路由", "全球路由"],
      name: "姓名", namePh: "您的姓名",
      company: "公司", companyPh: "公司名称",
      email: "邮箱", emailPh: "you@company.com",
      country: "国家", countryPh: "例如：中国",
      phone: "电话", phonePh: "+86 138 0000 0000",
      service: "感兴趣的服务", servicePh: "请选择服务",
      serviceOpts: ["批发语音", "SMS / A2P / OTP", "DID 号码", "Local ANI 路由", "全球路由", "其他"],
      message: "留言", messagePh: "请告诉我们您的流量规模、目的地和需求……",
      send: "通过 WhatsApp 发送", note: "您的消息将在 WhatsApp 中打开，随时可发送。",
    },
    footer: { rights: "© 2026 Munditel。保留所有权利。", services: "语音 · 短信 · DID 号码 · 全球路由" },
    waMsg: { greeting: "您好，Munditel 团队！", name: "姓名", company: "公司", email: "邮箱", phone: "电话", country: "国家", service: "感兴趣的服务", message: "留言" },
  },
};