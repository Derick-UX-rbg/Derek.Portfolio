import { useEffect, useRef, useState } from 'react';
import { initMotion } from './motion';
import './motion/styles.css';
import './theme/theme.css';
import { ThemeToggle } from './theme/ThemeToggle';
import {
  ArrowUpRight, Bot, Check, ChevronDown, ChevronRight, Code2, Copy, Database,
  Github, Mail, Menu, Play, Sparkles, Workflow, X, Cpu, Layers3
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type System = { num: string; eyebrow: string; title: string; text: string; flow: string[]; tags: string[] };
type Lab = { icon: LucideIcon; type: string; title: string; text: string; tools: string[]; status: string; href?: string; cta?: string };
type Skill = { icon: LucideIcon; title: string; text: string };
type Showcase = {
  id: string;
  src: string;
  poster: string;
  posterWebp?: string;
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
    posterWebp: '/assets/showcase/posters/ttw-autos.webp',
    title: 'TTW Autos — AI Commercial',
    eyebrow: 'FEATURED · AUTOMOTIVE',
    duration: '10 SEC',
    aspect: 'landscape',
    featured: true,
    alt: 'TTW Autos AI-generated automotive commercial showing dealership branding and luxury vehicles',
    caption: 'AI-produced 10s commercial for TTW Autos — dealership presence and vehicle appeal.',
    brief: 'Create a short automotive commercial for TTW Autos (rentals & sales) with a premium vehicle focus, produced entirely with generative AI video — no traditional film crew.',
    process: ['Brief and brand cues from dealership context', 'Scene and shot direction for generative video', 'AI video production and pass selection', 'Edit and polish into a 10-second showcase cut'],
    result: 'A 10-second landscape commercial that reads as a dealership spot: storefront branding, luxury vehicles, and a clean product-led close.'
  },
  {
    id: 'construction-site',
    src: '/assets/showcase/construction-site.mp4',
    poster: '/assets/showcase/posters/construction-site.jpg',
    posterWebp: '/assets/showcase/posters/construction-site.webp',
    title: 'AI Construction Commercial',
    eyebrow: 'AI VIDEO · COMMERCIAL',
    duration: '10 SEC',
    aspect: 'landscape',
    alt: 'AI-generated construction commercial featuring on-site supervisor with hard hat and tablet',
    caption: 'Cinematic site-supervision commercial — active build environment, tablet-led presence.',
    brief: 'Produce a commercial-style clip for a construction / site-supervision narrative: professional presence on an active build site, directed for generative AI production.',
    process: ['Scene brief (site, wardrobe, props)', 'Generative AI video production', 'Select and trim the strongest pass for showcase'],
    result: 'A 10-second landscape commercial with warm daylight, hard-hat presence, and a tablet-led inspect-and-manage beat.'
  },
  {
    id: 'fragrance-campaign',
    src: '/assets/showcase/fragrance-campaign.mp4',
    poster: '/assets/showcase/posters/fragrance-campaign.jpg',
    posterWebp: '/assets/showcase/posters/fragrance-campaign.webp',
    title: 'KAVIEL SCENTS',
    eyebrow: 'AI VIDEO · LUXURY',
    duration: '8 SEC',
    aspect: 'landscape',
    alt: 'KAVIEL SCENTS AI-generated luxury fragrance campaign with evening formal aesthetic',
    caption: 'Luxury fragrance campaign for KAVIEL SCENTS — formal evening look, product mist, warm lobby light.',
    brief: 'Luxury fragrance advertising concept for KAVIEL SCENTS: evening formal aesthetic, product as hero, hotel/gala atmosphere — produced as an AI commercial.',
    process: ['Creative direction (wardrobe, bottle, mist)', 'Generative AI video production', 'Trim to an 8-second campaign beat'],
    result: 'An 8-second luxury fragrance clip — tuxedo, gold bottle mist, shallow-depth lobby glow.'
  },
  {
    id: 'luxury-interior',
    src: '/assets/showcase/luxury-interior.mp4',
    poster: '/assets/showcase/posters/luxury-interior.jpg',
    posterWebp: '/assets/showcase/posters/luxury-interior.webp',
    title: 'Risa Luxury Homes LTD',
    eyebrow: 'AI VIDEO · INTERIOR',
    duration: '10 SEC',
    aspect: 'portrait',
    alt: 'Risa Luxury Homes LTD AI-generated luxury interior walkthrough of an open-plan living and dining space',
    caption: 'Portrait walkthrough for Risa Luxury Homes LTD — high-end open-plan living and dining.',
    brief: 'Interior lifestyle commercial for Risa Luxury Homes LTD — calm layered lighting and material detail in a premium living space, produced with generative AI video.',
    process: ['Spatial and mood brief', 'Generative AI video production', 'Portrait framing for mobile-first showcase'],
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

const css = `:root{color-scheme:dark;font-family:'Plus Jakarta Sans',system-ui,sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#050810;color:#e5edf6}a{color:inherit;text-decoration:none}button{font:inherit}.site{min-height:100vh;overflow-x:hidden;background:radial-gradient(circle at 75% 3%,rgba(34,211,238,.11),transparent 30rem),radial-gradient(circle at 10% 35%,rgba(52,211,153,.05),transparent 24rem),#050810}.grid{position:fixed;inset:0;pointer-events:none;opacity:.38;background-image:linear-gradient(rgba(148,163,184,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.045) 1px,transparent 1px);background-size:36px 36px;mask-image:linear-gradient(#000,transparent 86%)}.container{width:min(1120px,calc(100% - 40px));margin:auto}.nav{position:sticky;top:0;z-index:20;border-bottom:1px solid rgba(148,163,184,.12);background:rgba(5,8,16,.86);backdrop-filter:blur(20px) saturate(1.1);-webkit-backdrop-filter:blur(20px) saturate(1.1)}.navin{min-height:70px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{display:flex;align-items:center;gap:11px;font-weight:800}.mark{width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(103,232,249,.35);border-radius:11px;color:#67e8f9;background:rgba(103,232,249,.08);font:700 12px 'JetBrains Mono',monospace;box-shadow:0 0 26px rgba(103,232,249,.08)}.links{display:flex;gap:26px;color:#94a3b8;font-size:13px;font-weight:600}.links a:hover,.footlinks a:hover{color:#67e8f9}.cta,.primary{display:inline-flex;align-items:center;gap:8px;border-radius:10px;background:#22d3ee;color:#061017;font-weight:800}.cta{padding:10px 14px;font-size:12px}.nav-actions{display:flex;align-items:center;gap:10px;flex-shrink:0}.primary{padding:13px 18px;font-size:13px}.cta:hover,.primary:hover{transform:translateY(-1px);background:#67e8f9;box-shadow:0 12px 35px rgba(34,211,238,.16)}.menub{display:none;padding:8px;border:1px solid #1e293b;border-radius:10px;background:#0b1220;color:#cbd5e1}.mobile{display:none}.hero{padding:112px 0 92px}.copy{max-width:850px}.kicker{display:inline-flex;align-items:center;gap:9px;padding:7px 11px;border:1px solid rgba(52,211,153,.25);background:rgba(52,211,153,.07);color:#6ee7b7;border-radius:999px;font:600 11px 'JetBrains Mono',monospace}.dot{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 14px #34d399}h1{font-size:clamp(42px,7vw,78px);line-height:1.01;letter-spacing:-.06em;margin:22px 0}.grad{background:linear-gradient(100deg,#e5edf6,#67e8f9 52%,#6ee7b7);-webkit-background-clip:text;background-clip:text;color:transparent}.hero p{max-width:760px;color:#9aa9bc;font-size:clamp(16px,2vw,19px);line-height:1.75;margin:0}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.secondary,.social{display:inline-flex;align-items:center;gap:8px;padding:12px 17px;border:1px solid #263244;border-radius:10px;color:#cbd5e1;background:#0b1220;font-size:13px;font-weight:700}.secondary{cursor:pointer}.secondary:hover,.social:hover{border-color:#3b4b61}.stats{display:grid;grid-template-columns:repeat(3,1fr);max-width:720px;margin-top:54px;border-top:1px solid #1b2635}.stat{padding:18px 18px 0 0;color:#7f8da1;font:500 11px 'JetBrains Mono',monospace;text-transform:uppercase}.stat b{display:block;color:#d8e3ef;font:700 13px 'Plus Jakarta Sans',sans-serif;text-transform:none;margin-bottom:5px}.strip{display:flex;flex-wrap:wrap;gap:8px;margin-top:40px}.strip span{padding:8px 10px;border:1px solid #172233;border-radius:7px;color:#637287;background:#080d16;font:600 9px 'JetBrains Mono',monospace;letter-spacing:.13em}.section{padding:96px 0;border-top:1px solid rgba(148,163,184,.11)}.head{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:34px}.label{color:#67e8f9;font:600 11px 'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase}.green{color:#6ee7b7}h2{margin:8px 0 0;font-size:clamp(28px,4vw,44px);letter-spacing:-.05em}.intro{max-width:500px;color:#8391a5;line-height:1.7;font-size:14px}.list{display:grid;gap:16px}.card,.labcard,.skill,.stackcard,.principle{border:1px solid #1b2737;background:#0a111c}.card{padding:28px;border-radius:18px;background:linear-gradient(145deg,rgba(15,23,36,.9),rgba(8,13,22,.88));transition:.25s;box-shadow:0 16px 55px rgba(0,0,0,.12)}.card:hover,.labcard:hover{transform:translateY(-4px);border-color:rgba(103,232,249,.28);box-shadow:0 22px 60px rgba(0,0,0,.2),0 0 28px rgba(34,211,238,.05)}.top{display:flex;justify-content:space-between;gap:20px}.eyebrow,.num{font:700 10px 'JetBrains Mono',monospace;letter-spacing:.1em}.eyebrow{color:#67e8f9}.num{color:#526174;font-size:12px}.card h3{font-size:23px;letter-spacing:-.035em;margin:9px 0 10px}.card p,.labcard p{color:#9aa9bc;line-height:1.7;font-size:14px;margin:0 0 22px}.flow{display:flex;flex-wrap:wrap;gap:7px;padding:13px;border:1px solid #182333;background:#060a11;border-radius:11px;font:500 11px 'JetBrains Mono',monospace;color:#b7c5d6}.flow span{padding:7px 8px;border-radius:6px;background:#111a29}.tags,.metas{display:flex;flex-wrap:wrap;gap:7px;margin-top:14px}.tag,.meta{padding:5px 8px;border:1px solid #263244;border-radius:6px;color:#7f8da1;font:500 10px 'JetBrains Mono',monospace}.link{display:inline-flex;align-items:center;gap:5px;margin-top:20px;color:#67e8f9;font-size:12px;font-weight:800}.labgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.labcard{position:relative;overflow:hidden;padding:25px;border-radius:18px;min-height:260px;transition:.25s}.labcard:after{content:'';position:absolute;width:180px;height:180px;right:-70px;top:-80px;border-radius:50%;background:rgba(103,232,249,.07)}.icon{width:40px;height:40px;display:grid;place-items:center;border:1px solid rgba(103,232,249,.2);border-radius:11px;color:#67e8f9;background:rgba(103,232,249,.06)}.type{margin-top:20px;color:#67e8f9;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.13em}.labcard h3{font-size:20px;margin:8px 0}.status{position:absolute;top:25px;right:25px;color:#6ee7b7;font:600 9px 'JetBrains Mono',monospace}.pipeline{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:24px}.step{padding:13px 8px;border:1px solid #1a2637;border-radius:10px;background:#090f19;text-align:center}.step b{display:block;color:#67e8f9;font:700 10px 'JetBrains Mono',monospace;margin-bottom:6px}.step span{color:#718096;font-size:10px}.skillgrid,.stackgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.skill{min-height:190px;padding:22px;border-radius:16px}.skill h3{font-size:15px;margin:18px 0 8px}.skill p{color:#8190a4;line-height:1.7;font-size:12px;margin:0}.stackcard{padding:20px;border-radius:14px}.stackcard b{display:block;color:#d9e4ef;font-size:12px;margin-bottom:13px}.stackcard div{display:flex;flex-wrap:wrap;gap:6px}.stackcard span{padding:6px 8px;border-radius:6px;background:#111a29;color:#8492a5;font:500 9px 'JetBrains Mono',monospace}.about{display:grid;grid-template-columns:1.1fr .9fr;gap:70px}.about p{color:#9aa9bc;line-height:1.9;font-size:15px}.principles{display:grid;gap:10px}.principle{padding:16px;border-radius:12px}.principle b{display:block;font-size:13px;margin-bottom:4px}.principle span{color:#77869a;font-size:12px;line-height:1.6}.contact{padding:42px;border:1px solid rgba(103,232,249,.2);border-radius:20px;background:radial-gradient(circle at 85% 10%,rgba(34,211,238,.15),transparent 20rem),radial-gradient(circle at 10% 90%,rgba(110,231,183,.04),transparent 16rem),#0a111c}.contact p{max-width:650px;color:#94a3b8;line-height:1.75}.contactrow{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.footer{padding:28px 0 42px;color:#607086;font-size:11px}.footerin{display:flex;align-items:center;justify-content:space-between;gap:20px}.footlinks{display:flex;gap:16px}.showcase{margin-top:8px;margin-bottom:28px}.labgrid{margin-top:8px}.showcase-label{margin:0 0 14px;color:#6ee7b7;font:700 10px 'JetBrains Mono',monospace;letter-spacing:.14em}.showcase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.showcase-card{position:relative;overflow:hidden;border:1px solid #1b2737;border-radius:18px;background:linear-gradient(145deg,rgba(15,23,36,.92),rgba(8,13,22,.9));transition:.25s;box-shadow:0 16px 55px rgba(0,0,0,.12)}.showcase-card:hover{transform:translateY(-4px);border-color:rgba(103,232,249,.3);box-shadow:0 24px 65px rgba(0,0,0,.24),0 0 32px rgba(34,211,238,.06)}.showcase-card.featured{grid-column:1/-1;display:grid;grid-template-columns:1.4fr .6fr;min-height:340px}.showcase-media{position:relative;min-height:220px;overflow:hidden;background:#05090f}.showcase-media.portrait{aspect-ratio:9/16;max-height:460px;min-height:280px}.showcase-media.landscape{aspect-ratio:16/9}.showcase-card.featured .showcase-media{min-height:340px;aspect-ratio:auto}.showcase-media video{width:100%;height:100%;min-height:inherit;display:block;object-fit:cover;background:#03060c;transform-origin:center center}.showcase-overlay{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,transparent 42%,rgba(3,6,12,.86));display:flex;align-items:flex-end;padding:18px}.showcase-badge{position:absolute;top:16px;right:16px;width:42px;height:42px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.2);border-radius:50%;background:rgba(7,11,18,.65);color:#fff}.showcase-body{display:flex;flex-direction:column;justify-content:center;padding:22px}.showcase-body .eyebrow{margin-bottom:8px}.showcase-body h3{font-size:20px;letter-spacing:-.03em;margin:0 0 8px}.showcase-card.featured .showcase-body h3{font-size:26px}.showcase-meta{color:#7f8da1;font:500 10px 'JetBrains Mono',monospace;letter-spacing:.08em}.showcase-card:not(.featured) .showcase-body{padding:16px 18px 18px}.showcase-card:not(.featured) .showcase-body h3{font-size:16px}.showcase-poster{position:absolute;inset:0;z-index:0;display:block;pointer-events:none}.showcase-poster img{width:100%;height:100%;object-fit:cover;display:block}.showcase-media video{position:relative;z-index:1}.skip-link{position:absolute;left:12px;top:-56px;z-index:100;padding:10px 14px;border-radius:8px;background:#22d3ee;color:#061017;font-size:13px;font-weight:800}.skip-link:focus,.skip-link:focus-visible{top:12px;outline:2px solid #67e8f9;outline-offset:3px}

.systems-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:48px;padding:16px;border:1px solid rgba(103,232,249,.12);border-radius:16px;background:linear-gradient(145deg,rgba(15,23,36,.75),rgba(8,13,22,.7))}.systems-strip article{padding:10px 8px;border-right:1px solid rgba(148,163,184,.1)}.systems-strip article:last-child{border-right:none}.systems-strip b{display:block;color:#d8e3ef;font-size:12px;margin-bottom:4px}.systems-strip span{color:#6b7a8f;font:500 10px 'JetBrains Mono',monospace}.showcase-caption{margin-top:10px;color:#8492a5;font-size:12px;line-height:1.55}.case-toggle{display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:8px 0;border:0;background:transparent;color:#67e8f9;font-size:12px;font-weight:800;cursor:pointer}.case-toggle svg{transition:transform .2s ease}.case-toggle[aria-expanded="true"] svg{transform:rotate(180deg)}.case-panel{margin-top:14px;padding:14px;border:1px solid #1a2637;border-radius:12px;background:#060a11}.case-panel h4{margin:0 0 6px;color:#67e8f9;font:700 10px 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase}.case-panel p,.case-panel li{color:#9aa9bc;font-size:12px;line-height:1.65;margin:0 0 12px}.case-panel ul{margin:0 0 12px;padding-left:18px}.case-panel li{margin-bottom:4px}.nowgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:8px}.nowcard{padding:20px;border:1px solid #1b2737;border-radius:14px;background:#0a111c}.nowcard .eyebrow{margin-bottom:10px}.nowcard p{margin:0;color:#9aa9bc;font-size:13px;line-height:1.7}.services{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:22px}.service{padding:14px;border:1px solid #1a2637;border-radius:12px;background:#080d16}.service b{display:block;color:#d8e3ef;font-size:12px;margin-bottom:6px}.service span{color:#7f8da1;font-size:11px;line-height:1.55}.email-hint{margin-top:16px;color:#6b7a8f;font:500 11px 'JetBrains Mono',monospace}.email-hint a{color:#67e8f9;text-decoration:underline;text-underline-offset:3px}.skip-link:focus-visible,.brand:focus-visible,.links a:focus-visible,.cta:focus-visible,.primary:focus-visible,.secondary:focus-visible,.social:focus-visible,.menub:focus-visible,.case-toggle:focus-visible,.footlinks a:focus-visible,.mobile a:focus-visible{outline:2px solid #67e8f9;outline-offset:3px;border-radius:8px}
@media(max-width:900px){.skillgrid,.stackgrid,.services,.systems-strip,.nowgrid{grid-template-columns:1fr 1fr}.pipeline{grid-template-columns:repeat(3,1fr)}.systems-strip article{border-right:none}}@media(max-width:820px){.links,.cta{display:none}.menub{display:block}.mobile.open{display:block}.mobile a{display:block;padding:11px 0;color:#9aa9bc;font-size:13px;font-weight:700}.hero{padding:72px 0 64px}.stats{grid-template-columns:1fr}.section{padding:68px 0}.head{display:block}.intro{margin-top:14px}.labgrid{grid-template-columns:1fr}.showcase-card.featured{grid-template-columns:1fr}.showcase-grid{grid-template-columns:1fr}.about{grid-template-columns:1fr;gap:35px}}@media(max-width:560px){.container{width:min(100% - 28px,1120px)}h1{font-size:43px}.card{padding:21px}.top{display:block}.num{margin-top:10px}.skillgrid,.stackgrid,.services,.systems-strip,.nowgrid{grid-template-columns:1fr}.showcase-grid{grid-template-columns:1fr}.pipeline{grid-template-columns:1fr 1fr}.contact{padding:27px 21px}.footerin{align-items:flex-start;flex-direction:column}.status{position:static;margin-top:10px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.card:hover,.labcard:hover,.showcase-card:hover,.cta:hover,.primary:hover{transform:none;box-shadow:none}.showcase-media video{transform:none!important}.case-toggle svg{transition:none}}`;

function LazyShowcaseVideo({
  src,
  poster,
  posterWebp,
  alt,
}: {
  src: string;
  poster: string;
  posterWebp?: string;
  alt: string;
}) {
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
    <>
      <picture className="showcase-poster" aria-hidden="true">
        {posterWebp ? <source srcSet={posterWebp} type="image/webp" /> : null}
        <img src={poster} alt="" decoding="async" />
      </picture>
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
    </>
  );
}

function ShowcaseCard({ item }: { item: Showcase }) {
  const [open, setOpen] = useState(false);
  const panelId = `case-${item.id}`;
  return (
    <article className={`showcase-card${item.featured ? ' featured' : ''}`}>
      <div className={`showcase-media ${item.aspect}`}>
        <LazyShowcaseVideo src={item.src} poster={item.poster} posterWebp={item.posterWebp} alt={item.alt} />
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
      <a className="skip-link" href="#main">Skip to content</a>
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
          <div className="nav-actions">
            <ThemeToggle />
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

      <main id="main">
        <div id="top" tabIndex={-1} />
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

        <section id="now" className="section">
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
              </div>
              <p className="email-hint">
                Primary contact: <a href={MAILTO}>{EMAIL}</a>
                {' '}· Prefer a call? Ask for one in your email.
              </p>
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
