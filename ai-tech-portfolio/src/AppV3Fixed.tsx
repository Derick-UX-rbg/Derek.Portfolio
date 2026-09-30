import { useEffect, useRef, useState } from 'react';
import { initMotion } from './motion';
import './motion/styles.css';
import {
  ArrowUpRight, Bot, Check, ChevronDown, ChevronRight, Code2, Copy, Database,
  Github, Linkedin, Mail, Menu, Play, Sparkles, Workflow, X, Cpu, Layers3, Calendar
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type System = { num: string; eyebrow: string; title: string; text: string; flow: string[]; tags: string[] };
type Lab = { icon: LucideIcon; type: string; title: string; text: string; tools: string[]; status: string; href?: string; cta?: string };
type Skill = { icon: LucideIcon; title: string; text: string };
type Showcase = {
  id: string;
  src: string;
  poster: string;
  title: string;
  eyebrow: string;
  duration: string;
  aspect: 'landscape' | 'portrait';
  featured?: boolean;
  alt: string;
  caption: string;
  brief: string;
  process: string[];
  result: string;
};

const EMAIL = 'derekyigo128@gmail.com';
const MAILTO =
  `mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry — Derek Portfolio')}&body=${encodeURIComponent(
    "Hi Derek,\n\nI have a project / process I'd like to discuss:\n\n- What I need help with:\n- Timeline:\n- Budget range (optional):\n\nThanks,"
  )}`;

const systems: System[] = [
  { num: '01', eyebrow: 'AUTOMATION SYSTEM', title: 'AI Property Sales & Lead Management', text: 'Capture property enquiries, qualify intent and budget, prioritize prospects, and route qualified conversations to sales.', flow: ['Inbound lead', 'n8n', 'AI qualification', 'Sales alert'], tags: ['n8n', 'OpenAI API', 'Webhooks', 'WhatsApp API', 'Supabase'] },
  { num: '02', eyebrow: 'WEB SOFTWARE + AUTOMATION', title: 'Boutique Sales & Fulfilment System', text: 'Centralize stock, process orders, generate receipts, and trigger fulfilment notifications from one practical workflow.', flow: ['Order', 'Inventory', 'Receipt', 'Notification'], tags: ['React', 'Node.js', 'Supabase', 'PostgreSQL', 'n8n'] },
  { num: '03', eyebrow: 'COMPUTER VISION', title: 'Counterfeit Drink Detection Concept', text: 'Explore bottle-label evidence, OCR, structured product data, and a safer path toward official product verification.', flow: ['Image', 'OCR / vision', 'Evidence check', 'Verification route'], tags: ['TypeScript', 'OCR', 'Vision models', 'PostgreSQL'] }
];

const lab: Lab[] = [
  { icon: Play, type: 'AI VIDEO', title: 'AI Short Film Lab', text: 'Cinematic storytelling experiments combining scene design, motion, voice and editing workflows.', tools: ['Higgsfield', 'Gemini', 'Generative video'], status: 'EXPERIMENT' },
  { icon: Sparkles, type: 'AI ADVERTISING', title: 'AI Product Commercials', text: 'Product-focused creative concepts that move from an idea and script into visual assets and short-form ads.', tools: ['Higgsfield', 'Image models', 'Creative direction'], status: 'LIVE', href: 'https://ai-commercial-factory.onrender.com', cta: 'Open live product' },
  { icon: Layers3, type: 'CREATIVE AUTOMATION', title: 'Social Content Engine', text: 'A concept for turning one content idea into scripts, visual prompts, media assets and platform-ready variations.', tools: ['Gemini', 'n8n', 'AI media tools'], status: 'CONCEPT' },
  { icon: Cpu, type: 'AI AGENTS', title: 'Automation Architect', text: 'An AI-assisted system for understanding business problems, designing workflows, mapping APIs and debugging n8n automations.', tools: ['AI agents', 'n8n', 'APIs'], status: 'BUILDING' }
];

const showcase: Showcase[] = [
  {
    id: 'ttw-autos',
    src: '/ttw-autos-commercial.mp4',
    poster: '/assets/showcase/posters/ttw-autos.jpg',
    title: 'TTW Autos — AI Commercial',
    eyebrow: 'FEATURED · AUTOMOTIVE',
    duration: '10 SEC',
    aspect: 'landscape',
    featured: true,
    alt: 'TTW Autos AI-generated automotive commercial showing dealership branding and luxury vehicles',
    caption: 'AI-generated 10s commercial for TTW Autos — dealership presence and vehicle appeal.',
    brief: 'Produce a short automotive commercial that presents TTW Autos (rentals & sales) with a premium vehicle focus — without a traditional film crew.',
    process: ['Brief & brand cues from dealership context', 'Scene / shot direction for generative video', 'AI video production & pass selection', 'Polish into a 10-second showcase cut'],
    result: 'A 10-second landscape commercial that reads as a dealership spot: storefront branding, luxury vehicles, and a clean product-led close.'
  },
  {
    id: 'construction-site',
    src: '/assets/showcase/construction-site.mp4',
    poster: '/assets/showcase/posters/construction-site.jpg',
    title: 'Construction Site',
    eyebrow: 'AI VIDEO · COMMERCIAL',
    duration: '10 SEC',
    aspect: 'landscape',
    alt: 'AI-generated construction site commercial with on-site supervisor narrative',
    caption: 'Cinematic site-supervision commercial — construction environment, tablet-in-hand presence.',
    brief: 'A commercial-style clip for a construction / site-supervision narrative: professional presence on an active build site.',
    process: ['Scene brief (site, wardrobe, props)', 'Generative AI video production', 'Select strongest pass for showcase'],
    result: 'A 10-second landscape commercial with warm daylight, hard-hat presence, and a tablet-led inspect-and-manage beat.'
  },
  {
    id: 'fragrance-campaign',
    src: '/assets/showcase/fragrance-campaign.mp4',
    poster: '/assets/showcase/posters/fragrance-campaign.jpg',
    title: 'Fragrance Campaign',
    eyebrow: 'AI VIDEO · LUXURY',
    duration: '8 SEC',
    aspect: 'landscape',
    alt: 'AI-generated luxury fragrance campaign with evening formal aesthetic',
    caption: 'Luxury fragrance campaign cut — formal evening look, product mist, warm lobby light.',
    brief: 'Luxury fragrance advertising concept: evening formal aesthetic, product as hero, hotel/gala atmosphere.',
    process: ['Creative direction (wardrobe, bottle, mist)', 'Generative AI video production', 'Trim to an 8-second campaign beat'],
    result: 'An 8-second luxury fragrance clip — tuxedo, gold bottle mist, shallow-depth lobby glow.'
  },
  {
    id: 'luxury-interior',
    src: '/assets/showcase/luxury-interior.mp4',
    poster: '/assets/showcase/posters/luxury-interior.jpg',
    title: 'Luxury Interior',
    eyebrow: 'AI VIDEO · INTERIOR',
    duration: '10 SEC',
    aspect: 'portrait',
    alt: 'AI-generated luxury interior walkthrough of an open-plan living and dining space',
    caption: 'Portrait walkthrough of a high-end open-plan living / dining interior.',
    brief: 'Interior lifestyle commercial for a high-end living space — calm layered lighting and material detail.',
    process: ['Spatial / mood brief', 'Generative AI video production', 'Portrait framing for mobile-first showcase'],
    result: 'A 10-second portrait walkthrough of a cream-and-wood luxury interior with chandelier and slatted feature wall.'
  }
];

const skills: Skill[] = [
  { icon: Workflow, title: 'Automation', text: 'n8n, webhooks, multi-step workflows, triggers, routing and human handoffs.' },
  { icon: Bot, title: 'AI Systems', text: 'LLM workflows, agent patterns, tool calling, prompt design and practical AI integration.' },
  { icon: Code2, title: 'Software', text: 'React, TypeScript, Node.js and Python for useful interfaces and supporting services.' },
  { icon: Database, title: 'Data & APIs', text: 'Supabase, PostgreSQL, REST APIs, structured data and integration architecture.' }
];

const stack = [
  ['AI', 'OpenAI', 'Gemini', 'AI agents', 'Computer vision'],
  ['AUTOMATION', 'n8n', 'Webhooks', 'REST APIs', 'WhatsApp / Telegram'],
  ['DEVELOPMENT', 'React', 'TypeScript', 'Node.js', 'Python'],
  ['CREATIVE AI', 'Higgsfield', 'WaveSpeed AI', 'Generative video', 'AI image tools']
];

const services = [
  { title: 'AI automation', text: 'n8n workflows, lead qualification, notifications, handoffs.' },
  { title: 'Web software', text: 'React / Node interfaces tied to real business processes.' },
  { title: 'APIs & data', text: 'Integrations, Supabase / Postgres, structured pipelines.' },
  { title: 'AI commercials', text: 'Short-form generative video for products and brands.' }
];

const systemsStrip = [
  { label: 'Automation', detail: 'n8n · webhooks · routing' },
  { label: 'APIs', detail: 'REST · WhatsApp · OpenAI' },
  { label: 'Web', detail: 'React · TypeScript · Node' },
  { label: 'AI media', detail: 'Generative video · ads' },
  { label: 'Data', detail: 'Supabase · PostgreSQL' }
];

const nowItems = [
  { tag: 'BUILDING', text: 'AI product commercials and generative video experiments in the creative lab.' },
  { tag: 'OPEN TO', text: 'Freelance & remote work — automation, APIs, web software, and AI media briefs.' },
  { tag: 'FOCUS', text: 'Practical systems that connect AI, data and interfaces to real workflows.' }
];

const css = `:root{
  color-scheme:dark;
  --bg:#0a0a0a;
  --bg-2:#111111;
  --bg-3:#161616;
  --cream:#efeae2;
  --cream-soft:#d4cec4;
  --muted:#8f897f;
  --muted-2:#6e695f;
  --line:rgba(239,234,226,.12);
  --line-strong:rgba(239,234,226,.22);
  --ink:#0a0a0a;
  --cream-bg:#efeae2;
  --radius:2px;
  --font-display:'Syne',system-ui,sans-serif;
  --font-body:'Inter',system-ui,sans-serif;
  --font-mono:'JetBrains Mono',ui-monospace,monospace;
  font-family:var(--font-body);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--cream)}
a{color:inherit;text-decoration:none}
button{font:inherit;cursor:pointer}
.site{min-height:100vh;overflow-x:hidden;background:var(--bg)}
.grid{display:none}
.container{width:min(1240px,calc(100% - 48px));margin:auto}

/* NAV */
.nav{position:sticky;top:0;z-index:40;border-bottom:1px solid transparent;background:rgba(10,10,10,.55);backdrop-filter:blur(16px)}
.navin{min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.brand{display:flex;align-items:center;gap:12px;font-family:var(--font-display);font-weight:700;font-size:15px;letter-spacing:-.02em}
.mark{width:36px;height:36px;display:grid;place-items:center;border:1px solid var(--line-strong);border-radius:999px;color:var(--cream);background:transparent;font:600 10px var(--font-mono);letter-spacing:.06em}
.links{display:flex;gap:32px;color:var(--muted);font-size:13px;font-weight:500}
.links a{position:relative;padding:4px 0;transition:color .3s ease}
.links a:after{content:'';position:absolute;left:0;right:100%;bottom:-2px;height:1px;background:var(--cream);transition:right .35s cubic-bezier(.22,1,.36,1)}
.links a:hover{color:var(--cream)}
.links a:hover:after{right:0}
.cta,.primary{display:inline-flex;align-items:center;gap:8px;border-radius:999px;font-weight:600;letter-spacing:-.01em;transition:transform .25s ease,background .25s ease,color .25s ease,border-color .25s ease}
.cta{padding:11px 18px;font-size:12px;background:var(--cream);color:var(--ink);border:1px solid var(--cream)}
.primary{padding:14px 22px;font-size:13px;background:var(--cream);color:var(--ink);border:1px solid var(--cream)}
.cta:hover,.primary:hover{background:transparent;color:var(--cream);transform:translateY(-1px)}
.menub{display:none;padding:8px;border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--cream)}
.mobile{display:none}

/* HERO */
.hero{padding:120px 0 100px}
.copy{max-width:980px}
.kicker{display:inline-flex;align-items:center;gap:10px;padding:8px 14px;border:1px solid var(--line);border-radius:999px;color:var(--cream-soft);font:500 11px var(--font-mono);letter-spacing:.08em;text-transform:uppercase}
.dot{width:6px;height:6px;border-radius:50%;background:var(--cream);box-shadow:0 0 12px rgba(239,234,226,.45)}
h1{font-family:var(--font-display);font-size:clamp(46px,8.6vw,104px);line-height:.98;letter-spacing:-.055em;font-weight:700;margin:28px 0 22px;max-width:16ch}
.grad{color:var(--cream);background:none;-webkit-background-clip:initial;background-clip:initial}
.hero p{max-width:640px;color:var(--muted);font-size:clamp(16px,1.7vw,19px);line-height:1.7;margin:0;font-weight:400}
.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:36px}
.secondary,.social{display:inline-flex;align-items:center;gap:8px;padding:13px 18px;border:1px solid var(--line-strong);border-radius:999px;color:var(--cream);background:transparent;font-size:13px;font-weight:500;transition:border-color .25s ease,background .25s ease,transform .25s ease}
.secondary{cursor:pointer}
.secondary:hover,.social:hover{border-color:var(--cream);background:rgba(239,234,226,.04);transform:translateY(-1px)}
.stats{display:grid;grid-template-columns:repeat(3,1fr);max-width:720px;margin-top:64px;border-top:1px solid var(--line);padding-top:8px}
.stat{padding:18px 18px 0 0;color:var(--muted-2);font:500 11px var(--font-mono);text-transform:uppercase;letter-spacing:.06em}
.stat b{display:block;color:var(--cream);font:600 14px var(--font-display);text-transform:none;letter-spacing:-.02em;margin-bottom:6px}
.strip{display:flex;flex-wrap:wrap;gap:8px;margin-top:44px}
.strip span{padding:8px 12px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:transparent;font:500 10px var(--font-mono);letter-spacing:.14em}

/* SECTIONS */
.section{padding:120px 0;border-top:1px solid var(--line)}
.section.band-cream{background:var(--cream-bg);color:var(--ink);border-top-color:transparent}
.section.band-cream .label{color:var(--muted-2)}
.section.band-cream .intro,.section.band-cream .nowcard p{color:#5c574f}
.section.band-cream .nowcard{background:rgba(10,10,10,.04);border-color:rgba(10,10,10,.1)}
.section.band-cream .eyebrow{color:var(--ink)}
.head{display:flex;align-items:end;justify-content:space-between;gap:40px;margin-bottom:48px}
.label{color:var(--muted);font:500 11px var(--font-mono);letter-spacing:.16em;text-transform:uppercase}
.green{color:var(--cream-soft)}
h2{margin:12px 0 0;font-family:var(--font-display);font-size:clamp(32px,5vw,64px);letter-spacing:-.045em;line-height:1.02;font-weight:700;max-width:14ch}
.intro{max-width:420px;color:var(--muted);line-height:1.7;font-size:15px}

/* CARDS */
.list{display:grid;gap:18px}
.card,.labcard,.skill,.stackcard,.principle,.nowcard{border:1px solid var(--line);background:var(--bg-2)}
.card{padding:36px;border-radius:var(--radius);background:linear-gradient(160deg,rgba(22,22,22,.95),rgba(10,10,10,.92));transition:border-color .3s ease,transform .35s ease}
.card:hover,.labcard:hover,.showcase-card:hover{transform:translateY(-4px);border-color:var(--line-strong)}
.top{display:flex;justify-content:space-between;gap:24px}
.eyebrow,.num{font:500 10px var(--font-mono);letter-spacing:.12em;text-transform:uppercase}
.eyebrow{color:var(--cream-soft)}
.num{color:var(--muted-2);font-size:13px}
.card h3{font-family:var(--font-display);font-size:28px;letter-spacing:-.035em;margin:12px 0 14px;font-weight:700}
.card p,.labcard p{color:var(--muted);line-height:1.7;font-size:15px;margin:0 0 24px}
.flow{display:flex;flex-wrap:wrap;gap:8px;padding:14px;border:1px solid var(--line);background:rgba(0,0,0,.35);border-radius:var(--radius);font:500 11px var(--font-mono);color:var(--cream-soft)}
.flow span{padding:7px 10px;border-radius:999px;background:rgba(239,234,226,.06)}
.tags,.metas{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.tag,.meta{padding:6px 10px;border:1px solid var(--line);border-radius:999px;color:var(--muted);font:500 10px var(--font-mono)}
.link{display:inline-flex;align-items:center;gap:6px;margin-top:22px;color:var(--cream);font-size:13px;font-weight:600;border-bottom:1px solid transparent;padding-bottom:2px;transition:border-color .25s ease}
.link:hover{border-bottom-color:var(--cream)}

/* LAB */
.labgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:8px}
.labcard{position:relative;overflow:hidden;padding:32px;border-radius:var(--radius);min-height:280px;transition:border-color .3s ease,transform .35s ease}
.labcard:after{content:'';position:absolute;width:220px;height:220px;right:-90px;top:-100px;border-radius:50%;background:rgba(239,234,226,.03)}
.icon{width:44px;height:44px;display:grid;place-items:center;border:1px solid var(--line);border-radius:999px;color:var(--cream);background:rgba(239,234,226,.04)}
.type{margin-top:24px;color:var(--muted);font:500 10px var(--font-mono);letter-spacing:.14em}
.labcard h3{font-family:var(--font-display);font-size:24px;margin:10px 0;letter-spacing:-.03em}
.status{position:absolute;top:28px;right:28px;color:var(--cream-soft);font:500 10px var(--font-mono);letter-spacing:.1em}
.pipeline{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:28px}
.step{padding:16px 10px;border:1px solid var(--line);border-radius:var(--radius);background:var(--bg-2);text-align:center}
.step b{display:block;color:var(--cream);font:600 11px var(--font-mono);margin-bottom:6px}
.step span{color:var(--muted);font-size:11px}

/* SKILLS / STACK */
.skillgrid,.stackgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.skill{min-height:200px;padding:26px;border-radius:var(--radius)}
.skill h3{font-family:var(--font-display);font-size:18px;margin:20px 0 10px;letter-spacing:-.02em}
.skill p{color:var(--muted);line-height:1.7;font-size:13px;margin:0}
.stackcard{padding:22px;border-radius:var(--radius)}
.stackcard b{display:block;color:var(--cream);font:600 12px var(--font-mono);letter-spacing:.08em;margin-bottom:14px}
.stackcard div{display:flex;flex-wrap:wrap;gap:7px}
.stackcard span{padding:7px 10px;border-radius:999px;background:rgba(239,234,226,.05);border:1px solid var(--line);color:var(--muted);font:500 10px var(--font-mono)}

/* ABOUT */
.about{display:grid;grid-template-columns:1.15fr .85fr;gap:80px}
.about p{color:var(--muted);line-height:1.85;font-size:17px}
.principles{display:grid;gap:12px}
.principle{padding:18px;border-radius:var(--radius)}
.principle b{display:block;font-family:var(--font-display);font-size:15px;margin-bottom:6px;letter-spacing:-.02em}
.principle span{color:var(--muted);font-size:13px;line-height:1.6}

/* CONTACT */
.contact{padding:56px;border:1px solid var(--line-strong);border-radius:var(--radius);background:radial-gradient(circle at 88% 8%,rgba(239,234,226,.08),transparent 22rem),var(--bg-2)}
.contact h2{max-width:18ch}
.contact p{max-width:620px;color:var(--muted);line-height:1.75;font-size:16px}
.contactrow{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.footer{padding:36px 0 48px;color:var(--muted-2);font-size:12px;border-top:1px solid var(--line)}
.footerin{display:flex;align-items:center;justify-content:space-between;gap:20px}
.footlinks{display:flex;gap:20px}
.footlinks a{position:relative}
.footlinks a:hover{color:var(--cream)}

/* SHOWCASE */
.showcase{margin-top:8px;margin-bottom:36px}
.showcase-label{margin:0 0 18px;color:var(--muted);font:500 11px var(--font-mono);letter-spacing:.16em}
.showcase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.showcase-card{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:var(--radius);background:var(--bg-2);transition:border-color .3s ease,transform .35s ease}
.showcase-card.featured{grid-column:1/-1;display:grid;grid-template-columns:1.4fr .6fr;min-height:380px}
.showcase-media{position:relative;min-height:240px;overflow:hidden;background:#050505}
.showcase-media.portrait{aspect-ratio:9/16;max-height:480px;min-height:300px}
.showcase-media.landscape{aspect-ratio:16/9}
.showcase-card.featured .showcase-media{min-height:380px;aspect-ratio:auto}
.showcase-media video{width:100%;height:100%;min-height:inherit;display:block;object-fit:cover;background:#050505}
.showcase-overlay{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,transparent 42%,rgba(10,10,10,.72));display:flex;align-items:flex-end;padding:20px}
.showcase-badge{position:absolute;top:18px;right:18px;width:46px;height:46px;display:grid;place-items:center;border:1px solid rgba(239,234,226,.28);border-radius:50%;background:rgba(10,10,10,.5);color:var(--cream);backdrop-filter:blur(8px)}
.showcase-body{display:flex;flex-direction:column;justify-content:center;padding:28px}
.showcase-body .eyebrow{margin-bottom:10px}
.showcase-body h3{font-family:var(--font-display);font-size:22px;letter-spacing:-.03em;margin:0 0 10px}
.showcase-card.featured .showcase-body h3{font-size:32px}
.showcase-meta{color:var(--muted-2);font:500 10px var(--font-mono);letter-spacing:.1em}
.showcase-card:not(.featured) .showcase-body{padding:18px 20px 22px}
.showcase-card:not(.featured) .showcase-body h3{font-size:17px}

/* SYSTEMS STRIP / NOW / SERVICES */
.systems-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:56px;padding:0;border:1px solid var(--line);border-radius:var(--radius);background:transparent;overflow:hidden}
.systems-strip article{padding:18px 16px;border-right:1px solid var(--line)}
.systems-strip article:last-child{border-right:none}
.systems-strip b{display:block;color:var(--cream);font-family:var(--font-display);font-size:14px;margin-bottom:6px;letter-spacing:-.02em}
.systems-strip span{color:var(--muted-2);font:500 11px var(--font-mono)}
.showcase-caption{margin-top:12px;color:var(--muted);font-size:13px;line-height:1.55}
.case-toggle{display:inline-flex;align-items:center;gap:6px;margin-top:16px;padding:8px 0;border:0;background:transparent;color:var(--cream);font-size:13px;font-weight:600;cursor:pointer}
.case-toggle svg{transition:transform .25s ease}
.case-toggle[aria-expanded="true"] svg{transform:rotate(180deg)}
.case-panel{margin-top:16px;padding:16px;border:1px solid var(--line);border-radius:var(--radius);background:rgba(0,0,0,.4)}
.case-panel h4{margin:0 0 8px;color:var(--cream-soft);font:500 10px var(--font-mono);letter-spacing:.12em;text-transform:uppercase}
.case-panel p,.case-panel li{color:var(--muted);font-size:13px;line-height:1.65;margin:0 0 12px}
.case-panel ul{margin:0 0 12px;padding-left:18px}
.case-panel li{margin-bottom:4px}
.nowgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:8px}
.nowcard{padding:24px;border-radius:var(--radius)}
.nowcard .eyebrow{margin-bottom:12px}
.nowcard p{margin:0;color:var(--muted);font-size:14px;line-height:1.7}
.services{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:28px}
.service{padding:16px;border:1px solid var(--line);border-radius:var(--radius);background:rgba(0,0,0,.25)}
.service b{display:block;color:var(--cream);font-family:var(--font-display);font-size:14px;margin-bottom:8px;letter-spacing:-.02em}
.service span{color:var(--muted);font-size:12px;line-height:1.55}
.email-hint{margin-top:18px;color:var(--muted-2);font:500 12px var(--font-mono)}
.email-hint a{color:var(--cream);text-decoration:underline;text-underline-offset:3px}
.calendar-note{margin-top:14px;display:inline-flex;align-items:center;gap:8px;padding:12px 14px;border:1px dashed var(--line-strong);border-radius:var(--radius);color:var(--muted);font-size:13px;background:rgba(0,0,0,.25)}

/* FOCUS */
.brand:focus-visible,.links a:focus-visible,.cta:focus-visible,.primary:focus-visible,.secondary:focus-visible,.social:focus-visible,.menub:focus-visible,.case-toggle:focus-visible,.footlinks a:focus-visible,.mobile a:focus-visible{outline:2px solid var(--cream);outline-offset:3px;border-radius:8px}

@media(max-width:900px){
  .skillgrid,.stackgrid,.services,.systems-strip,.nowgrid{grid-template-columns:1fr 1fr}
  .pipeline{grid-template-columns:repeat(3,1fr)}
  .systems-strip article{border-right:none;border-bottom:1px solid var(--line)}
}
@media(max-width:820px){
  .links,.cta{display:none}
  .menub{display:block}
  .mobile.open{display:block;padding-bottom:18px}
  .mobile a{display:block;padding:14px 0;color:var(--muted);font-size:15px;font-weight:500;border-bottom:1px solid var(--line)}
  .hero{padding:88px 0 72px}
  .stats{grid-template-columns:1fr}
  .section{padding:80px 0}
  .head{display:block}
  .intro{margin-top:16px;max-width:none}
  .labgrid{grid-template-columns:1fr}
  .showcase-card.featured{grid-template-columns:1fr}
  .showcase-grid{grid-template-columns:1fr}
  .about{grid-template-columns:1fr;gap:36px}
  h1{font-size:clamp(40px,11vw,64px)}
}
@media(max-width:560px){
  .container{width:min(100% - 28px,1240px)}
  h1{font-size:40px}
  .card{padding:24px}
  .top{display:block}
  .num{margin-top:10px}
  .skillgrid,.stackgrid,.services,.systems-strip,.nowgrid{grid-template-columns:1fr}
  .showcase-grid{grid-template-columns:1fr}
  .pipeline{grid-template-columns:1fr 1fr}
  .contact{padding:28px 22px}
  .footerin{align-items:flex-start;flex-direction:column}
  .status{position:static;margin-top:12px}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .card:hover,.labcard:hover,.showcase-card:hover,.cta:hover,.primary:hover,.secondary:hover,.social:hover{transform:none}
  .case-toggle svg{transition:none}
  .links a:after{transition:none}
}`;

function LazyShowcaseVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSrc(src);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '280px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      src={activeSrc}
      poster={poster}
      controls
      playsInline
      preload="none"
      muted
      loop
      aria-label={alt}
    />
  );
}

function ShowcaseCard({ item }: { item: Showcase }) {
  const [open, setOpen] = useState(false);
  const panelId = `case-${item.id}`;
  return (
    <article className={`showcase-card${item.featured ? ' featured' : ''}`}>
      <div className={`showcase-media ${item.aspect}`} data-reveal="media">
        <LazyShowcaseVideo src={item.src} poster={item.poster} alt={item.alt} />
        <div className="showcase-overlay" aria-hidden="true" />
        <div className="showcase-badge" aria-hidden="true"><Play size={16} fill="currentColor" /></div>
      </div>
      <div className="showcase-body">
        <div className="eyebrow">{item.eyebrow}</div>
        <h3>{item.title}</h3>
        <div className="showcase-meta">{item.duration} · AI GENERATED</div>
        <p className="showcase-caption">{item.caption}</p>
        <button
          type="button"
          className="case-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Hide case study' : 'View case study'} <ChevronDown size={14} aria-hidden="true" />
        </button>
        {open && (
          <div className="case-panel" id={panelId}>
            <h4>Brief</h4>
            <p>{item.brief}</p>
            <h4>Process</h4>
            <ul>
              {item.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <h4>Result</h4>
            <p>{item.result}</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function AppV3Fixed() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };
  const close = () => setOpen(false);

  useEffect(() => {
    const handle = initMotion();
    return () => handle.destroy();
  }, []);

  return (
    <div className="site" data-motion-root>
      <style>{css}</style>
      <div className="grid" aria-hidden="true" />
      <header className="nav">
        <div className="container navin">
          <a href="#top" className="brand" onClick={close} aria-label="Derek Fwanten Yigo — home">
            <span className="mark" aria-hidden="true">DFY</span>
            <span>Derek Fwanten Yigo</span>
          </a>
          <nav className="links" aria-label="Primary">
            <a href="#systems">Systems</a>
            <a href="#lab">AI Lab</a>
            <a href="#now">Now</a>
            <a href="#skills">Skills</a>
            <a href="#about">About</a>
          </nav>
          <a className="cta is-magnetic" href="#contact">Let&apos;s work <ArrowUpRight size={14} aria-hidden="true" /></a>
          <button
            className="menub"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
        <div id="mobile-nav" className={`container mobile ${open ? 'open' : ''}`}>
          <a href="#systems" onClick={close}>Systems</a>
          <a href="#lab" onClick={close}>AI Lab</a>
          <a href="#now" onClick={close}>Now</a>
          <a href="#skills" onClick={close}>Skills &amp; Tech</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#contact" onClick={close}>Contact</a>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="copy">
            <div className="kicker"><span className="dot" aria-hidden="true" /> Available for freelance &amp; remote opportunities</div>
            <h1>Building <span className="grad">AI systems</span> and creative technology for real-world problems.</h1>
            <p>
              I&apos;m Derek Fwanten Yigo, an AI automation and software developer. I design workflows, AI-powered systems,
              APIs and web software—and I&apos;m exploring how generative AI can turn ideas into useful creative experiences.
            </p>
            <div className="actions">
              <a className="primary is-magnetic" href="#contact">Let&apos;s work <ChevronRight size={16} aria-hidden="true" /></a>
              <a className="secondary" href="#lab">View showcase</a>
              <button type="button" className="secondary" onClick={copy} aria-live="polite">
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                {copied ? 'Email copied' : 'Copy email'}
              </button>
            </div>
            <div className="stats">
              <div className="stat"><b>Automation first</b>n8n + APIs + AI</div>
              <div className="stat"><b>Software minded</b>React + Node + Python</div>
              <div className="stat"><b>Creative curious</b>AI video + generative media</div>
            </div>
            <div className="strip" aria-label="Focus areas">
              <span>AI SYSTEMS</span><span>AUTOMATION</span><span>SOFTWARE</span><span>CREATIVE AI</span>
            </div>
            <div className="systems-strip" aria-label="Selected systems and tools">
              {systemsStrip.map((s) => (
                <article key={s.label}>
                  <b>{s.label}</b>
                  <span>{s.detail}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="systems" className="section">
          <div className="container">
            <div className="head">
              <div>
                <div className="label">01 / AI systems</div>
                <h2>Systems I&apos;m building.</h2>
              </div>
              <p className="intro">Practical automation, AI integration and software experiments focused on useful workflows—not inflated case studies.</p>
            </div>
            <div className="list">
              {systems.map((s) => (
                <article className="card" key={s.title}>
                  <div className="top">
                    <div>
                      <div className="eyebrow">{s.eyebrow}</div>
                      <h3>{s.title}</h3>
                    </div>
                    <div className="num">{s.num}</div>
                  </div>
                  <p>{s.text}</p>
                  <div className="flow">{s.flow.map((x, i) => <span key={x}>{i ? '→ ' : ''}{x}</span>)}</div>
                  <div className="tags">{s.tags.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
                  <a className="link" href="https://github.com/Derick-UX-rbg/RicoBuildsAI" target="_blank" rel="noreferrer">
                    View repository <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lab" className="section">
          <div className="container">
            <div className="head">
              <div>
                <div className="label green">02 / AI creative lab</div>
                <h2>Experiments beyond automation.</h2>
              </div>
              <p className="intro">A growing lab for generative video, advertising, storytelling and creative automation. Real outputs can be added as experiments mature.</p>
            </div>
            <div className="showcase">
              <div className="showcase-label">SHOWCASE OUTPUTS</div>
              <div className="showcase-grid">
                {showcase.map((item) => (
                  <ShowcaseCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="labgrid">
              {lab.map((l) => {
                const Icon = l.icon;
                return (
                  <article className="labcard" key={l.title}>
                    <div className="icon" aria-hidden="true"><Icon size={19} /></div>
                    <div className="status">{l.status}</div>
                    <div className="type">{l.type}</div>
                    <h3>{l.title}</h3>
                    <p>{l.text}</p>
                    <div className="metas">{l.tools.map((x) => <span className="meta" key={x}>{x}</span>)}</div>
                    {l.href ? (
                      <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.cta ?? 'Open live product'} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>
            <div className="pipeline" aria-label="Creative pipeline">
              {['Idea', 'Research', 'Script', 'Visuals', 'Video', 'Publish'].map((x, i) => (
                <div className="step" key={x}><b>0{i + 1}</b><span>{x}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="now" className="section band-cream">
          <div className="container">
            <div className="head">
              <div>
                <div className="label">03 / Now</div>
                <h2>What I&apos;m focused on.</h2>
              </div>
              <p className="intro">A lightweight snapshot — not a blog. Updated as priorities shift.</p>
            </div>
            <div className="nowgrid">
              {nowItems.map((n) => (
                <article className="nowcard" key={n.tag}>
                  <div className="eyebrow">{n.tag}</div>
                  <p>{n.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <div className="head">
              <div>
                <div className="label">04 / Skills &amp; tech</div>
                <h2>What I work with.</h2>
              </div>
              <p className="intro">The tools matter, but the goal is always to connect them into something that works.</p>
            </div>
            <div className="skillgrid">
              {skills.map((s) => {
                const Icon = s.icon;
                return (
                  <div className="skill" key={s.title}>
                    <div className="icon" aria-hidden="true"><Icon size={18} /></div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="stackgrid" style={{ marginTop: 12 }}>
              {stack.map(([title, ...items]) => (
                <div className="stackcard" key={title}>
                  <b>{title}</b>
                  <div>{items.map((x) => <span key={x}>{x}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <div className="head">
              <div>
                <div className="label">05 / How I build</div>
                <h2>Problem first. Tools second.</h2>
              </div>
            </div>
            <div className="about">
              <div>
                <p>
                  I like building at the intersection of automation, software and emerging AI. My approach is to understand
                  the workflow first, then choose the simplest combination of tools that can make it faster, clearer or more reliable.
                </p>
                <p>
                  That means moving from a business problem to a workflow diagram, connecting APIs and AI, building the
                  interface, testing edge cases and improving the system.
                </p>
              </div>
              <div className="principles">
                <div className="principle"><b>01 — Understand</b><span>Map the problem, users, inputs, decisions and desired outcome.</span></div>
                <div className="principle"><b>02 — Design</b><span>Turn the process into a clear architecture and automation flow.</span></div>
                <div className="principle"><b>03 — Build</b><span>Connect AI, APIs, data and interfaces into a working system.</span></div>
                <div className="principle"><b>04 — Iterate</b><span>Test, debug and improve instead of pretending version one is perfect.</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials / logos: BLOCKED until Derek provides real quotes or logos.
            Hidden placeholder kept for future drop-in — do not invent content.
        <section id="testimonials" className="section" hidden aria-hidden="true">
          <div className="container">
            <div className="head"><div><div className="label">Testimonials</div><h2>What collaborators say.</h2></div></div>
            <p className="intro">Add real quotes and optional logos here when available.</p>
          </div>
        </section>
        */}

        <section id="contact" className="section">
          <div className="container">
            <div className="contact">
              <div className="label">06 / Let&apos;s build</div>
              <h2>Have a process that should be smarter?</h2>
              <p>
                Tell me what you&apos;re trying to automate, build or create. I&apos;m open to freelance work, remote
                opportunities and interesting AI projects.
              </p>
              <div className="services" aria-label="Services">
                {services.map((s) => (
                  <div className="service" key={s.title}>
                    <b>{s.title}</b>
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>
              <div className="contactrow">
                <a className="primary is-magnetic" href={MAILTO}>
                  <Mail size={15} aria-hidden="true" /> Email me <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <button type="button" className="secondary" onClick={copy} aria-live="polite">
                  {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  {copied ? 'Email copied' : 'Copy email'}
                </button>
                <a className="social" href="https://github.com/Derick-UX-rbg" target="_blank" rel="noreferrer">
                  <Github size={15} aria-hidden="true" /> GitHub
                </a>
                <a className="social" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  <Linkedin size={15} aria-hidden="true" /> LinkedIn
                </a>
              </div>
              <p className="email-hint">
                Primary contact: <a href={MAILTO}>{EMAIL}</a>
                {' '}· WhatsApp link not set — share a wa.me number to add it.
              </p>
              <div className="calendar-note">
                <Calendar size={14} aria-hidden="true" />
                No public calendar yet — email to book a call, or send a Calendly / Cal.com link to wire in.
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerin">
          <span>© 2026 Derek Fwanten Yigo — AI Builder &amp; Creative Technologist</span>
          <div className="footlinks">
            <a href="#top">Back to top</a>
            <a href="#lab">AI Lab</a>
            <a href="#now">Now</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
