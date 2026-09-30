import { useEffect, useRef, useState } from 'react';
import { initMotion } from './motion';
import './motion/styles.css';
import {
  ArrowUpRight, Bot, Check, ChevronDown, Code2, Copy, Database,
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
  --bg:#000000;
  --bg-2:#0a0a0a;
  --bg-3:#111111;
  --fg:#f5f2eb;
  --fg-soft:#d8d2c6;
  --muted:#9a948a;
  --muted-2:#6f6a62;
  --line:rgba(245,242,235,.14);
  --line-strong:rgba(245,242,235,.28);
  --ink:#0a0a0a;
  --ivory:#f3eee6;
  --ivory-soft:#ebe4d8;
  --radius:0;
  --gutter:32px;
  --font:'Inter',system-ui,sans-serif;
  --font-mono:'JetBrains Mono',ui-monospace,monospace;
  font-family:var(--font);
  font-weight:400;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button{font:inherit;cursor:pointer;background:none;border:0;color:inherit}
.site{min-height:100vh;overflow-x:hidden;background:var(--bg)}
.grid{display:none}
.container{width:min(1440px,calc(100% - (var(--gutter) * 2)));margin:auto}

/* NAV — brand left, links center, talk right */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;border-bottom:1px solid transparent;background:rgba(0,0,0,.42);backdrop-filter:blur(18px);transition:background .35s ease,border-color .35s ease,color .35s ease}
.navin{min-height:72px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px}
.brand{display:inline-flex;align-items:center;gap:10px;justify-self:start;font-size:13px;font-weight:500;letter-spacing:-.01em}
.mark{display:none}
.brand span:last-child{text-transform:none}
.links{display:flex;gap:28px;justify-self:center;color:var(--muted);font-size:13px;font-weight:400}
.links a{position:relative;padding:4px 0;transition:color .25s ease}
.links a:after{content:'';position:absolute;left:0;right:100%;bottom:0;height:1px;background:currentColor;transition:right .35s cubic-bezier(.22,1,.36,1)}
.links a:hover{color:var(--fg)}
.links a:hover:after{right:0}
.cta{justify-self:end;display:inline-flex;align-items:center;gap:6px;padding:0;font-size:13px;font-weight:500;border-bottom:1px solid currentColor;padding-bottom:2px;background:transparent;border-radius:0;color:inherit;transition:opacity .25s ease,transform .25s ease}
.cta:hover{opacity:.7;transform:translateY(-1px);background:transparent;color:inherit}
.primary{display:inline-flex;align-items:center;gap:6px;padding:0 0 3px;font-size:15px;font-weight:500;background:transparent;color:inherit;border:0;border-bottom:1px solid currentColor;border-radius:0;transition:opacity .25s ease,transform .25s ease}
.primary:hover{opacity:.7;transform:translateX(2px);background:transparent;color:inherit}
.menub{display:none;justify-self:end;padding:8px;border:1px solid var(--line);color:inherit}
.mobile{display:none}
.nav-light{background:rgba(243,238,230,.72);color:var(--ink);border-bottom-color:rgba(10,10,10,.08)}
.nav-light .links{color:rgba(10,10,10,.55)}
.nav-light .links a:hover{color:var(--ink)}
.nav-light .menub{border-color:rgba(10,10,10,.15)}

/* HERO */
.hero{padding:140px 0 110px}
.copy{max-width:1100px}
.kicker{display:inline-flex;align-items:center;gap:10px;padding:0;border:0;border-radius:0;color:var(--muted);font:400 12px/1.4 var(--font);letter-spacing:.02em;text-transform:none}
.dot{width:6px;height:6px;border-radius:50%;background:var(--fg);opacity:.85;box-shadow:none}
h1{font-family:var(--font);font-size:clamp(44px,8.2vw,96px);line-height:.96;letter-spacing:-.055em;font-weight:300;margin:28px 0 28px;max-width:15ch;text-transform:lowercase}
.grad{color:inherit;background:none;-webkit-background-clip:initial;background-clip:initial;font-weight:300}
.hero p{max-width:520px;color:var(--muted);font-size:clamp(15px,1.4vw,17px);line-height:1.65;margin:0;font-weight:400}
.actions{display:flex;flex-wrap:wrap;align-items:center;gap:22px;margin-top:40px}
.secondary,.social{display:inline-flex;align-items:center;gap:6px;padding:0 0 3px;border:0;border-bottom:1px solid var(--line-strong);border-radius:0;color:var(--fg);background:transparent;font-size:14px;font-weight:400;transition:border-color .25s ease,opacity .25s ease,transform .25s ease}
.secondary{cursor:pointer}
.secondary:hover,.social:hover{border-bottom-color:var(--fg);opacity:.8;transform:translateY(-1px);background:transparent}
.stats{display:grid;grid-template-columns:repeat(3,1fr);max-width:760px;margin-top:72px;border-top:1px solid var(--line);padding-top:4px}
.stat{padding:20px 20px 0 0;color:var(--muted-2);font:400 12px var(--font);text-transform:none;letter-spacing:0}
.stat b{display:block;color:var(--fg);font:400 15px var(--font);text-transform:lowercase;letter-spacing:-.02em;margin-bottom:6px}
.strip{display:flex;flex-wrap:wrap;gap:18px;margin-top:40px}
.strip span{padding:0;border:0;border-radius:0;color:var(--muted-2);background:transparent;font:400 12px var(--font);letter-spacing:.04em;text-transform:lowercase}

/* SECTIONS — alternating full-bleed */
.section{padding:120px 0;border-top:1px solid var(--line)}
.section.band-light{background:var(--ivory);color:var(--ink);border-top-color:transparent}
.section.band-light .label,.section.band-light .intro,.section.band-light .card p,.section.band-light .muted{color:rgba(10,10,10,.55)}
.section.band-light .label{color:rgba(10,10,10,.45)}
.section.band-light .eyebrow,.section.band-light .num{color:rgba(10,10,10,.5)}
.section.band-light .card,.section.band-light .labcard,.section.band-light .skill,.section.band-light .stackcard,.section.band-light .principle,.section.band-light .nowcard,.section.band-light .service,.section.band-light .step{background:transparent;border-color:rgba(10,10,10,.12)}
.section.band-light .flow{background:rgba(10,10,10,.04);border-color:rgba(10,10,10,.1);color:rgba(10,10,10,.7)}
.section.band-light .flow span{background:rgba(10,10,10,.05)}
.section.band-light .tag,.section.band-light .meta,.section.band-light .stackcard span{border-color:rgba(10,10,10,.12);color:rgba(10,10,10,.55);background:transparent}
.section.band-light .link,.section.band-light .case-toggle{color:var(--ink)}
.section.band-light .icon{border-color:rgba(10,10,10,.15);color:var(--ink);background:transparent}
.section.band-light .nowcard p,.section.band-light .skill p,.section.band-light .principle span{color:rgba(10,10,10,.55)}
.section.band-light .stackcard b,.section.band-light .service b,.section.band-light .step b{color:var(--ink)}
.section.band-light .step span,.section.band-light .service span{color:rgba(10,10,10,.5)}
.section.band-light .card:hover,.section.band-light .labcard:hover,.section.band-light .nowcard:hover,.section.band-light .skill:hover{background:rgba(10,10,10,.04);border-color:rgba(10,10,10,.18);transform:none}
.head{display:flex;align-items:end;justify-content:space-between;gap:48px;margin-bottom:56px}
.label{color:var(--muted);font:400 12px var(--font);letter-spacing:.08em;text-transform:lowercase}
.green{color:var(--fg-soft)}
h2{margin:14px 0 0;font-family:var(--font);font-size:clamp(36px,5.4vw,72px);letter-spacing:-.05em;line-height:1;font-weight:300;max-width:12ch;text-transform:lowercase}
.intro{max-width:360px;color:var(--muted);line-height:1.65;font-size:15px}

/* CARDS — warm ivory hover on dark */
.list{display:grid;gap:0}
.card,.labcard,.skill,.stackcard,.principle,.nowcard{border:1px solid var(--line);background:transparent}
.card{padding:36px 0;border-radius:0;border-left:0;border-right:0;border-top:0;background:transparent;transition:background .35s ease,color .35s ease,padding .35s ease,border-color .35s ease}
.card + .card{border-top:1px solid var(--line)}
.card:hover{background:var(--ivory);color:var(--ink);padding-left:28px;padding-right:28px;border-color:transparent;transform:none}
.card:hover p,.card:hover .eyebrow,.card:hover .num,.card:hover .tag{color:rgba(10,10,10,.55)}
.card:hover .flow{background:rgba(10,10,10,.05);border-color:rgba(10,10,10,.1);color:rgba(10,10,10,.75)}
.card:hover .link{color:var(--ink);border-bottom-color:var(--ink)}
.top{display:flex;justify-content:space-between;gap:24px}
.eyebrow,.num{font:400 12px var(--font);letter-spacing:.06em;text-transform:lowercase}
.eyebrow{color:var(--fg-soft)}
.num{color:var(--muted-2);font-size:13px}
.card h3{font-family:var(--font);font-size:clamp(22px,2.4vw,32px);letter-spacing:-.035em;margin:12px 0 14px;font-weight:400}
.card p,.labcard p{color:var(--muted);line-height:1.65;font-size:15px;margin:0 0 22px}
.flow{display:flex;flex-wrap:wrap;gap:8px;padding:12px 0;border:0;border-top:1px solid var(--line);background:transparent;border-radius:0;font:400 12px var(--font);color:var(--fg-soft)}
.flow span{padding:0;border-radius:0;background:transparent}
.tags,.metas{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
.tag,.meta{padding:0;border:0;border-radius:0;color:var(--muted-2);font:400 12px var(--font)}
.link{display:inline-flex;align-items:center;gap:6px;margin-top:18px;color:var(--fg);font-size:14px;font-weight:500;border-bottom:1px solid currentColor;padding-bottom:2px;transition:opacity .25s ease,transform .25s ease}
.link:hover{opacity:.7;transform:translateX(3px);border-bottom-color:currentColor}

/* LAB */
.labgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:8px}
.labcard{position:relative;overflow:hidden;padding:32px;border-radius:0;min-height:260px;transition:background .35s ease,color .35s ease,border-color .35s ease}
.labcard:after{display:none}
.labcard:hover{background:var(--ivory);color:var(--ink);border-color:transparent;transform:none}
.labcard:hover p,.labcard:hover .type,.labcard:hover .status,.labcard:hover .meta{color:rgba(10,10,10,.55)}
.labcard:hover .icon{border-color:rgba(10,10,10,.2);color:var(--ink)}
.labcard:hover .link{color:var(--ink)}
.icon{width:40px;height:40px;display:grid;place-items:center;border:1px solid var(--line);border-radius:0;color:var(--fg);background:transparent}
.type{margin-top:28px;color:var(--muted);font:400 12px var(--font);letter-spacing:.06em;text-transform:lowercase}
.labcard h3{font-family:var(--font);font-size:24px;margin:10px 0;letter-spacing:-.03em;font-weight:400}
.status{position:absolute;top:28px;right:28px;color:var(--fg-soft);font:400 12px var(--font);letter-spacing:.06em;text-transform:lowercase}
.pipeline{display:grid;grid-template-columns:repeat(6,1fr);gap:0;margin-top:36px;border-top:1px solid var(--line)}
.step{padding:18px 12px;border:0;border-right:1px solid var(--line);border-radius:0;background:transparent;text-align:left}
.step:last-child{border-right:0}
.step b{display:block;color:var(--fg);font:400 12px var(--font);margin-bottom:6px;letter-spacing:.04em}
.step span{color:var(--muted);font-size:13px;text-transform:lowercase}

/* SKILLS / STACK */
.skillgrid,.stackgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.skill{min-height:180px;padding:24px;border-radius:0;transition:background .35s ease,color .35s ease}
.skill:hover{background:var(--ivory);color:var(--ink);border-color:transparent}
.skill:hover p{color:rgba(10,10,10,.55)}
.skill:hover .icon{border-color:rgba(10,10,10,.2);color:var(--ink)}
.skill h3{font-family:var(--font);font-size:18px;margin:20px 0 10px;letter-spacing:-.02em;font-weight:400;text-transform:lowercase}
.skill p{color:var(--muted);line-height:1.65;font-size:14px;margin:0}
.stackcard{padding:20px;border-radius:0}
.stackcard b{display:block;color:var(--fg);font:400 12px var(--font);letter-spacing:.06em;margin-bottom:14px;text-transform:lowercase}
.stackcard div{display:flex;flex-wrap:wrap;gap:8px}
.stackcard span{padding:0;border-radius:0;background:transparent;border:0;color:var(--muted);font:400 13px var(--font)}

/* ABOUT — editorial two-column + rules */
.about{display:grid;grid-template-columns:1.1fr .9fr;gap:64px;padding-top:8px;border-top:1px solid var(--line)}
.about p{color:var(--muted);line-height:1.75;font-size:17px;font-weight:300}
.principles{display:grid;gap:0}
.principle{padding:18px 0;border-radius:0;border:0;border-bottom:1px solid var(--line);background:transparent}
.principle:first-child{border-top:1px solid var(--line)}
.principle b{display:block;font-family:var(--font);font-size:15px;margin-bottom:6px;letter-spacing:-.02em;font-weight:500}
.principle span{color:var(--muted);font-size:14px;line-height:1.6}

/* CONTACT */
.contact{padding:0;border:0;border-radius:0;background:transparent}
.contact h2{max-width:16ch}
.contact p{max-width:560px;color:var(--muted);line-height:1.7;font-size:16px;font-weight:300}
.contactrow{display:flex;flex-wrap:wrap;align-items:center;gap:22px;margin-top:32px}
main{padding-top:72px}
.footer{padding:48px 0 40px;color:var(--muted-2);font-size:13px;border-top:1px solid var(--line)}
.footerin{display:flex;flex-direction:column;align-items:stretch;gap:28px}
.foot-wordmark{font-size:clamp(48px,12vw,140px);line-height:.9;letter-spacing:-.06em;font-weight:300;text-transform:lowercase;color:var(--fg);margin:12px 0 8px}
.foot-row{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
.footlinks{display:flex;gap:22px;font-size:13px}
.footlinks a{border-bottom:1px solid transparent;padding-bottom:2px}
.footlinks a:hover{color:var(--fg);border-bottom-color:currentColor}

/* SHOWCASE — cinematic media */
.showcase{margin-top:8px;margin-bottom:40px}
.showcase-label{margin:0 0 16px;color:var(--muted);font:400 12px var(--font);letter-spacing:.08em;text-transform:lowercase}
.showcase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.showcase-card{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:0;background:var(--bg-2);transition:border-color .3s ease}
.showcase-card:hover{transform:none;border-color:var(--line-strong)}
.showcase-card.featured{grid-column:1/-1;display:grid;grid-template-columns:1.45fr .55fr;min-height:420px}
.showcase-media{position:relative;min-height:260px;overflow:hidden;background:#000}
.showcase-media.portrait{aspect-ratio:9/16;max-height:520px;min-height:320px}
.showcase-media.landscape{aspect-ratio:16/9}
.showcase-card.featured .showcase-media{min-height:420px;aspect-ratio:auto}
.showcase-media video{width:100%;height:100%;min-height:inherit;display:block;object-fit:cover;background:#000}
.showcase-overlay{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,.55));display:flex;align-items:flex-end;padding:20px}
.showcase-badge{position:absolute;top:16px;right:16px;width:40px;height:40px;display:grid;place-items:center;border:1px solid rgba(245,242,235,.25);border-radius:0;background:rgba(0,0,0,.35);color:var(--fg);backdrop-filter:blur(6px)}
.showcase-body{display:flex;flex-direction:column;justify-content:center;padding:28px}
.showcase-body .eyebrow{margin-bottom:10px}
.showcase-body h3{font-family:var(--font);font-size:22px;letter-spacing:-.03em;margin:0 0 10px;font-weight:400}
.showcase-card.featured .showcase-body h3{font-size:34px;font-weight:300;text-transform:lowercase}
.showcase-meta{color:var(--muted-2);font:400 12px var(--font);letter-spacing:.04em;text-transform:lowercase}
.showcase-card:not(.featured) .showcase-body{padding:16px 18px 20px}
.showcase-card:not(.featured) .showcase-body h3{font-size:16px}

/* Floating case-study hover preview */
.case-float{position:fixed;top:50%;left:50%;width:min(280px,34vw);aspect-ratio:3/4;pointer-events:none;z-index:60;opacity:0;transform:translate(-50%,-50%) scale(.92);overflow:hidden;border:1px solid rgba(245,242,235,.2);background:#111;box-shadow:0 30px 80px rgba(0,0,0,.45);transition:opacity .35s ease,transform .45s cubic-bezier(.22,1,.36,1)}
.case-float.is-on{opacity:1;transform:translate(-50%,-50%) scale(1)}
.case-float img,.case-float video{width:100%;height:100%;object-fit:cover;display:block}

/* SYSTEMS STRIP / NOW / SERVICES */
.systems-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:64px;padding:0;border:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);border-radius:0;background:transparent;overflow:hidden}
.systems-strip article{padding:20px 16px;border-right:1px solid var(--line)}
.systems-strip article:last-child{border-right:none}
.systems-strip b{display:block;color:var(--fg);font-family:var(--font);font-size:14px;margin-bottom:6px;letter-spacing:-.02em;font-weight:500;text-transform:lowercase}
.systems-strip span{color:var(--muted-2);font:400 12px var(--font)}
.showcase-caption{margin-top:12px;color:var(--muted);font-size:14px;line-height:1.55}
.case-toggle{display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:0 0 2px;border:0;border-bottom:1px solid currentColor;background:transparent;color:var(--fg);font-size:13px;font-weight:500;cursor:pointer}
.case-toggle svg{transition:transform .25s ease}
.case-toggle[aria-expanded="true"] svg{transform:rotate(180deg)}
.case-panel{margin-top:16px;padding:16px 0 0;border:0;border-top:1px solid var(--line);border-radius:0;background:transparent}
.case-panel h4{margin:0 0 8px;color:var(--fg-soft);font:400 12px var(--font);letter-spacing:.06em;text-transform:lowercase}
.case-panel p,.case-panel li{color:var(--muted);font-size:14px;line-height:1.65;margin:0 0 12px}
.case-panel ul{margin:0 0 12px;padding-left:18px}
.case-panel li{margin-bottom:4px}
.nowgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:8px}
.nowcard{padding:24px;border-radius:0;transition:background .3s ease}
.nowcard .eyebrow{margin-bottom:12px}
.nowcard p{margin:0;color:var(--muted);font-size:15px;line-height:1.65}
.services{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:36px;border-top:1px solid var(--line)}
.service{padding:18px 16px 18px 0;border:0;border-right:1px solid var(--line);border-radius:0;background:transparent}
.service:last-child{border-right:0}
.service b{display:block;color:var(--fg);font-family:var(--font);font-size:15px;margin-bottom:8px;letter-spacing:-.02em;font-weight:500;text-transform:lowercase}
.service span{color:var(--muted);font-size:13px;line-height:1.55}
.email-hint{margin-top:20px;color:var(--muted-2);font:400 13px var(--font)}
.email-hint a{color:var(--fg);text-decoration:underline;text-underline-offset:3px}
.calendar-note{margin-top:14px;display:inline-flex;align-items:center;gap:8px;padding:0;border:0;border-radius:0;color:var(--muted);font-size:13px;background:transparent}

.brand:focus-visible,.links a:focus-visible,.cta:focus-visible,.primary:focus-visible,.secondary:focus-visible,.social:focus-visible,.menub:focus-visible,.case-toggle:focus-visible,.footlinks a:focus-visible,.mobile a:focus-visible{outline:2px solid var(--fg);outline-offset:3px}

@media(max-width:900px){
  .skillgrid,.stackgrid,.services,.systems-strip,.nowgrid{grid-template-columns:1fr 1fr}
  .pipeline{grid-template-columns:repeat(3,1fr)}
  .systems-strip article{border-right:none;border-bottom:1px solid var(--line)}
  .step,.service{border-right:0;border-bottom:1px solid var(--line)}
  .case-float{display:none}
}
@media(max-width:820px){
  .navin{display:flex;justify-content:space-between}
  .links,.cta{display:none}
  .menub{display:block}
  .mobile.open{display:block;padding:8px 0 20px}
  .mobile a{display:block;padding:14px 0;color:var(--muted);font-size:15px;font-weight:400;border-bottom:1px solid var(--line)}
  .hero{padding:120px 0 80px}
  .stats{grid-template-columns:1fr}
  .section{padding:88px 0}
  .head{display:block}
  .intro{margin-top:16px;max-width:none}
  .labgrid{grid-template-columns:1fr}
  .showcase-card.featured{grid-template-columns:1fr}
  .showcase-grid{grid-template-columns:1fr}
  .about{grid-template-columns:1fr;gap:36px}
  h1{font-size:clamp(40px,11vw,64px)}
  main{padding-top:72px}
}
@media(max-width:560px){
  :root{--gutter:20px}
  h1{font-size:38px}
  .card{padding:24px 0}
  .card:hover{padding-left:16px;padding-right:16px}
  .top{display:block}
  .num{margin-top:10px}
  .skillgrid,.stackgrid,.services,.systems-strip,.nowgrid{grid-template-columns:1fr}
  .showcase-grid{grid-template-columns:1fr}
  .pipeline{grid-template-columns:1fr 1fr}
  .contact{padding:0}
  .foot-row{align-items:flex-start;flex-direction:column}
  .status{position:static;margin-top:12px}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .card:hover,.labcard:hover,.showcase-card:hover,.cta:hover,.primary:hover,.secondary:hover,.social:hover,.link:hover{transform:none}
  .case-toggle svg,.case-float{transition:none}
  .links a:after{transition:none}
  .case-float{display:none!important}
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
    <article className={`showcase-card${item.featured ? ' featured' : ''}`} data-case-preview={item.poster}>
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
      <div className="case-float" aria-hidden="true"><img alt="" /></div>
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
          <a className="cta is-magnetic" href="#contact">Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" /></a>
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
        <section className="hero container" data-nav-theme="dark">
          <div className="copy">
            <div className="kicker"><span className="dot" aria-hidden="true" /> Available for freelance &amp; remote opportunities</div>
            <h1>Building <span className="grad">AI systems</span> and creative technology for real-world problems.</h1>
            <p>
              I&apos;m Derek Fwanten Yigo, an AI automation and software developer. I design workflows, AI-powered systems,
              APIs and web software—and I&apos;m exploring how generative AI can turn ideas into useful creative experiences.
            </p>
            <div className="actions">
              <a className="primary is-magnetic" href="#contact">Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" /></a>
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

        <section id="systems" className="section band-light" data-nav-theme="light">
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

        <section id="lab" className="section" data-nav-theme="dark">
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

        <section id="now" className="section band-light" data-nav-theme="light">
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

        <section id="skills" className="section" data-nav-theme="dark">
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

        <section id="about" className="section band-light" data-nav-theme="light">
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

        <section id="contact" className="section" data-nav-theme="dark">
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
          <div className="foot-wordmark" aria-hidden="true">derek fwanten yigo</div>
          <div className="foot-row">
            <span>© 2026 — AI builder &amp; creative technologist</span>
            <div className="footlinks">
              <a href="#top">Back to top</a>
              <a href="#lab">AI Lab</a>
              <a href="#now">Now</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
